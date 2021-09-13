import React from "react";
import { RouteComponentProps } from "react-router";
import NavBar from "../NavBar/NavBar";
import styles from "./Join.module.css";
import common from "../common.module.css";
import Button from "../Common/Button/Button";
import useTextInput from "../Common/TextInput/TextInput";

function Join(RCProps: RouteComponentProps) {
  const [TextInput, inputValue] = useTextInput({
    className: styles.joinInput,
    innerText: "입장 코드 입력 (ex. 승리의 케이틀린)",
  });
  const join = () => {
    RCProps.history.push(`/banpick/${inputValue.trim()}`);
  };
  return (
    <>
      <NavBar RCProps={RCProps} from="join" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>밴픽 방에 입장하기</div>
          <div className={styles.inputNBtn}>
            {TextInput}
            <Button className={styles.joinBtn} onClick={join}>
              입장하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
