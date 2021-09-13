export enum phase {
  WAIT,
  PICK,
  BAN,
  SWAP,
  END,
}

export type team = "RED" | "BLUE" | "ALL";

export type banpickNum = 1 | 2 | 3 | 4 | 5;

export interface banpickTeam {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface banpick {
  id: string;
  date: number;
  setting: gameSetting;
  status: {
    phase: phase;
    team: team;
    number: number;
    endTime: number;
    isReady: {
      blue: boolean;
      red: boolean;
    };
  };
  alreadyUsed: {
    [x: number]: boolean;
  };
  pick: {
    blue: banpickTeam;
    red: banpickTeam;
  };
  ban: {
    blue: banpickTeam;
    red: banpickTeam;
  };
}

export interface banpicks {
  [id: string]: banpick;
}

export interface code {
  id: string;
  team: "RED" | "BLUE" | "OBSERVER";
}

export interface gameSetting {
  names: {
    game: string;
    blue: string;
    red: string;
    member: {
      blue: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
      };
      red: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
      };
    };
  };
  time: {
    pick: number;
    ban: number;
    swap: number;
  };
}
