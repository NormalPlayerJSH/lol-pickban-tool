import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getSocket } from "../../Middle/socket";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";
import Error from "../Error/Error";
import BanpickWindow from "./BanpickWindow/BanpickWindow";

function Banpick(RCProps: RouteComponentProps<{ code: string }>) {
  const code = RCProps.match.params.code;
  const { socket, emitter } = getSocket();
  const { sessionData, banpickMutate, sessionMutate } = useBanpickSWR();
  const [errData, setErrData] = useState("");
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
    socket.on("joinFail", (data) => {
      console.log(data);
      setErrData(data.err);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  emitter.join(code);
  if (sessionData === "NONE") {
    return (
      <Error RCProps={RCProps} errMsg={errData !== "" ? errData : "로딩 중"} />
    );
  }
  return <BanpickWindow />;
}

export default Banpick;
