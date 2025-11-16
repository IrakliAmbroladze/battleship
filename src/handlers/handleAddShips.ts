import { games } from "../db/games";
import { createEmptyBoard } from "../utils/createEmptyBoard";
import { placeShipsOnBoard } from "../utils/placeShipsOnBoard";
import { sendMessage } from "../utils/sendMessage";
import { sendToPlayersInGame } from "../utils/sendToPlayersInGame";

export function handleAddShips(ws: WebSocket, data: any) {
  const { gameId, ships, indexPlayer } = data;
  const game = games.get(gameId);

  if (!game) return;

  game.playerShips.set(indexPlayer, ships);

  const board = createEmptyBoard();
  placeShipsOnBoard(board, ships);
  game.playerBoards.set(indexPlayer, board);

  sendMessage(
    ws,
    "start_game",
    JSON.stringify({
      ships,
      currentPlayerIndex: indexPlayer,
    }),
  );

  if (game.playerShips.size === 2) {
    game.started = true;

    sendToPlayersInGame(
      gameId,
      "turn",
      JSON.stringify({
        currentPlayer: game.currentTurn,
      }),
    );
  }
}
