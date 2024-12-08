import React from 'react';
import {StyleProp, StyleSheet, View, Text, ViewStyle} from 'react-native';
import EndState from '../../../domain/const/EndState';

type Props = {
  style: StyleProp<ViewStyle>;
  endState: EndState;
};

const endLabel: Record<EndState, string> = {
  [EndState.None]: '',
  [EndState.Loose]: 'You lost',
  [EndState.Win]: 'You won',
};

const EndLayout: React.FC<Props> = ({style, endState}) => {
  if (endState === EndState.None) {
    return null;
  }
  const endStyle = endState === EndState.Win ? styles.win : styles.loose;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Game End</Text>
      <Text style={[styles.label, endStyle]}>{endLabel[endState]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    color: 'black',
  },
  win: {
    color: 'green',
  },
  loose: {
    color: 'red',
  },
});

export default EndLayout;
