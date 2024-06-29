import GameEntity from './GameEntity.ts';
import MapTile from './MapTile.ts';
import Move from './Move.ts';

type GameState = {
  grid: MapTile[][];
  player: GameEntity;
  entities: GameEntity[];
  moves: Move[];
};

export default GameState;
