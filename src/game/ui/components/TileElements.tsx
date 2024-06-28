import React from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';

import {LayoutSize} from '../const/LayoutSize.ts';

const Tile: React.FC<ViewProps> = ({style, ...props}) => (
  <View style={[styles.tile, style]} {...props} />
);

export const Void: React.FC<ViewProps> = ({style, ...props}) => (
  <Tile style={[styles.void, style]} {...props} />
);
export const Land: React.FC<ViewProps> = ({style, ...props}) => (
  <Tile style={[styles.land, style]} {...props} />
);

const styles = StyleSheet.create({
  tile: {
    width: LayoutSize.Tile,
    height: LayoutSize.Tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  void: {
    backgroundColor: 'black',
  },
  land: {
    backgroundColor: 'gray',
  },
});
