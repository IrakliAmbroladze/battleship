import type { Ship } from "../types/Ship";

export function placeShipsOnBoard(board: string[][], ships: Ship[]): void {
  ships.forEach((ship) => {
    const { x, y } = ship.position;
    for (let i = 0; i < ship.length; i++) {
      const posX = ship.direction ? x + i : x;
      const posY = ship.direction ? y : y + i;
      if (posX < 10 && posY < 10) {
        board[posY][posX] = "ship";
      }
    }
  });
}
