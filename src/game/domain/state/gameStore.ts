import {create, StoreApi} from 'zustand';
import {GameState} from '../const/GameState.ts';
import {GameElement} from '../const/GameElement.ts';

export const initialState: GameState = {
  grid: [
    [GameElement.Void, GameElement.Land, GameElement.Land],
    [GameElement.Land, GameElement.Box, GameElement.Player],
    [GameElement.Land, GameElement.Land, GameElement.Goal],
  ],
  moves: [],
};

const useGameStore = create<GameState>()(() => initialState);

export const gameStore: StoreApi<GameState> = useGameStore;

export default useGameStore;
