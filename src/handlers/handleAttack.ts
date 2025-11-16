import { games } from "../db/games";
import { players } from "../db/players";
import { checkAttack } from "../utils/checkAttack";
import { isGameOver } from "../utils/isGameOver";
import { sendToPlayersInGame } from "../utils/sendToPlayersInGame";
import { updateWinners } from "../utils/updateWinners";

export function handleAttack(ws: WebSocket, data: any) {
  const { gameId, x, y, indexPlayer } = data;
  const game = games.get(gameId);

  if (!game || !game.started || game.currentTurn !== indexPlayer) return;

  const opponentIndex = game.players.find((p) => p !== indexPlayer);
  if (!opponentIndex) return;

  const opponentBoard = game.playerBoards.get(opponentIndex);
  const opponentShips = game.playerShips.get(opponentIndex);

  if (!opponentBoard || !opponentShips) return;

  const result = checkAttack(opponentBoard, x, y, opponentShips);

  sendToPlayersInGame(
    gameId,
    "attack",
    JSON.stringify({
      position: { x, y },
      currentPlayer: indexPlayer,
      status: result,
    }),
  );

  if (isGameOver(opponentBoard)) {
    const winner = players.get(indexPlayer);
    if (winner) {
      winner.wins++;
    }

    sendToPlayersInGame(
      gameId,
      "finish",
      JSON.stringify({
        winPlayer: indexPlayer,
      }),
    );

    updateWinners();
    games.delete(gameId);
    return;
  }

  if (result === "miss") {
    game.currentTurn = opponentIndex;
  }

  sendToPlayersInGame(
    gameId,
    "turn",
    JSON.stringify({
      currentPlayer: game.currentTurn,
    }),
  );
}
