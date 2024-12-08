import {create, StoreApi} from 'zustand';
import GameState from '../const/GameState.ts';
import {Element} from '../const/Entity.ts';

export const initialState: GameState = {
  grid: [],
  player: {
    element: Element.Player,
    position: {x: 0, y: 0},
    canPushEntities: true,
  },
  entities: [],
  moves: [],
  remainingTimeMillis: 0,
};

const useGameStore = create<GameState>()(() => initialState);

export const gameStore: StoreApi<GameState> = useGameStore;

export default useGameStore;
