import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";
import Button from "../Common/Button/Button";
import styles from "./Main.module.css";

function Main(RCProps: RouteComponentProps) {
  const move = (link: string) => {
    RCProps.history.push(link);
  };
  return (
    <>
      <NavBar RCProps={RCProps} from="main" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>LOLGO Banpick Tool</div>
          <Button className={styles.btn} onClick={() => move("/create")}>
            밴픽 방 만들기
          </Button>
          <Button className={styles.btn} onClick={() => move("/join")}>
            밴픽 방 입장하기
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
