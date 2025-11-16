import { clients } from "../db/clients";
import { players } from "../db/players";
import { generateId } from "../utils/generateId";
import { sendMessage } from "../utils/sendMessage";
import { updateRooms } from "../utils/updateRooms";
import { updateWinners } from "../utils/updateWinners";

export function handleRegistration(ws: WebSocket, data: any) {
  console.log("Registration data:", data);
  const { name, password } = data;

  if (!name || !password) {
    console.log("Missing name or password");
    sendMessage(
      ws,
      "reg",
      JSON.stringify({
        name: name || "",
        index: "",
        error: true,
        errorText: "Name and password are required",
      }),
    );
    return;
  }

  let player = Array.from(players.values()).find((p) => p.name === name);

  if (player) {
    console.log("Player exists:", player.name);
    if (player.password !== password) {
      console.log("Wrong password");
      sendMessage(
        ws,
        "reg",
        JSON.stringify({
          name,
          index: player.index,
          error: true,
          errorText: "Incorrect password",
        }),
      );
      return;
    }
  } else {
    const index = generateId();
    player = { name, password, index, wins: 0 };
    players.set(index, player);
    console.log(
      "New player created:",
      player.name,
      "with index:",
      player.index,
    );
  }

  clients.set(player.index, ws);

  console.log("Sending successful registration");
  sendMessage(
    ws,
    "reg",
    JSON.stringify({
      name: player.name,
      index: player.index,
      error: false,
      errorText: "",
    }),
  );

  updateRooms();
  updateWinners();
}
