export function sendMessage(ws: WebSocket, type: string, data: string) {
  const message = JSON.stringify({ type, data, id: 0 });
  console.log(`Sending: ${message}`);
  ws.send(message);
}
