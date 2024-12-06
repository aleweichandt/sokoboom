import remoteConfig from '@react-native-firebase/remote-config';
import type StaticGameData from '../model/StaticGameData';

class FRCGameDatasource {
  constructor(
    private readonly frc = remoteConfig()
  ) {}

  async fetchGameData(gameId: string): Promise<StaticGameData | undefined> {
    try {
      const rawValue = this.frc.getString(gameId);
      const value: StaticGameData = JSON.parse(rawValue);
      return value;
    } catch(e) {
      return undefined;
    }
  }
}

export default FRCGameDatasource;
