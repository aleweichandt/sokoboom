import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import EndLayout from './EndLayout';
import endState from '../../../domain/state/derived/endState.ts';
import useGameStore from '../../../domain/state/gameStore';

type Props = {
  style?: StyleProp<ViewStyle>;
}

const GameMenu: React.FC<Props> = ({ style }) => {
  const endCondition = useGameStore(endState);

  return (
    <View style={[styles.screen, style]}>
      <EndLayout endState={endCondition} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameMenu;
