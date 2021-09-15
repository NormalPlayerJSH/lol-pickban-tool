import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LOLGO_logo_inline.png";
import { RouteComponentProps } from "react-router";

type linkType = "join" | "create" | "main" | "createcomplete" | "error";

function NavBar(props: { RCProps: RouteComponentProps; from: linkType }) {
  const { RCProps, from } = props;
  const doLink = (link: linkType) => {
    if (link === from) return;
    if (link === "create") RCProps.history.push("/create");
    else if (link === "join") RCProps.history.push("/join");
    else if (link === "main") RCProps.history.push("/");
  };
  return (
    <div className={styles.NavBarDiv}>
      <div className={styles.inner}>
        <div
          className={styles.logoNTitle}
          onClick={() => {
            doLink("main");
          }}
        >
          <img src={logo} alt="" className={styles.logo} />
          <div className={`${styles.title} ${styles.navText}`}>
            Banpick Tool
          </div>
        </div>
        <div className={styles.navLinks}>
          <div
            className={`${styles.navLink} ${styles.navText}`}
            onClick={() => {
              doLink("create");
            }}
          >
            Create
          </div>
          <div
            className={`${styles.navLink} ${styles.navText}`}
            onClick={() => {
              doLink("join");
            }}
          >
            Join
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
