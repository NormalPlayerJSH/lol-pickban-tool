import React from "react";
import { getSocket } from "../../Middle/socket";
import { useBanpickSWR } from "../../Middle/useBanpickSWR";

function Test() {
  const { socket, emitter } = getSocket();
  const { banpickData } = useBanpickSWR();
  return (
    <>
      <div
        onClick={() => {
          emitter.ready("RED", true);
          console.log(socket.id);
        }}
      >
        sadf {socket.id}
      </div>
      <div
        onClick={() => {
          emitter.ready("BLUE", true);
          console.log(socket.id);
        }}
      >
        sadf {JSON.stringify(banpickData)}
      </div>
    </>
  );
}

export default Test;
