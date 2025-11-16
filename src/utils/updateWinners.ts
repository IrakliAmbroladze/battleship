import { players } from "../db/players";
import { broadcastToAll } from "./broadcastToAll";

export function updateWinners() {
  const winners = Array.from(players.values())
    .map((player) => ({ name: player.name, wins: player.wins }))
    .sort((a, b) => b.wins - a.wins);

  broadcastToAll("update_winners", JSON.stringify(winners));
}
