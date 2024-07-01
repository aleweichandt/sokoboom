import {create, StoreApi} from 'zustand';
import GameState from '../const/GameState.ts';
import Tile from '../const/Tile.ts';
import {Element} from '../const/Entity.ts';

export const initialState: GameState = {
  grid: [
    [Tile.Land, Tile.Land, Tile.Land, Tile.Land],
    [Tile.Void, Tile.Land, Tile.Land, Tile.Land],
    [Tile.Land, Tile.Land, Tile.Goal, Tile.Void],
  ],
  player: {
    element: Element.Player,
    position: {x: 1, y: 2},
    canPushEntities: true,
  },
  entities: [
    {
      element: Element.Box,
      position: {x: 1, y: 1},
      canPushEntities: false,
    },
  ],
  moves: [],
};

const useGameStore = create<GameState>()(() => initialState);

export const gameStore: StoreApi<GameState> = useGameStore;

export default useGameStore;
