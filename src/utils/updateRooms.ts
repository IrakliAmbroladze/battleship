import { players } from "../db/players";
import { rooms } from "../db/rooms";
import { broadcastToAll } from "./broadcastToAll";

export function updateRooms() {
  const availableRooms = Array.from(rooms.values())
    .filter((room) => room.players.length === 1)
    .map((room) => ({
      roomId: room.roomId,
      roomUsers: room.players.map((index) => {
        const player = Array.from(players.values()).find(
          (p) => p.index === index,
        );
        return { name: player?.name || "", index };
      }),
    }));

  broadcastToAll("update_room", JSON.stringify(availableRooms));
}
