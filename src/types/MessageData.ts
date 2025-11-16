import { Ship } from "./Ship";

export type RegData = {
  name: string;
  password: string;
};

export type AddUserToRoomData = {
  indexRoom: string;
};

export type AddShipsData = {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
};

export type AttackData = {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
};

export type RandomAttackData = {
  gameId: string;
  indexPlayer: string;
};
