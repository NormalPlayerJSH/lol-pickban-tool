import React from "react";
import styles from "./Test.module.css";
import ChampMeta from "../../model/ChampMeta";
import { useState } from "react";
import Button from "../Common/Button/Button";
import { idToChampLongImg } from "../../model/getChampImg";
import { champWatching } from "../../model/ChampMeta";

function Test() {
  const [index, setIndex] = useState(1);
  const [champ, setChamp] = useState<{ [x: number]: "left" | "right" }>({});
  const lis = Object.keys(ChampMeta) as unknown as number[];
  const maxIndex = lis.length - 1;
  const nowchamp = ChampMeta[lis[index]].key as unknown as number;
  const watching = champWatching[nowchamp];
  const onclick = (side: "left" | "right") => {
    const newChamp = { ...champ };
    newChamp[nowchamp] = side;
    setChamp(newChamp);
    if (index !== maxIndex) setIndex((idx) => idx + 1);
    console.log(newChamp);
    console.log(JSON.stringify(newChamp));
  };
  return (
    <div
      className={`${styles.div} ${watching === "left" ? "" : styles.mirror}`}
    >
      <img src={idToChampLongImg(nowchamp)} alt="" className={styles.img} />
      <div className={styles.btns}>
        <Button
          className={`${styles.left} ${styles.btn}`}
          onClick={() => {
            onclick("left");
          }}
        >
          좌
        </Button>
        <Button
          className={`${styles.right} ${styles.btn}`}
          onClick={() => {
            onclick("right");
          }}
        >
          우
        </Button>
      </div>
      <div className={styles.id}>
        <div>{nowchamp}</div>
      </div>
    </div>
  );
}

export default Test;
