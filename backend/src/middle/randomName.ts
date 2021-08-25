import { randomFirst, randomLast } from "./randomNameList";
import { code } from "../model/data";

export class randomName {
  firstToNum: { [x: string]: number } = {};
  lastToNum: { [x: string]: number } = {};
  data: {
    [first: number]: {
      [last: number]: code;
    };
  } = {};
  constructor() {
    randomFirst.map((str, idx) => {
      this.firstToNum[str] = idx;
      this.data[idx] = {};
    });
    randomLast.map((str, idx) => {
      this.lastToNum[str] = idx;
      randomFirst.map((sstr, iidx) => {
        this.data[iidx][idx] = {
          team: "OBSERVER",
          id: "",
        };
      });
    });
  }
  getRandomElement<T>(lis: Array<T>) {
    const len = lis.length;
    const randNum = Math.floor(Math.random() * len);
    return lis[randNum];
  }
  getRandomCode(code: code) {
    while (true) {
      const firstStr = this.getRandomElement(randomFirst);
      const lastStr = this.getRandomElement(randomLast);
      const firstNum = this.firstToNum[firstStr];
      const lastNum = this.lastToNum[lastStr];
      if (this.data[firstNum][lastNum].id === "") {
        this.data[firstNum][lastNum] = code;
        return {
          firstStr,
          lastStr,
          answer: `${firstStr} ${lastStr}`,
        };
      }
    }
  }
  codeToId(code: string) {
    const lis = code.split(" ");
    if (lis.length !== 2) {
      return {
        err: "띄어쓰기가 잘못됐습니다.",
      };
    }
    const firstStr = lis[0];
    const lastStr = lis[1];
    if (!(firstStr in this.firstToNum) && !(lastStr in this.lastToNum)) {
      return {
        err: "존재하지 않는 코드 단어입니다.",
      };
    }
    const firstNum = this.firstToNum[firstStr];
    const lastNum = this.lastToNum[lastStr];
    const answer = this.data[firstNum][lastNum];
    if (answer.id === "") {
      return {
        err: "존재하지 않는 코드입니다.",
      };
    }
    return {
      ans: answer,
    };
  }
}
