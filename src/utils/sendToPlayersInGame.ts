import { clients } from "../db/clients";
import { games } from "../db/games";
import { sendMessage } from "./sendMessage";

export function sendToPlayersInGame(
  gameId: string,
  type: string,
  data: string,
) {
  const game = games.get(gameId);
  if (!game) return;

  game.players.forEach((playerIndex) => {
    const ws = clients.get(playerIndex);
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendMessage(ws, type, data);
    }
  });
}
