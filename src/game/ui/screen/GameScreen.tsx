import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import useGameStore from '../../domain/state/gameStore.ts';
import endState from '../../domain/state/derived/endState.ts';
import EndState from '../../domain/const/EndState.ts';
import EndLayout from '../components/EndLayout.tsx';
import GameLayout from './GameLayout.tsx';
import loadGameFactory from '../../domain/usecase/loadGame.ts';
import GamRepository from '../../data/repository/GameRepository.ts';
import StaticGameDatasource from '../../data/datasource/StaticGameDatasource.ts';
import StaticGameDataAdapter from '../../data/adapter/StaticGameDataAdapter.ts';

type Props = {
  gameId: string
}

const loadGame = loadGameFactory(new GamRepository(new StaticGameDatasource(), new StaticGameDataAdapter()));

const GameScreen: React.FC<Props> = ({ gameId }) => {
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
      : (<GameLayout disabled={endCondition !== EndState.None } />)}
      <EndLayout style={styles.end} endState={endCondition} />
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
  end: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default GameScreen;
