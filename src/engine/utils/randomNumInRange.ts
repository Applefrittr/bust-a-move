export default function randomNumInRange(start: number, end: number) {
  return Math.round(Math.random() * end + start);
}
