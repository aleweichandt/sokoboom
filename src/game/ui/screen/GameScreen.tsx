import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import useGameStore from '../../domain/state/gameStore.ts';
import GameView from '../components/GameView.tsx';
import MapGrid from '../components/map/MapGrid.tsx';
import movePlayer from '../../domain/usecase/movePlayer.ts';
import EntitiesLayer from '../components/entity/EntitiesLayer.tsx';

type StyleState = StyleProp<ViewStyle> | undefined;

const GameScreen = () => {
  const {grid, player, entities} = useGameStore();
  const [entityStyle, setEntityStyle] = useState<StyleState>(undefined);
  const onLayout = (ev: LayoutChangeEvent) => {
    setEntityStyle({
      ...styles.entity,
      width: ev.nativeEvent.layout.width,
      height: ev.nativeEvent.layout.height,
    });
  };
  return (
    <GameView
      style={styles.screen}
      contentStyle={styles.content}
      onMove={movePlayer}>
      <MapGrid grid={grid} onLayout={onLayout} />
      {entityStyle && (
        <EntitiesLayer style={entityStyle} entities={[player, ...entities]} />
      )}
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
  entity: {
    position: 'absolute',
  },
});

export default GameScreen;
