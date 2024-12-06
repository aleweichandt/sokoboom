import type GameState from '../const/GameState';

interface IGameRepository {
  getGame(gameId: string): Promise<GameState | undefined>
}

export default IGameRepository;
