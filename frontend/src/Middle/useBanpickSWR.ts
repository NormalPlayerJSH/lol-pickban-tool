import useSWR from "swr";
import { banpick } from "../model/data";

let _banpickData: banpick | null = null;
let _sessionData: "NONE" | "RED" | "BLUE" | "OBSERVER" = "NONE";

export function useBanpickSWR() {
  const { data: banpickData, mutate: banpickMutate } = useSWR(
    "banpick",
    () => _banpickData
  );
  const { data: sessionData, mutate: sessionMutate } = useSWR(
    "session",
    () => _sessionData
  );
  return {
    banpickData,
    sessionData,
    banpickMutate: function (newBanpick: banpick) {
      _banpickData = newBanpick;
      banpickMutate();
    },
    sessionMutate: function (newSession: "NONE" | "RED" | "BLUE" | "OBSERVER") {
      _sessionData = newSession;
      sessionMutate();
    },
  };
}
