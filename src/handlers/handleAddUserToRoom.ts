import { clients } from "../db/clients";
import { games } from "../db/games";
import { rooms } from "../db/rooms";
import type { Game } from "../types/Game";
import type { AddUserToRoomData } from "../types/MessageData";
import { generateId } from "../utils/generateId";
import { getPlayerIndexByWs } from "../utils/getPlayerIndexByWs";
import { sendMessage } from "../utils/sendMessage";
import { updateRooms } from "../utils/updateRooms";

export function handleAddUserToRoom(ws: WebSocket, data: AddUserToRoomData) {
  const playerIndex = getPlayerIndexByWs(ws);
  if (!playerIndex) return;

  const room = rooms.get(data.indexRoom);
  if (!room || room.players.length !== 1) return;

  room.players.push(playerIndex);

  const gameId = generateId();
  const game: Game = {
    gameId,
    players: [...room.players],
    playerShips: new Map(),
    playerBoards: new Map(),
    currentTurn: room.players[0],
    started: false,
  };

  games.set(gameId, game);

  room.players.forEach((pIndex, idx) => {
    const playerWs = clients.get(pIndex);
    if (playerWs) {
      sendMessage(
        playerWs,
        "create_game",
        JSON.stringify({
          idGame: gameId,
          idPlayer: pIndex,
        }),
      );
    }
  });

  // Remove room from available rooms
  rooms.delete(data.indexRoom);
  updateRooms();
}
