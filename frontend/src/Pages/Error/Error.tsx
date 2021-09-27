import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";

function Error(
  props: RouteComponentProps | { RCProps: RouteComponentProps; errMsg: string }
) {
  if ("history" in props) {
    return (
      <>
        <NavBar RCProps={props} from="error" />
        <div className={common.div}>
          <div className={common.inner}>
            <div className={common.mainTitle}>잘못된 링크입니다.</div>
          </div>
        </div>
      </>
    );
  } else {
    const { RCProps, errMsg } = props;
    return (
      <>
        <NavBar RCProps={RCProps} from="error" />
        <div className={common.div}>
          <div className={common.inner}>
            <div className={common.mainTitle}>{errMsg}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Error;
