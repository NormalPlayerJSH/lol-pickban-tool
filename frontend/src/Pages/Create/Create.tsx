import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";
import styles from "./Create.module.css";
import useTextInput from "../Common/TextInput/TextInput";
import Button from "../Common/Button/Button";
import { gameSetting } from "../../model/data";
import axios from "axios";

function useOneTeamName(team: "blue" | "red"): [
  JSX.Element,
  {
    team: string;
    member: { 1: string; 2: string; 3: string; 4: string; 5: string };
  }
] {
  const teamString = team === "blue" ? "블루팀 " : "레드팀 ";
  const [input0, state0] = useTextInput({
    innerText: teamString + "이름",
    className: styles.nameInput,
  });
  const [input1, state1] = useTextInput({
    innerText: teamString + "1픽",
    className: styles.nameInput,
  });
  const [input2, state2] = useTextInput({
    innerText: teamString + "2픽",
    className: styles.nameInput,
  });
  const [input3, state3] = useTextInput({
    innerText: teamString + "3픽",
    className: styles.nameInput,
  });
  const [input4, state4] = useTextInput({
    innerText: teamString + "4픽",
    className: styles.nameInput,
  });
  const [input5, state5] = useTextInput({
    innerText: teamString + "5픽",
    className: styles.nameInput,
  });
  const names = {
    team: state0.trim(),
    member: {
      1: state1.trim(),
      2: state2.trim(),
      3: state3.trim(),
      4: state4.trim(),
      5: state5.trim(),
    },
  };
  return [
    <div
      className={`${styles.oneTeamDiv} ${
        team === "blue" ? styles.teamBlue : styles.teamRed
      }`}
    >
      {input0}
      {input1}
      {input2}
      {input3}
      {input4}
      {input5}
    </div>,
    names,
  ];
}

function useNumberInput(
  innerText: string,
  initialValue: string
): [JSX.Element, string] {
  const [input, state, setState] = useTextInput({
    innerText,
    initialValue,
    className: styles.timeOneInput,
    onChange: (e) => {
      setState(e.target.value.replace(/\D/g, ""));
    },
    onBlur: (e) => {
      if (e.target.value === "") setState("0");
      else setState(`${parseInt(e.target.value)}`);
    },
  });
  return [input, state];
}

function Create(RCProps: RouteComponentProps) {
  const [banInput, banState] = useNumberInput("밴 시간", "30");
  const [pickInput, pickState] = useNumberInput("픽 시간", "30");
  const [swapInput, swapState] = useNumberInput("스왑 시간", "30");
  const [blueElem, blueName] = useOneTeamName("blue");
  const [redElem, redName] = useOneTeamName("red");
  const buttonOnClick = () => {
    const nameToSend: gameSetting = {
      names: {
        game: "",
        red: redName.team,
        blue: blueName.team,
        member: {
          red: redName.member,
          blue: blueName.member,
        },
      },
      time: {
        pick: parseInt(pickState),
        ban: parseInt(banState),
        swap: parseInt(swapState),
      },
    };
    axios
      .post("/creategame", nameToSend)
      .then((res) => res.data)
      .then((data) => {
        const params = new URLSearchParams({
          observerCode: data.observerCode.answer,
          blueCode: data.blueCode.answer,
          redCode: data.redCode.answer,
        });
        if (nameToSend.names.blue !== "")
          params.append("blueName", nameToSend.names.blue);
        if (nameToSend.names.red !== "")
          params.append("redName", nameToSend.names.red);
        window.location.href = `/createcomplete?${params.toString()}`;
      });
  };
  return (
    <>
      <NavBar RCProps={RCProps} from="create" />
      <div className={common.div}>
        <div className={`${common.inner} ${styles.inner}`}>
          <div className={common.mainTitle}>새로운 밴픽 방 만들기</div>
          <div className={styles.timesDiv}>
            <div className={styles.timeOne}>{banInput}</div>
            <div className={styles.timeOne}>{pickInput}</div>
            <div className={styles.timeOne}>{swapInput}</div>
          </div>
          <div className={styles.namesDiv}>
            {blueElem}
            {redElem}
          </div>
          <Button className={styles.makeButton} onClick={buttonOnClick}>
            방 만들기
          </Button>
        </div>
      </div>
    </>
  );
}

export default Create;
