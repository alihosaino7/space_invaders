// Random number between ${from} and ${to}
export function getRandomNum({ from, to }) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}
