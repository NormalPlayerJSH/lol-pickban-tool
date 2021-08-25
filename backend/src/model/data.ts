export enum phase {
  WAIT,
  PICK,
  BAN,
  SWAP,
  END,
}

export type team = "RED" | "BLUE" | "ALL";

export interface banpickEach {
  championId: number;
  doing: boolean;
}

export interface banpickTeam {
  1: banpickEach;
  2: banpickEach;
  3: banpickEach;
  4: banpickEach;
  5: banpickEach;
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
  };
  time: {
    pick: number;
    ban: number;
    swap: number;
  };
}
