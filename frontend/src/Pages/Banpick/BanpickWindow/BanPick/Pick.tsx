import { useBanpickSWR } from "../../../../Middle/useBanpickSWR";
import { banpickNum, team, phase } from "../../../../model/data";
import ChampMeta from "../../../../model/ChampMeta";
import { idToChampLongImg } from "../../../../model/getChampImg";
import styles from "./BanPick.module.css";

function Pick(props: {
  team: team;
  number: banpickNum;
  swapClick: (num: banpickNum) => void;
  swapNum: number;
}) {
  const { team, number, swapClick, swapNum } = props;
  const { banpickData, sessionData } = useBanpickSWR();
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
    return banpickData?.setting.names.member[side][number];
  }
  function isShow(name: string) {
    if (name === "champName") return true;
    if (name === "swap") {
      return banpickData?.status.phase === phase.SWAP && team === sessionData;
    }
    if (name === "userName") return true;
    return false;
  }

  return (
    <div className={`${side} pick ${styles[side]} ${styles.pick}`}>
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
      <div
        className={`${styles.swapDiv} ${
          swapNum === number ? styles.clickedSwap : ""
        } ${isShow("swap") ? styles.showSwap : ""} pick-child`}
      >
        <div className={styles.swapBtn} onClick={() => swapClick(number)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="3rem"
            viewBox="0 0 24 24"
            width="3rem"
            fill="white"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Pick;
