import {GameElement} from './GameElement.ts';
import {Move} from './Move.ts';

export type GameState = {
  grid: GameElement[][];
  moves: Move[];
};
