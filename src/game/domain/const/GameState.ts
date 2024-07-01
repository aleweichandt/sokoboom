import Entity from './Entity.ts';
import Tile from './Tile.ts';
import Move from './Move.ts';

type GameState = {
  grid: Tile[][];
  player: Entity;
  entities: Entity[];
  moves: Move[];
};

export default GameState;
