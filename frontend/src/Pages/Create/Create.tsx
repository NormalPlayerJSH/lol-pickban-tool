import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";

function Create(RCProps: RouteComponentProps) {
  return (
    <>
      <NavBar RCProps={RCProps} from="create" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>새로운 밴픽 방 만들기</div>
        </div>
      </div>
    </>
  );
}

export default Create;
