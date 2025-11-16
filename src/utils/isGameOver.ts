export function isGameOver(board: string[][]): boolean {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === "ship") return false;
    }
  }
  return true;
}
