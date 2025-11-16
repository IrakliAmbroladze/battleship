import type { WSMessage } from "../types/WSMessage";
import { handleAddShips } from "./handleAddShips";
import { handleAddUserToRoom } from "./handleAddUserToRoom";
import { handleAttack } from "./handleAttack";
import { handleCreateRoom } from "./handleCreateRoom";
import { handleRandomAttack } from "./handleRandomAttack";
import { handleRegistration } from "./handleRegistration";

export function handleMessage(ws: WebSocket, msg: WSMessage) {
  console.log(`Handling message type: ${msg.type}`);

  switch (msg.type) {
    case "reg":
      handleRegistration(ws, msg.data);
      break;
    case "create_room":
      handleCreateRoom(ws);
      break;
    case "add_user_to_room":
      handleAddUserToRoom(ws, msg.data);
      break;
    case "add_ships":
      handleAddShips(ws, msg.data);
      break;
    case "attack":
      handleAttack(ws, msg.data);
      break;
    case "randomAttack":
      handleRandomAttack(ws, msg.data);
      break;
    default:
      console.log(`Unknown message type: ${msg.type}`);
  }
}
