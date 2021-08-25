import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { banpickData } from "./middle/dataClass";
import { json as bpJSON } from "body-parser";
import { banpick, code, phase, team } from "./model/data";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;
const bpData = new banpickData();
const rName = bpData.randomName;

class customSocket extends Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap
> {
  gameInfoId?: string = "";
}

const getGameInfoId = (socket: customSocket) => {
  if (socket.gameInfoId) return socket.gameInfoId;
  return "";
};

type socketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

app.use(bpJSON());

app.get("/api", (req, res) => {
  res.json({ data: "Hello, World!" });
});

app.post("/creategame", (req, res) => {
  const data = req.body;
  const answer = bpData.makeNewGame(data);
  //console.log({ data, answer });
  res.json(answer);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const statusUpdatePush = (id: string) => {
  const { ans } = bpData.getGameInfo(id);
  if (ans) {
    io.to(id).emit("statusUpdate", {
      info: ans,
    });
  }
};

const isSameStatus = (
  left: { phase: phase; team: team; number: number },
  right: { phase: phase; team: team; number: number }
) => {
  return (
    left.phase === right.phase &&
    left.team === right.team &&
    left.number === right.number
  );
};

const endHandler = (
  endStatus: { phase: phase; team: team; number: number },
  id: string
) => {
  const { ans } = bpData.getGameInfo(id);
  if (ans) {
    const { status } = ans;
    if (isSameStatus(endStatus, status)) {
      goNextTurn(ans);
      statusUpdatePush(id);
    }
  }
};

function goNextTurn(gameInfo: banpick) {
  const { status, setting, id } = gameInfo;

  const changeStatus = (phase: number, team: team, number: number) => {
    status.phase = phase;
    status.team = team;
    status.number = number;
  };
  if (status.phase === phase.END) {
    return;
  } else if (status.phase === phase.WAIT) {
    changeStatus(phase.BAN, "BLUE", 1);
  } else if (status.phase === phase.SWAP) {
    changeStatus(phase.END, "ALL", 0);
  } else if (status.phase === phase.BAN) {
    if (status.team === "BLUE") {
      if (status.number === 1) changeStatus(phase.BAN, "RED", 1);
      else if (status.number === 2) changeStatus(phase.BAN, "RED", 2);
      else if (status.number === 3) changeStatus(phase.BAN, "RED", 3);
      else if (status.number === 4) changeStatus(phase.BAN, "RED", 5);
      else if (status.number === 5) changeStatus(phase.PICK, "RED", 4);
    } else if (status.team === "RED") {
      if (status.number === 1) changeStatus(phase.BAN, "BLUE", 2);
      else if (status.number === 2) changeStatus(phase.BAN, "BLUE", 3);
      else if (status.number === 3) changeStatus(phase.PICK, "BLUE", 1);
      else if (status.number === 4) changeStatus(phase.BAN, "BLUE", 4);
      else if (status.number === 5) changeStatus(phase.BAN, "BLUE", 5);
    }
  } else if (status.phase === phase.PICK) {
    if (status.team === "BLUE") {
      if (status.number === 1) changeStatus(phase.PICK, "RED", 1);
      else if (status.number === 2) changeStatus(phase.PICK, "BLUE", 3);
      else if (status.number === 3) changeStatus(phase.PICK, "RED", 3);
      else if (status.number === 4) changeStatus(phase.PICK, "BLUE", 5);
      else if (status.number === 5) changeStatus(phase.PICK, "RED", 5);
    } else if (status.team === "RED") {
      if (status.number === 1) changeStatus(phase.PICK, "RED", 2);
      else if (status.number === 2) changeStatus(phase.PICK, "BLUE", 2);
      else if (status.number === 3) changeStatus(phase.BAN, "RED", 4);
      else if (status.number === 4) changeStatus(phase.PICK, "BLUE", 4);
      else if (status.number === 5) changeStatus(phase.SWAP, "ALL", 0);
    }
  }

  const changeTimer = (name: "pick" | "ban" | "swap") => {
    const time = setting["time"][name] * 1000;
    if (time < 0) {
      status.endTime = Date.now();
    } else {
      status.endTime = Date.now() + time;
      const newStatus = { ...status };
      setTimeout(
        () =>
          endHandler(
            {
              phase: newStatus.phase,
              team: newStatus.team,
              number: newStatus.number,
            },
            id
          ),
        time
      );
    }
  };

  if (status.phase === phase.BAN) changeTimer("ban");
  else if (status.phase === phase.PICK) changeTimer("pick");
  else if (status.phase === phase.SWAP) changeTimer("swap");
}

const joinChecker = (socket: customSocket, data: { code: string }) => {
  const { code } = data;
  const { err, ans } = rName.codeToId(code);
  if (err) {
    socket.emit("joinFail", { err });
  } else {
    const info = bpData.getGameInfo((ans as code).id);
    if (info.err) {
      socket.emit("joinFail", { err });
    } else {
      socket.join((ans as code).id);
      socket.gameInfoId = (ans as code).id;
      socket.emit("joinSuccess", {
        ans: ans,
        info: info.ans,
      });
      console.log(socket.gameInfoId);
    }
  }
};

const readyChcker = (
  socket: customSocket,
  data: { team: string; isReady: boolean }
) => {
  const id = getGameInfoId(socket);
  const { team, isReady } = data;
  const { ans } = bpData.getGameInfo(id);
  let changed = false;
  if (ans && ans.status.phase === phase.WAIT) {
    if (team === "BLUE" && ans.status.isReady.blue !== isReady) {
      ans.status.isReady.blue = isReady;
      changed = true;
    } else if (team === "RED" && ans.status.isReady.red !== isReady) {
      ans.status.isReady.red = isReady;
      changed = true;
    }
    if (changed) {
      if (ans.status.isReady.blue && ans.status.isReady.red) {
        goNextTurn(ans);
      }
      statusUpdatePush(id);
    }
  }
};

const completeHandler = (
  socket: customSocket,
  data: {
    status: {
      team: team;
      phase: phase;
      number: number;
    };
  }
) => {
  const id = getGameInfoId(socket);
  const { status } = data;
  const { ans } = bpData.getGameInfo(id);
  if (ans) {
    const { status: newStatus } = ans;
    if (isSameStatus(status, newStatus)) {
      goNextTurn(ans);
      statusUpdatePush(id);
    }
  }
};

io.on("connection", (socket) => {
  socket.on("asdf", (data) => {
    //console.log(data);
    socket.emit("dd", data);
  });
  socket.on("join", (data) => joinChecker(socket, data));
  socket.on("ready", (data) => readyChcker(socket, data));
  socket.on("complete", (data) => completeHandler(socket, data));
});
