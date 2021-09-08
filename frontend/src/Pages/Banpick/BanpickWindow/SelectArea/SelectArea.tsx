import React, { ChangeEvent, useState } from "react";
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
  champNum: number;
  listen: (champ: ChampData) => void;
  isUsed: (champ: ChampData) => boolean;
}) {
  const { champNum, listen, isUsed } = props;
  const champ = ChampMeta[champNum];
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
      <div className={styles.champListOneChampInner}>
        <img
          className={styles.champListOneChampImg}
          src={getChampionImage(champ.key)}
          alt=""
        />
        <div className={styles.champListOneChampBG}>
          <div className={styles.champListChampName}>{champ.name}</div>
        </div>
      </div>
    </div>
  );
}

function SelectArea() {
  const { banpickData, sessionData } = useBanpickSWR();
  const [ChampList, setChampList] = useState<number[]>(
    sortedList as unknown as number[]
  );
  const [LastSearchTime, setLastSearchTime] = useState<number>(-1);
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
  const doChampSearch = (value: string) => {
    setLastSearchTime(Date.now());
    const searchValue = value.replace(/\s+/g, "");
    console.log(searchValue);
    setChampList(
      sortedList.filter((value: string) =>
        ChampMeta[value as unknown as number].name
          .replace(/\s+/g, "")
          .startsWith(searchValue)
      ) as unknown as number[]
    );
  };
  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    doChampSearch(e.target.value);
  };
  console.log(alreadyUsed);
  return (
    <div className={`${styles.wrapper} ${isMyTurn ? styles.myturn : ""}`}>
      <div className={styles.champListDiv}>
        <div className={styles.champSearchDiv}>
          <input
            type="text"
            onChange={searchInputChange}
            className={styles.champSearchInput}
            placeholder="챔피언 검색"
          />
        </div>
        <div className={styles.selectChampDiv}>
          <div className={styles.selectChampInner}>
            {ChampList.map((champNum) => (
              <SelectAreaOneChamp
                champNum={champNum as unknown as number}
                listen={champOnClick}
                key={champNum}
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
