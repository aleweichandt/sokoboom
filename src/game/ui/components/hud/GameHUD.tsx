import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import useGameStore from '../../../domain/state/gameStore.ts';
import GameControlArea from './GameControlArea.tsx';
import MapGrid from './map/MapGrid.tsx';
import movePlayer from '../../../domain/usecase/movePlayer.ts';
import EntitiesLayer from './entity/EntitiesLayer.tsx';

type Props = {
  disabled?: boolean
}
type StyleState = StyleProp<ViewStyle> | undefined;

const GameHUD: React.FC<Props> = ({disabled = false}) => {
  const {grid, player, entities} = useGameStore();
  const [entityStyle, setEntityStyle] = useState<StyleState>(styles.entity);
  const onLayout = (ev: LayoutChangeEvent) => {
    setEntityStyle({
      ...styles.entity,
      width: ev.nativeEvent.layout.width,
      height: ev.nativeEvent.layout.height,
    });
  };
  return (
      <GameControlArea
        style={styles.screen}
        contentStyle={styles.content}
        onMove={movePlayer}
        disabled={disabled}>
        <MapGrid grid={grid} onLayout={onLayout} />
        <EntitiesLayer style={entityStyle} entities={[player, ...entities]} />
      </GameControlArea>
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

export default GameHUD;
