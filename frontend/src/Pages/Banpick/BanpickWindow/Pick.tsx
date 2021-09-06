import { useBanpickSWR } from "../../../Middle/useBanpickSWR";
import { banpickNum, team, phase } from "../../../model/data";
import ChampMeta from "../../../model/ChampMeta";
import { idToChampLongImg } from "../../../model/getChampImg";

function Pick(props: { team: team; number: banpickNum }) {
  const { team, number } = props;
  const { banpickData } = useBanpickSWR();
  if (!banpickData) return <div />;
  const side = team === "BLUE" ? "blue" : "red";
  const thisData = banpickData?.pick[side][number];
  const nowStatus = banpickData.status;
  function getImg() {
    //return champs[idToChamp[data[side][pickNum].pick.id]];
    return idToChampLongImg(thisData);
  }
  function getSpellImg(num: number) {
    return "";
    //return spells[idToSpell[data[side][pickNum]["spells"][num]]];
  }
  function isDoing() {
    return (
      nowStatus.phase === phase.PICK &&
      nowStatus.team === team &&
      nowStatus.number === number
    );
  }
  function isNotSelected() {
    //return true
    return thisData === 0;
  }
  function getChampName() {
    if (thisData === 0) return "";
    return ChampMeta[thisData].name;
  }
  function getUserName() {
    return "";
    //return data[side][pickNum].name;
  }
  function isShow(name: string) {
    if (name === "champName") return true;
    return false;
  }

  return (
    <div className={side + " pick"}>
      <div
        className={
          "pick-child champ-img" + (isNotSelected() ? " not-selected" : "")
        }
      >
        <img src={getImg()} alt="" />
      </div>
      <div className="pick-child champ-info">
        <div className="info-child top-blank"></div>
        <div className="info-child champ-name-div">
          <div
            className={"champ-name" + (isShow("champName") ? "" : " dont-show")}
          >
            {getChampName()}
          </div>
        </div>
        <div className="info-child middle-blank"></div>
        <div className="info-child user-name-div">
          <div
            className={"user-name" + (isShow("userName") ? "" : " dont-show")}
          >
            {getUserName()}
          </div>
        </div>
      </div>
      <div className="pick-child spell-info">
        <div className="spell-child top-blank"></div>
        <div className="spell-child spell-div">
          <img
            src={getSpellImg(1)}
            alt=""
            className={"spell-img" + (isShow("spells") ? "" : " dont-show")}
          />
        </div>
        <div className="spell-child middle-blank"></div>
        <div className="spell-child spell-div">
          <img
            src={getSpellImg(2)}
            alt=""
            className={"spell-img" + (isShow("spells") ? "" : " dont-show")}
          />
        </div>
      </div>
      <div className={"pick-child now" + (isDoing() ? " doing" : "")}>
        <div className="blink"></div>
        <div className="dark"></div>
      </div>
    </div>
  );
}

export default Pick;
