import type StaticGameData from '../model/StaticGameData';

class StaticGameDatasource {
  constructor() {}

  async fetchGameData(_gameId: string): Promise<StaticGameData | undefined> {
    await new Promise(r => setTimeout(r, 1000));
    return [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 1, 3, -1],
    ];
  }
}

export default StaticGameDatasource;
