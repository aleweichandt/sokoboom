import React from 'react';
import {StyleSheet} from 'react-native';

import useGameStore from '../../domain/state/gameStore.ts';
import GameView from '../components/GameView.tsx';
import GameGrid from '../components/GameGrid.tsx';
import movePlayer from '../../domain/usecase/movePlayer.ts';

const GameScreen = () => {
  const {grid} = useGameStore();
  return (
    <GameView
      style={styles.screen}
      contentStyle={styles.content}
      onMove={movePlayer}>
      <GameGrid grid={grid} />
    </GameView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;
