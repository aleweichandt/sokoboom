import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Move from '../../../domain/const/Move';

type Props = React.PropsWithChildren & {
  style: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onMove?: (move: Move) => void;
  disabled?: boolean;
};

const GameControlArea: React.FC<Props> = ({
  contentStyle,
  children,
  onMove = () => {},
  disabled = false,
  ...props
}) => {
  const zoom = useSharedValue(1);
  const offset = useSharedValue({x: 0, y: 0});
  const mapMovement = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withSpring(mapMovement.value ? 0.7 : 1),
    transform: [
      {translateX: offset.value.x},
      {translateY: offset.value.y},
      {scale: zoom.value},
    ],
  }));

  // Map Gestures
  const pinch = Gesture.Pinch()
    .onStart(() => { mapMovement.value = true; })
    .onChange(event => {
      zoom.value = Math.max(Math.min(zoom.value * event.scaleChange, 2.0), 0.5);
    })
    .onEnd(() => {  mapMovement.value = false; });
  const pan = Gesture.Pan()
    .minPointers(2)
    .onStart(() => { mapMovement.value = true; })
    .onChange(event => {
      offset.value = {
        x: Math.max(Math.min(offset.value.x + event.changeX, 100.0), -100.0),
        y: Math.max(Math.min(offset.value.y + event.changeY, 100.0), -100.0),
      };
    })
    .onEnd(() => { mapMovement.value = false; });

  const mapGestures = Gesture.Simultaneous(pinch, pan);

  // Player Gestures
  const flingUp = Gesture.Fling()
    .enabled(!disabled)
    .direction(Directions.UP)
    .onStart(() => { runOnJS(onMove)(Move.Up); });
  const flingDown = Gesture.Fling()
    .enabled(!disabled)
    .direction(Directions.DOWN)
    .onStart(() => { runOnJS(onMove)(Move.Down); });
  const flingLeft = Gesture.Fling()
    .enabled(!disabled)
    .direction(Directions.LEFT)
    .onStart(() => { runOnJS(onMove)(Move.Left); });
  const flingRight = Gesture.Fling()
    .enabled(!disabled)
    .direction(Directions.RIGHT)
    .onStart(() => { runOnJS(onMove)(Move.Right); });

  const playerGestures = Gesture.Race(
    flingUp,
    flingDown,
    flingLeft,
    flingRight,
  );

  const globalGesture = Gesture.Simultaneous(playerGestures, mapGestures);

  return (
    <GestureHandlerRootView {...props}>
      <GestureDetector gesture={globalGesture}>
        <Animated.View style={[contentStyle, animatedStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default GameControlArea;
