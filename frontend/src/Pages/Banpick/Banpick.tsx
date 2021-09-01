import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { io } from "socket.io-client";
import { getSocket } from "../../Middle/socket";
import Test from "./test";
import useSWR from "swr";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";

function Banpick(RCProps: RouteComponentProps<{ code: string }>) {
  const code = RCProps.match.params.code;
  const socket = getSocket();
  const { banpickData, sessionData, banpickMutate, sessionMutate } =
    useBanpickSWR();
  useEffect(() => {
    socket.on("joinSuccess", (data) => {
      const { info, ans } = data;
      sessionMutate(ans.team);
      banpickMutate(info);
    });
    socket.on("statusUpdate", (data) => {
      banpickMutate(data.info);
      console.log(data);
    });
  }, []);
  console.log(socket);

  return (
    <div>
      <div
        onClick={() => {
          socket.emit("join", {
            code,
          });
        }}
      >
        Banpick Component {`${JSON.stringify(sessionData)}`}
      </div>
      <Test />
    </div>
  );
}

export default Banpick;
