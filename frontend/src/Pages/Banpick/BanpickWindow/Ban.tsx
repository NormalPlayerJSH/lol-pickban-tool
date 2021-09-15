import { banpickNum, team } from "../../../model/data";
import { useBanpickSWR } from "../../../Middle/useBanpickSWR";
import { phase } from "../../../model/data";
import { idToChampLongImg } from "../../../model/getChampImg";
import { champWatching } from "../../../model/ChampMeta";

function Ban(props: { team: team; number: banpickNum }) {
  const { team, number } = props;
  const { banpickData } = useBanpickSWR();
  if (!banpickData) return <div></div>;
  const side = team === "BLUE" ? "blue" : "red";
  const thisData = banpickData.ban[side][number];
  const nowStatus = banpickData.status;
  function getImg() {
    return idToChampLongImg(thisData);
    //return champs[idToChamp[data[side][banNum].ban.id]];
  }
  function isDoing() {
    return (
      nowStatus.phase === phase.BAN &&
      nowStatus.team === team &&
      nowStatus.number === number
    );
    //return data[side][banNum].ban.isDoing;
  }
  function isNotSelected() {
    //return true
    //return parseInt(data[side][banNum].ban.id) === -1;
    return thisData === 0;
  }

  function isMirror() {
    const watching = champWatching[thisData];
    if (
      (side === "blue" && watching === "left") ||
      (side === "red" && watching === "right")
    )
      return "mirror";
    return "";
  }

  return (
    <div className={side + " ban " + isMirror()}>
      <div
        className={
          "ban-child champ-img" + (isNotSelected() ? " not-selected" : "")
        }
      >
        <img src={getImg()} alt="" />
      </div>
      <div className={"ban-child now" + (isDoing() ? " doing" : "")}>
        <div className="blink"></div>
        <div className="dark"></div>
      </div>
    </div>
  );
}

export default Ban;
