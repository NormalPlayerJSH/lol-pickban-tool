export function getRandomElement<T>(lis: Array<T>) {
  const len = lis.length;
  const randNum = Math.floor(Math.random() * len);
  return lis[randNum];
}

export default getRandomElement;
