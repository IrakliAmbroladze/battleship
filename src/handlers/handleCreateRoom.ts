import { rooms } from "../db/rooms";
import type { Room } from "../types/Room";
import { generateId } from "../utils/generateId";
import { getPlayerIndexByWs } from "../utils/getPlayerIndexByWs";
import { updateRooms } from "../utils/updateRooms";

export function handleCreateRoom(ws: WebSocket) {
  const playerIndex = getPlayerIndexByWs(ws);
  if (!playerIndex) return;

  const roomId = generateId();
  const room: Room = {
    roomId,
    players: [playerIndex],
  };

  rooms.set(roomId, room);
  updateRooms();
}
