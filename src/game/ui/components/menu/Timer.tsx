import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle, View } from 'react-native';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import useGameStore from '../../../domain/state/gameStore';

// apply plugin
dayjs.extend(duration);


type Props = {
  style?: StyleProp<ViewStyle>;
  delta?: number
  paused?: boolean
}

const Timer: React.FC<Props> = ({ style }) => {
  const { remainingTimeMillis } = useGameStore();
  const label = dayjs.duration(remainingTimeMillis).format('mm:ss.SSS');

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Timer;
