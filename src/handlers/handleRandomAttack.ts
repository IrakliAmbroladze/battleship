import { games } from "../db/games";
import type { RandomAttackData } from "../types/MessageData";
import { handleAttack } from "./handleAttack";

export function handleRandomAttack(ws: WebSocket, data: RandomAttackData) {
  const { gameId, indexPlayer } = data;
  const game = games.get(gameId);

  if (!game || !game.started || game.currentTurn !== indexPlayer) return;

  const opponentIndex = game.players.find((p) => p !== indexPlayer);
  if (!opponentIndex) return;

  const opponentBoard = game.playerBoards.get(opponentIndex);
  if (!opponentBoard) return;

  const emptyCells: { x: number; y: number }[] = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (opponentBoard[y][x] === "" || opponentBoard[y][x] === "ship") {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  handleAttack(ws, {
    gameId,
    x: randomCell.x,
    y: randomCell.y,
    indexPlayer,
  });
}
