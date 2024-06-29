import {create, StoreApi} from 'zustand';
import GameState from '../const/GameState.ts';
import MapTile from '../const/MapTile.ts';
import {GameElement} from '../const/GameEntity.ts';

export const initialState: GameState = {
  grid: [
    [MapTile.Land, MapTile.Land, MapTile.Land, MapTile.Land],
    [MapTile.Void, MapTile.Land, MapTile.Land, MapTile.Land],
    [MapTile.Land, MapTile.Land, MapTile.Goal, MapTile.Void],
  ],
  player: {
    element: GameElement.Player,
    position: {x: 1, y: 2},
    canPushEntities: true,
  },
  entities: [
    {
      element: GameElement.Box,
      position: {x: 1, y: 1},
      canPushEntities: false,
    },
  ],
  moves: [],
};

const useGameStore = create<GameState>()(() => initialState);

export const gameStore: StoreApi<GameState> = useGameStore;

export default useGameStore;
