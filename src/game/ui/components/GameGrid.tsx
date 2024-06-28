import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {GameElement} from '../../domain/const/GameElement.ts';
import {Void, Land} from '../components/TileElements.tsx';
import {Player, Box, Goal} from '../components/ActiveElements.tsx';

const Column: React.FC<ViewProps> = props => (
  <View style={styles.column} {...props} />
);
const Row: React.FC<ViewProps> = props => (
  <View style={styles.row} {...props} />
);

type Props = {
  grid: GameElement[][];
};

const GameGrid: React.FC<Props> = ({grid}) => (
  <Row>
    {grid.map((row, x) => (
      <Column key={x}>
        {row.map((element, y) => {
          const key = `${x}-${y}`;
          switch (element) {
            case GameElement.Land:
              return <Land key={key} />;
            case GameElement.Box:
              return (
                <Land key={key}>
                  <Box />
                </Land>
              );
            case GameElement.Player:
              return (
                <Land key={key}>
                  <Player />
                </Land>
              );
            case GameElement.Goal:
              return (
                <Land key={key}>
                  <Goal />
                </Land>
              );
            default:
              return <Void key={key} />;
          }
        })}
      </Column>
    ))}
  </Row>
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
