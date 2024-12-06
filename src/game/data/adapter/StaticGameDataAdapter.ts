import Entity, { Element } from '../../domain/const/Entity';
import type GameState from '../../domain/const/GameState';
import Tile from '../../domain/const/Tile';
import type StaticGameData from '../model/StaticGameData';


class StaticGameDataAdapter {
  adapt(rawData: StaticGameData): GameState | undefined {
    const player: Entity = {
      element: Element.Player,
      position: {x: 0, y: 0},
      canPushEntities: true,
    };
    const entities: Entity[] = [];
    const grid: Tile[][] = [];

    rawData.forEach((row, y) => {
      const gridRow: Tile[] = [];
      row.forEach((entry, x) => {
        let tile = Tile.Land;
        switch (entry) {
          case 1: // Player
            player.position = {x, y};
            break;
          case 2: // Box
            entities.push({
              element: Element.Box,
              position: {x, y},
              canPushEntities: false,
            });
            break;
          case 3: // Goal
            tile = Tile.Goal;
            break;
          case -1: //Void
            tile = Tile.Void;
            break;
          default:
            break;
        }
        gridRow.push(tile);
      });
      grid.push(gridRow);
    });

    return {
      grid,
      player,
      entities,
      moves: [],
    };
  }
}

export default StaticGameDataAdapter;
