import GameState from '../../domain/const/GameState';
import IGameRepository from '../../domain/interface/IGameRepository';
import StaticGameDataAdapter from '../adapter/StaticGameDataAdapter';
import StaticGameDatasource from '../datasource/StaticGameDatasource';

class GamRepository implements IGameRepository {
  constructor(
    private readonly datasource: StaticGameDatasource,
    private readonly adapter: StaticGameDataAdapter,
  ) {}

  async getGame(gameId: string): Promise<GameState | undefined> {
    const rawData = await this.datasource.fetchGameData(gameId);
    if(!rawData) {
      return undefined;
    }
    const gameState = this.adapter.adapt(rawData);
    if(!gameState) {
      return undefined;
    }
    return gameState;
  }

}

export default GamRepository;
