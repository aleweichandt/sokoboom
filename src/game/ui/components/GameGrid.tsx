import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import GameTile from './GameTile.tsx';
import MapTile from '../../domain/const/MapTile.ts';
import GameEntity from '../../domain/const/GameEntity.ts';

const Column: React.FC<ViewProps> = props => (
  <View style={styles.column} {...props} />
);
const Row: React.FC<ViewProps> = props => (
  <View style={styles.row} {...props} />
);

type Props = {
  grid: MapTile[][];
  entities: GameEntity[];
};

const GameGrid: React.FC<Props> = ({grid, entities}) => (
  <Column>
    {grid.map((row, y) => (
      <Row key={y}>
        {row.map((element, x) => {
          const key = `${x}-${y}`;
          return (
            <GameTile
              key={key}
              tile={element}
              entity={entities.find(
                it => it.position.x === x && it.position.y === y,
              )}
            />
          );
        })}
      </Row>
    ))}
  </Column>
);

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

export default GameGrid;
