import React from "react";
import ScoreBoard from "./ScoreBoard";
import BanPick from "./BanPick/BanPick";
import SelectArea from "./SelectArea/SelectArea";
import { useBanpickSWR } from "../../../Middle/useBanpickSWR";

function BanpickWindow() {
  const { sessionData } = useBanpickSWR();
  return (
    <div className="App">
      <ScoreBoard></ScoreBoard>
      <div className="banpicks">
        <BanPick team={"BLUE"}></BanPick>
        {sessionData !== "OBSERVER" ? <SelectArea></SelectArea> : <></>}
        <BanPick team={"RED"}></BanPick>
      </div>
    </div>
  );
}

export default BanpickWindow;
