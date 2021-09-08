import React from "react";
import styles from "./SelectArea.module.css";
import ChampMeta, {
  sortedList,
  ChampData,
  currentVersion,
} from "../../../../model/ChampMeta";
import { useBanpickSWR } from "../../../../Middle/useBanpickSWR";
import { banpickNum, phase } from "../../../../model/data";
import { getSocket } from "../../../../Middle/socket";

const getChampionImage = (key: string | number) => {
  const champ = ChampMeta[key as number];
  if (champ.id && champ.id !== "None")
    return `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champ.id}.png`;
  return "/empty.png";
};

function SelectAreaOneChamp(props: {
  champ: ChampData;
  listen: (champ: ChampData) => void;
  isUsed: (champ: ChampData) => boolean;
}) {
  const { champ, listen, isUsed } = props;
  const isUsedValue = isUsed(champ);
  if (champ.key === "0") return <></>;
  return (
    <div
      className={`${styles.champListOneChampDiv} ${
        isUsedValue ? styles.usedChamp : ""
      }`}
      onClick={() => {
        if (!isUsedValue) listen(champ);
      }}
    >
      <img
        className={styles.champListOneChampImg}
        src={getChampionImage(champ.key)}
        alt=""
      />
      <div className={styles.champListOneChampBG}>
        <div className={styles.champListChampName}>{champ.name}</div>
      </div>
    </div>
  );
}

function SelectArea() {
  const { banpickData, sessionData } = useBanpickSWR();
  const { emitter } = getSocket();
  if (!banpickData || !sessionData || sessionData === "NONE") return <> </>;
  const { status, alreadyUsed } = banpickData;
  const { phase: nowPhase, team, number, isReady } = status;
  const isMyTurn =
    (nowPhase === phase.BAN || nowPhase === phase.PICK) && team === sessionData;
  const champOnClick = (champ: ChampData) => {
    if (!isMyTurn) return;
    emitter.select(
      sessionData as "RED" | "BLUE",
      nowPhase as phase.BAN | phase.PICK,
      number,
      parseInt(champ.key)
    );
  };
  const getNowSelected = () => {
    if (!isMyTurn) return "/empty.png";
    const nowNum =
      banpickData[nowPhase === phase.BAN ? "ban" : "pick"][
        sessionData === "RED" ? "red" : "blue"
      ][number as banpickNum];
    return getChampionImage(nowNum);
  };
  const completeClick = () => {
    if (nowPhase === phase.WAIT) {
      emitter.ready(
        sessionData as "RED" | "BLUE",
        !isReady[sessionData === "RED" ? "red" : "blue"]
      );
    }
    if (!isMyTurn) return;
    emitter.complete(
      sessionData as "RED" | "BLUE",
      nowPhase as phase.BAN | phase.PICK,
      number as banpickNum
    );
  };
  const isButtonOn = () => {
    return isMyTurn || nowPhase === phase.WAIT;
  };
  const getButtonText = () => {
    if (isMyTurn) {
      if (nowPhase === phase.PICK) return "PICK";
      if (nowPhase === phase.BAN) return "BAN";
    }
    if (nowPhase === phase.WAIT) return "READY";
    if (nowPhase === phase.SWAP) return "SWAP";
    return "WAIT";
  };
  const isUsed = (champ: ChampData) => {
    if (alreadyUsed[champ.key as unknown as number]) return true;
    return false;
  };
  console.log(alreadyUsed);
  return (
    <div className={`${styles.wrapper} ${isMyTurn ? styles.myturn : ""}`}>
      <div className={styles.champListDiv}>
        <div className={styles.selectChampDiv}>
          <div className={styles.selectChampInner}>
            {sortedList.map((champ) => (
              <SelectAreaOneChamp
                champ={champ}
                listen={champOnClick}
                key={champ.key}
                isUsed={isUsed}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.completeDiv}>
        <div
          className={`${styles.teamText} ${
            sessionData === "BLUE" ? styles.teamTextBlue : styles.teamTextRed
          }`}
        >
          {sessionData}
        </div>
        <div className={styles.completeImgWrapper}>
          <img className={styles.completeImg} src={getNowSelected()} alt="" />
        </div>
        <div
          className={`${styles.completeBtn} ${
            isButtonOn() ? styles.buttonOn : ""
          }`}
          onClick={() => completeClick()}
        >
          <div className={styles.completeBtnText}>{getButtonText()}</div>
        </div>
      </div>
    </div>
  );
}

export default SelectArea;
