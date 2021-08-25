import { banpick, banpicks, gameSetting, phase } from "../model/data";
import md5 from "md5";
import { randomName } from "./randomName";

export class banpickData {
  data: banpicks = {};
  randomName: randomName;
  constructor() {
    this.randomName = new randomName();
  }
  getNewId() {
    while (true) {
      const randNum = Math.floor(Math.random() * 99999999);
      const encrypted = md5(randNum.toString());
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
      },
      pick: {
        blue: {
          1: {
            championId: 0,
            doing: false,
          },
          2: {
            championId: 0,
            doing: false,
          },
          3: {
            championId: 0,
            doing: false,
          },
          4: {
            championId: 0,
            doing: false,
          },
          5: {
            championId: 0,
            doing: false,
          },
        },
        red: {
          1: {
            championId: 0,
            doing: false,
          },
          2: {
            championId: 0,
            doing: false,
          },
          3: {
            championId: 0,
            doing: false,
          },
          4: {
            championId: 0,
            doing: false,
          },
          5: {
            championId: 0,
            doing: false,
          },
        },
      },
      ban: {
        blue: {
          1: {
            championId: 0,
            doing: false,
          },
          2: {
            championId: 0,
            doing: false,
          },
          3: {
            championId: 0,
            doing: false,
          },
          4: {
            championId: 0,
            doing: false,
          },
          5: {
            championId: 0,
            doing: false,
          },
        },
        red: {
          1: {
            championId: 0,
            doing: false,
          },
          2: {
            championId: 0,
            doing: false,
          },
          3: {
            championId: 0,
            doing: false,
          },
          4: {
            championId: 0,
            doing: false,
          },
          5: {
            championId: 0,
            doing: false,
          },
        },
      },
    };
    this.data[id] = newGame;
    console.log(newGame);
    const observerCode = this.randomName.getRandomCode({
      id,
      team: "OBSERVER",
    });
    const blueCode = this.randomName.getRandomCode({ id, team: "RED" });
    const redCode = this.randomName.getRandomCode({ id, team: "BLUE" });
    return {
      observerCode,
      blueCode,
      redCode,
    };
  }
}
