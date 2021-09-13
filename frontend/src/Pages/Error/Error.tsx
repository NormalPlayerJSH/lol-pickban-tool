import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";

function Error(RCProps: RouteComponentProps) {
  return (
    <>
      <NavBar RCProps={RCProps} from="error" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>잘못된 링크입니다.</div>
        </div>
      </div>
    </>
  );
}

export default Error;
