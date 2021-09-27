import {
  banpick,
  banpicks,
  gameSetting,
  phase,
} from "../../../frontend/src/model/data";
import crypto from "crypto";
import { randomName } from "./randomName";

export class banpickData {
  data: banpicks = {};
  randomName: randomName;
  oneDayMS = 24 * 60 * 60 * 1000;
  twoDayMS = this.oneDayMS * 2;
  constructor() {
    this.randomName = new randomName();
  }
  getNewId() {
    while (true) {
      const randNum = Math.floor(Math.random() * 99999999);
      const beforeEncrypt = `${Date.now()} ${randNum}`;
      const encrypted = crypto
        .createHash("sha512")
        .update(beforeEncrypt)
        .digest("base64");
      if (!(encrypted in this.data)) {
        return encrypted;
      }
    }
  }
  makeNewGame(setting: gameSetting) {
    const id = this.getNewId();
    const newGame: banpick = {
      id,
      date: Date.now(),
      setting,
      status: {
        phase: phase.WAIT,
        team: "ALL",
        endTime: -1,
        number: 0,
        isReady: {
          blue: false,
          red: false,
        },
      },
      alreadyUsed: {},
      pick: {
        blue: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        red: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      },
      ban: {
        blue: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        red: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      },
    };
    this.data[id] = newGame;
    //console.log(newGame);
    const observerCode = this.randomName.getRandomCode({
      id,
      team: "OBSERVER",
    });
    const blueCode = this.randomName.getRandomCode({ id, team: "BLUE" });
    const redCode = this.randomName.getRandomCode({ id, team: "RED" });
    return {
      observerCode,
      blueCode,
      redCode,
    };
  }
  getGameInfo(id: string) {
    if (!(id in this.data)) {
      return { err: "해당 게임을 찾을 수 없습니다." };
    }
    return { ans: this.data[id] };
  }
  checkGame(id: string) {
    if (!(id in this.data)) {
      return false;
    }
    const data = this.data[id];
    const delta = Date.now() - data.date;
    if (
      delta >= this.twoDayMS ||
      (data.status.phase === phase.END && delta >= this.oneDayMS)
    ) {
      delete this.data[id];
      return false;
    }
    return true;
  }
  deleteClean() {
    //console.log(Object.keys(this.data));
    //console.log(this.randomName);
    this.randomName.randomClean(this);
    //console.log(Object.keys(this.data));
    //console.log(this.randomName);
  }
}
