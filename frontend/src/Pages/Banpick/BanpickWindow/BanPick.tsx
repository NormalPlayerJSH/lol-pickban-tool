import Pick from "./Pick";
import Ban from "./Ban";
import { banpickNum, team } from "../../../model/data";

function BanPick(props: { team: team }) {
  const { team } = props;
  const side = team === "BLUE" ? "blue" : "red";
  return (
    <div className="banpick">
      <div className={side + " picks"}>
        {[1, 2, 3, 4, 5].map((n) => {
          return <Pick team={team} number={n as banpickNum}></Pick>;
        })}
      </div>
      <div className={side + " between"}></div>
      <div className={side + " bans"}>
        {[1, 2, 3].map((n) => {
          return <Ban team={team} number={n as banpickNum}></Ban>;
        })}
        <div className={side + " ban-blank"}></div>
        {[4, 5].map((n) => {
          return <Ban team={team} number={n as banpickNum}></Ban>;
        })}
      </div>
    </div>
  );
}

export default BanPick;
