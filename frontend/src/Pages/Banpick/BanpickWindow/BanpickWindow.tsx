import React from "react";
import ScoreBoard from "./ScoreBoard";
import BanPick from "./BanPick";
import SelectArea from "./SelectArea/SelectArea";

function BanpickWindow() {
  return (
    <div className="App">
      <ScoreBoard></ScoreBoard>
      <div className="banpicks">
        <BanPick team={"BLUE"}></BanPick>
        <SelectArea></SelectArea>
        <BanPick team={"RED"}></BanPick>
      </div>
    </div>
  );
}

export default BanpickWindow;
