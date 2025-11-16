export function createEmptyBoard(): string[][] {
  return Array(10)
    .fill(null)
    .map(() => Array(10).fill(""));
}
