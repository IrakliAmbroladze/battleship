import { Ship } from "./Ship";

export type Game = {
  gameId: string;
  players: string[];
  playerShips: Map<string, Ship[]>;
  playerBoards: Map<string, string[][]>;
  currentTurn: string;
  started: boolean;
};
