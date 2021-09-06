import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { io } from "socket.io-client";
import { getSocket } from "../../Middle/socket";
import Test from "./test";
import useSWR from "swr";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";
import BanpickWindow from "./BanpickWindow/BanpickWindow";

function Banpick(RCProps: RouteComponentProps<{ code: string }>) {
  const code = RCProps.match.params.code;
  const { socket, emitter } = getSocket();
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
  emitter.join(code);
  if (sessionData === "NONE") {
    return <div>로딩중</div>;
  }
  return <BanpickWindow />;

  return (
    <div>
      <div
        onClick={() => {
          emitter.join(code);
        }}
      >
        Banpick Component {`${JSON.stringify(sessionData)}`}
      </div>
      <Test />
    </div>
  );
}

export default Banpick;
