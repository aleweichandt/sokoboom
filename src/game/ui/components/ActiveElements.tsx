import React from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';

import LayoutSize from '../const/LayoutSize.ts';

const ELEMENT_SIZE_PERCENT = 0.75;

const ActiveElement: React.FC<ViewProps> = ({style, ...props}) => (
  <View style={[styles.element, style]} {...props} />
);

export const Player: React.FC<ViewProps> = ({style, ...props}) => (
  <ActiveElement style={[styles.player, style]} {...props} />
);
export const Box: React.FC<ViewProps> = ({style, ...props}) => (
  <ActiveElement style={[styles.box, style]} {...props} />
);

const styles = StyleSheet.create({
  element: {
    width: LayoutSize.Tile * ELEMENT_SIZE_PERCENT,
    height: LayoutSize.Tile * ELEMENT_SIZE_PERCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: {
    borderRadius: LayoutSize.Tile * 0.5,
    backgroundColor: 'darkgreen',
  },
  box: {
    backgroundColor: 'saddlebrown',
  },
});
