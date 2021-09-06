import { banpickNum, phase, team } from "./data";

export enum eventType {
  "join" = "join",
  "ready" = "ready",
  "complete" = "complete",
  "select" = "select",
  "swap" = "swap",
}

export interface joinData {
  code: string;
}

export interface readyData {
  team: string;
  isReady: boolean;
}

export interface completeData {
  status: {
    team: team;
    phase: phase;
    number: number;
  };
}

export interface selectData {
  status: {
    team: team;
    phase: phase.BAN | phase.PICK;
    number: number;
  };
  championId: number;
}

export interface swapData {
  team: team;
  swapNumber: [banpickNum, banpickNum];
}
