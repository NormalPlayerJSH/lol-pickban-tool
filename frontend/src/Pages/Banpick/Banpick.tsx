import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getSocket } from "../../Middle/socket";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";
import BanpickWindow from "./BanpickWindow/BanpickWindow";

function Banpick(RCProps: RouteComponentProps<{ code: string }>) {
  const code = RCProps.match.params.code;
  const { socket, emitter } = getSocket();
  const { sessionData, banpickMutate, sessionMutate } = useBanpickSWR();
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
    return () => {
      socket.disconnect();
    };
  }, []);
  emitter.join(code);
  if (sessionData === "NONE") {
    return <div>로딩중</div>;
  }
  return <BanpickWindow />;
}

export default Banpick;
