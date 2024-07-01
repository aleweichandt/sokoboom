import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import MapTile from './MapTile.tsx';
import Tile from '../../../domain/const/Tile.ts';

const Column: React.FC<ViewProps> = props => (
  <View style={styles.column} {...props} />
);
const Row: React.FC<ViewProps> = props => (
  <View style={styles.row} {...props} />
);

type Props = ViewProps & {
  grid: Tile[][];
};

const MapGrid: React.FC<Props> = ({grid, ...props}) => (
  <Column {...props}>
    {grid.map((row, y) => (
      <Row key={y}>
        {row.map((element, x) => {
          const key = `${x}-${y}`;
          return <MapTile key={key} tile={element} />;
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

export default MapGrid;
