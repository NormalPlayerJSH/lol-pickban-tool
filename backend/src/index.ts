import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { banpickData } from "./middle/dataClass";
import { json as bpJSON } from "body-parser";
import ChampMeta from "../../model/ChampMeta";
import { banpick, code, phase, team } from "../../model/data";
import getRandomElement from "./middle/random";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;
const bpData = new banpickData();
const rName = bpData.randomName;

const champList = Object.keys(ChampMeta).map((key) => parseInt(key));

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

const teamToSide = (team: team) => {
  if (team === "BLUE") return "blue";
  return "red";
};

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

const setRandomChamp = (gameInfo: banpick, team: team, number: number) => {
  const used: number[] = [];
  const lis: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
  const pickban: ("pick" | "ban")[] = ["pick", "ban"];
  const side: ("red" | "blue")[] = ["red", "blue"];
  const { status } = gameInfo;
  let randomChamp = -1;
  const isSamePhase = (
    action: "pick" | "ban",
    actionSide: "red" | "blue",
    num: 1 | 2 | 3 | 4 | 5
  ) => {
    const actionSame =
      (action === "pick" && status.phase === phase.PICK) ||
      (action === "ban" && status.phase === phase.BAN);
    const sideSame = teamToSide(status.team) === actionSide;
    const numberSame = num === status.number;
    return actionSame && sideSame && numberSame;
  };
  lis.map((num) => {
    pickban.map((action) => {
      side.map((actionSide) => {
        const championId = gameInfo[action][actionSide][num];
        if (!isSamePhase(action, actionSide, num) && championId != 0) {
          used.push(championId);
        }
      });
    });
  });
  while (true) {
    randomChamp = getRandomElement(champList);
    if (randomChamp != 0 && !(randomChamp in used)) break;
  }
  gameInfo.pick[teamToSide(team)][number as 1 | 2 | 3 | 4 | 5] = randomChamp;
};

const endHandler = (
  endStatus: { phase: phase; team: team; number: number },
  id: string
) => {
  const { ans } = bpData.getGameInfo(id);
  if (ans) {
    const { status } = ans;
    if (isSameStatus(endStatus, status)) {
      const { phase: ePhase, team, number } = endStatus;
      if (
        ePhase === phase.PICK &&
        ans.pick[teamToSide(team)][number as 1 | 2 | 3 | 4 | 5] === 0
      ) {
        setRandomChamp(ans, endStatus.team, endStatus.number);
      }
      goNextTurn(ans);
      statusUpdatePush(id);
    }
  }
};

function goNextTurn(gameInfo: banpick) {
  const { status, setting, id, ban, pick } = gameInfo;

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

const selectHandler = (
  socket: customSocket,
  data: {
    status: {
      team: team;
      phase: phase.BAN | phase.PICK;
      number: number;
    };
    championId: number;
  }
) => {
  const id = getGameInfoId(socket);
  const { ans } = bpData.getGameInfo(id);
  if (ans) {
    const { status, championId } = data;
    const {
      team: statusTeam,
      phase: statusPhase,
      number: statusNumber,
    } = status;
    if (isSameStatus(status, ans.status)) {
      const action = statusPhase === phase.BAN ? "ban" : "pick";
      ans[action][teamToSide(statusTeam)][statusNumber as 1 | 2 | 3 | 4 | 5] =
        championId;
      statusUpdatePush(id);
    }
  }
};

const swapHandler = (
  socket: Socket,
  data: {
    team: team;
    swapNumber: [1 | 2 | 3 | 4 | 5, 1 | 2 | 3 | 4 | 5];
  }
) => {
  const id = getGameInfoId(socket);
  const { ans } = bpData.getGameInfo(id);
  const { team, swapNumber } = data;
  if (ans?.status.phase === phase.SWAP) {
    const [left, right] = swapNumber;
    const teamPick = ans.pick[teamToSide(team)];
    if (teamPick[left] !== 0 && teamPick[right] !== 0) {
      let tmp = teamPick[left];
      teamPick[left] = teamPick[right];
      teamPick[right] = tmp;
      statusUpdatePush(id);
    }
  }
};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("asdf", (data) => {
    //console.log(data);
    socket.emit("dd", data);
  });
  socket.on("join", (data) => joinChecker(socket, data));
  socket.on("ready", (data) => readyChcker(socket, data));
  socket.on("complete", (data) => completeHandler(socket, data));
  socket.on("select", (data) => selectHandler(socket, data));
  socket.on("swap", (data) => swapHandler(socket, data));
});
