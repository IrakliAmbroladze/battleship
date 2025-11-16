import WebSocket, { WebSocketServer } from "ws";
import { httpServer } from "./http_server";
import type { WSMessage } from "./types/WSMessage";
import { clients } from "./db/clients";
import { handleMessage } from "./handlers/handleMessage";

const PORT = process.env.PORT || 3000;
const server = httpServer;
const wss = new WebSocketServer({ server });

console.log(`WebSocket server starting on port ${PORT}...`);

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("message", (message: string) => {
    try {
      const msg: WSMessage = JSON.parse(message.toString());
      console.log(`Received: ${message}`);
      console.log(`Parsed data type: ${typeof msg.data}`);

      if (typeof msg.data === "string" && msg.data) {
        try {
          msg.data = JSON.parse(msg.data);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.log("Data is not JSON string");
          }
        }
      }

      handleMessage(ws, msg);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    for (const [index, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(index);
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log(`WebSocket server is running on ws://localhost:3000`);
});
