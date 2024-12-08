import React from 'react';
import {View, ViewProps, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import LayoutSize from '../const/LayoutSize.ts';
import Position from '../../../../domain/const/Position.ts';

const ELEMENT_SIZE_PERCENT = 0.75;

type Props = AnimatedProps<ViewProps> & {
  position: Position;
  contentStyle?: StyleProp<ViewStyle>;
};

const EntityElement: React.FC<Props> = ({
  style,
  position,
  contentStyle,
  ...props
}) => {
  const animatedStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: withTiming(position.x * LayoutSize.Tile),
      top: withTiming(position.y * LayoutSize.Tile),
    }),
    [position],
  );
  return (
    <Animated.View style={[styles.container, animatedStyle, style]} {...props}>
      <View style={[styles.entity, contentStyle]} />
    </Animated.View>
  );
};

export const Box: React.FC<Props> = ({contentStyle, ...props}) => (
  <EntityElement contentStyle={[styles.box, contentStyle]} {...props} />
);

export const Player: React.FC<Props> = ({contentStyle, ...props}) => (
  <EntityElement contentStyle={[styles.player, contentStyle]} {...props} />
);
const styles = StyleSheet.create({
  container: {
    width: LayoutSize.Tile,
    height: LayoutSize.Tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entity: {
    width: LayoutSize.Tile * ELEMENT_SIZE_PERCENT,
    height: LayoutSize.Tile * ELEMENT_SIZE_PERCENT,
  },
  player: {
    borderRadius: LayoutSize.Tile * 0.5,
    backgroundColor: 'darkgreen',
  },
  box: {
    backgroundColor: 'saddlebrown',
  },
});
