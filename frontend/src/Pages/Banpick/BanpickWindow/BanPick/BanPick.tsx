import Pick from "./Pick";
import Ban from "../Ban";
import { banpickNum, phase, team } from "../../../../model/data";
import { useState } from "react";
import { useBanpickSWR } from "../../../../Middle/useBanpickSWR";
import { getSocket } from "../../../../Middle/socket";
import styles from "./BanPick.module.css";

function BanPick(props: { team: team }) {
  const [swapNum, setSwapNum] = useState<-1 | banpickNum>(-1);
  const { banpickData } = useBanpickSWR();
  const { emitter } = getSocket();
  const { team } = props;
  const side = team === "BLUE" ? "blue" : "red";
  const swapClick = (num: banpickNum) => {
    if (swapNum === -1) setSwapNum(num);
    else if (swapNum === num) setSwapNum(-1);
    else {
      emitter.swap(team, [swapNum, num]);
      setSwapNum(-1);
    }
  };
  const getPhaseClass = () => {
    if (!banpickData) return styles.phaseDefault;
    const { status } = banpickData;
    if (status.phase === phase.PICK) {
      if (status.number <= 3) return styles.phaseFirst;
      return styles.phaseLast;
    }
    if (status.phase === phase.BAN) {
      if (status.number <= 3) return styles.phaseDefault;
      return styles.phaseFirst;
    }
    return styles.phaseDefault;
  };
  return (
    <div className={`${getPhaseClass()} banpick`}>
      <div className={`${side} picks ${styles.picks}`}>
        <div className={`${styles.pickTop} ${styles.smallPicks}`}>
          {[1, 2, 3].map((n) => {
            return (
              <Pick
                team={team}
                number={n as banpickNum}
                swapClick={swapClick}
                swapNum={swapNum}
              ></Pick>
            );
          })}
        </div>
        <div className={`${styles.pickBottom} ${styles.smallPicks}`}>
          {[4, 5].map((n) => {
            return (
              <Pick
                team={team}
                number={n as banpickNum}
                swapClick={swapClick}
                swapNum={swapNum}
              ></Pick>
            );
          })}
        </div>
      </div>
      <div className={side + " between"}></div>
      <div className={side + " bans"}>
        {[1, 2, 3].map((n) => {
          return <Ban team={team} number={n as banpickNum}></Ban>;
        })}
        <div className={side + " ban-blank"}></div>
        {[4, 5].map((n) => {
          return <Ban team={team} number={n as banpickNum}></Ban>;
        })}
      </div>
    </div>
  );
}

export default BanPick;
