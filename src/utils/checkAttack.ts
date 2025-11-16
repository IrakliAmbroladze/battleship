import { Ship } from "../types/Ship";
import { sendToPlayersInGame } from "./sendToPlayersInGame";

export function checkAttack(
  board: string[][],
  x: number,
  y: number,
  ships: Ship[],
): "miss" | "shot" | "killed" {
  if (board[y][x] === "ship") {
    board[y][x] = "hit";

    const hitShip = ships.find((ship) => {
      const { x: sx, y: sy } = ship.position;
      for (let i = 0; i < ship.length; i++) {
        const posX = ship.direction ? sx + i : sx;
        const posY = ship.direction ? sy : sy + i;
        if (posX === x && posY === y) return true;
      }
      return false;
    });

    if (hitShip) {
      const { x: sx, y: sy } = hitShip;
      let allHit = true;
      for (let i = 0; i < hitShip.length; i++) {
        const posX = hitShip.direction ? sx + i : sx;
        const posY = hitShip.direction ? sy : sy + i;
        if (board[posY][posX] !== "hit") {
          allHit = false;
          break;
        }
      }

      if (allHit) {
        const { x: sx, y: sy } = hitShip;
        for (let i = -1; i <= hitShip.length; i++) {
          for (let j = -1; j <= 1; j++) {
            const posX = hitShip.direction ? sx + i : sx + j;
            const posY = hitShip.direction ? sy + j : sy + i;
            if (posX >= 0 && posX < 10 && posY >= 0 && posY < 10) {
              if (board[posY][posX] === "") {
                board[posY][posX] = "miss";
                setTimeout(() => {
                  sendToPlayersInGame(hitShip.toString(), "attack", {
                    position: { x: posX, y: posY },
                    currentPlayer: "",
                    status: "miss",
                  });
                }, 100);
              }
            }
          }
        }
        return "killed";
      }
    }
    return "shot";
  } else {
    board[y][x] = "miss";
    return "miss";
  }
}
