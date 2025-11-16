import { clients } from "../db/clients";

export function broadcastToAll(type: string, data: string) {
  const message = JSON.stringify({ type, data, id: 0 });
  console.log(`Broadcasting to all: ${message}`);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
