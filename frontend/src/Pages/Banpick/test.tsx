import React from "react";
import { getSocket } from "../../Middle/socket";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";

function Test() {
  const socket = getSocket();
  const { banpickData } = useBanpickSWR();
  return (
    <>
      <div
        onClick={() => {
          socket.emit("ready", {
            team: "RED",
            isReady: true,
          });
          console.log(socket.id);
        }}
      >
        sadf {socket.id}
      </div>
      <div
        onClick={() => {
          socket.emit("ready", {
            team: "BLUE",
            isReady: true,
          });
          console.log(socket.id);
        }}
      >
        sadf {JSON.stringify(banpickData)}
      </div>
    </>
  );
}

export default Test;
