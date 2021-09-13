import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";

function Main(RCProps: RouteComponentProps) {
  return (
    <>
      <NavBar RCProps={RCProps} from="main" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>LOLGO Banpick Tool</div>
        </div>
      </div>
    </>
  );
}

export default Main;
