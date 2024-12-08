import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import useGameStore from '../../domain/state/gameStore.ts';
import endState from '../../domain/state/derived/endState.ts';
import EndState from '../../domain/const/EndState.ts';
import GameHUD from '../components/hud/GameHUD.tsx';
import loadGameFactory from '../../domain/usecase/loadGame.ts';
import GamRepository from '../../data/repository/GameRepository.ts';
import GameMenu from '../components/menu/GameMenu.tsx';

type Props = {
  gameId?: string
}

const loadGame = loadGameFactory(new GamRepository());

const GameScreen: React.FC<Props> = ({ gameId = 'game0' }) => {
  const [isLoading, setLoading] = useState(true);
  const endCondition = useGameStore(endState);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadGame(gameId);
      setLoading(false);
    };
    load();
  }, [gameId]);

  return (
    <View style={styles.screen}>
      {isLoading
      ? (<ActivityIndicator size="large" style={styles.loader}/>)
      : (<GameHUD disabled={endCondition !== EndState.None } />)}
      <GameMenu style={styles.menu} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  loader: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default GameScreen;
