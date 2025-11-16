import { clients } from "../db/clients";

export function getPlayerIndexByWs(ws: WebSocket): string | undefined {
  for (const [index, client] of clients.entries()) {
    if (client === ws) return index;
  }
  return undefined;
}
