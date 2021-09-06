import { useEffect, useState } from "react";
import { useBanpickSWR } from "../../../Middle/useBanpickSWR";

function ScoreBoard() {
  const { banpickData } = useBanpickSWR();
  const [timer, settimer] = useState(0);
  useEffect(() => {
    if (!banpickData) return;
    const interval = setInterval(() => {
      settimer(
        Math.max(
          0,
          Math.floor((banpickData.status.endTime - Date.now()) / 1000)
        )
      );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [banpickData?.status.endTime]);
  if (!banpickData) {
    return <div></div>;
  }
  return (
    <div className={`scoreboard` + (false ? " use-score" : "")}>
      <div className="board-team board-blue">
        <div className="board-team-score">
          <div className="board-team-score-border">
            <div className="board-team-score-text">
              {/* {data.blue[0].score} */}
            </div>
          </div>
        </div>
        <div className="board-team-name">
          <div className="board-team-name-text">
            {banpickData?.setting.names.blue}
          </div>
        </div>
      </div>
      <div className="board-time">
        <div className="board-time-border">
          <div className="board-time-text">{timer}</div>
        </div>
      </div>
      <div className="board-team board-red">
        <div className="board-team-score">
          <div className="board-team-score-border">
            {/* <div className="board-team-score-text">{data.red[0].score}</div> */}
          </div>
        </div>
        <div className="board-team-name">
          <div className="board-team-name-text">
            {banpickData.setting.names.red}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
