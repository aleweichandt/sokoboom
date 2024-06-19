import React from 'react';
import styled from 'styled-components/native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import useGameStore from '../../domain/state/gameStore.ts';
import {GameElement} from '../../domain/const/GameElement.ts';
import {Void, Land} from '../components/TileElements.tsx';
import {Player, Box, Goal} from '../components/ActiveElements.tsx';
import {useSharedValue} from 'react-native-reanimated';

const GameCanvas = styled(GestureHandlerRootView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Column = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
`;

const GameScreen = () => {
  const {grid} = useGameStore();
  const zoom = useSharedValue(1);
  const pinch = Gesture.Pinch().onChange(event => {
    zoom.value = Math.max(Math.min(zoom.value * event.scaleChange, 2.0), 0.5);
  });
  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: 'red',
    transform: [{scale: zoom.value}],
  }));
  return (
    <GameCanvas>
      <GestureDetector gesture={pinch}>
        <Animated.View style={animatedStyles}>
          <Row>
            {grid.map((row, x) => (
              <Column key={x}>
                {row.map((element, y) => {
                  const key = `${x}-${y}`;
                  switch (element) {
                    case GameElement.Land:
                      return <Land key={key} />;
                    case GameElement.Box:
                      return (
                        <Land key={key}>
                          <Box />
                        </Land>
                      );
                    case GameElement.Player:
                      return (
                        <Land key={key}>
                          <Player />
                        </Land>
                      );
                    case GameElement.Goal:
                      return (
                        <Land key={key}>
                          <Goal />
                        </Land>
                      );
                    default:
                      return <Void key={key} />;
                  }
                })}
              </Column>
            ))}
          </Row>
        </Animated.View>
      </GestureDetector>
    </GameCanvas>
  );
};

export default GameScreen;
