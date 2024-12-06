import IGameRepository from '../interface/IGameRepository';
import { gameStore } from '../state/gameStore';

const loadGameFactory = (repository: IGameRepository) => async (gameId: string): Promise<void> => {
  const gameState = await repository.getGame(gameId);
  if(gameState) {
    gameStore.setState(gameState);
  }
  return;
};

export default loadGameFactory;
