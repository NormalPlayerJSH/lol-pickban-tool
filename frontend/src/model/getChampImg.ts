import ChampMeta from "./ChampMeta";

export const idToChampLongImg = (id: number) => {
  if (id === 0) return "";
  return `/champImg/${ChampMeta[id].id}.jpg`;
};
