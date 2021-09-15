import React from "react";
import { RouteComponentProps, useLocation } from "react-router";
import NavBar from "../NavBar/NavBar";
import common from "../common.module.css";
import styles from "./CreateComplete.module.css";
import useTextInput from "../Common/TextInput/TextInput";
import Button from "../Common/Button/Button";
import queryString from "query-string";
import Error from "../Error/Error";

function codeToLink(code: string) {
  return encodeURI(`${window.location.origin}/banpick/${code}`);
}

function OneLink(props: {
  code: string;
  team: "블루팀" | "레드팀" | "옵저버";
}) {
  const { code, team } = props;
  const link = codeToLink(code);
  const [codeInput] = useTextInput({
    initialValue: code,
    className: styles.oneCodeInput,
    innerText: `${team} 코드`,
    isEditable: false,
  });
  const [linkInput] = useTextInput({
    initialValue: link,
    className: styles.oneLinkInput,
    innerText: `${team} 링크`,
    isEditable: false,
  });
  const doCopy = () => {
    window.navigator.clipboard.writeText(link);
  };
  return (
    <div className={styles.oneLinkDiv}>
      {codeInput}
      {linkInput}
      <Button className={styles.oneLinkButton} onClick={doCopy}>
        복사하기
      </Button>
    </div>
  );
}

function CreateComplete(RCProps: RouteComponentProps) {
  const query = queryString.parse(RCProps.location.search);
  if (!(query.blueCode && query.redCode && query.observerCode))
    return <Error {...RCProps}></Error>;
  const { blueCode, redCode, observerCode } = query;
  const blueName = query.blueName ? query.blueName : "";
  const redName = query.redName ? query.redName : "";
  const getFullCopy = () => {
    const text = `LOLGO 밴픽툴 - 밴픽에 참여하세요!
https://banpick.lolgo.gg/join 에서 아래의 코드를 입력하거나 해당 링크로 접속하여 참가하세요

블루팀${blueName !== "" ? ` (${blueName})` : ""} - ${blueCode}
${codeToLink(blueCode as string)}

레드팀${redName !== "" ? ` (${redName})` : ""} - ${redCode}
${codeToLink(redCode as string)}

옵저버 - ${observerCode}
${codeToLink(observerCode as string)}`;
    window.navigator.clipboard.writeText(text);
  };
  return (
    <>
      <NavBar RCProps={RCProps} from="createcomplete" />
      <div className={common.div}>
        <div className={common.inner}>
          <div className={common.mainTitle}>새로운 밴픽 방 생성 완료</div>
          <div className={styles.explain}>
            https://banpick.lolgo.gg/join 에서 코드를 입력하거나 아래 링크로
            접속하여 참가하세요
          </div>
          <Button className={styles.copyBtn} onClick={getFullCopy}>
            전달용 메시지 복사하기
          </Button>
          <div className={styles.linksDiv}>
            <OneLink team="블루팀" code={blueCode as string} />
            <OneLink team="레드팀" code={redCode as string} />
            <OneLink team="옵저버" code={observerCode as string} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateComplete;
