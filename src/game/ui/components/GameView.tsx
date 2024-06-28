import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
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

type Props = React.PropsWithChildren & {
  style: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const GameView: React.FC<Props> = ({contentStyle, children, ...props}) => {
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
    .onStart(() => {
      mapMovement.value = true;
    })
    .onChange(event => {
      zoom.value = Math.max(Math.min(zoom.value * event.scaleChange, 2.0), 0.5);
    })
    .onEnd(() => {
      mapMovement.value = false;
    });
  const pan = Gesture.Pan()
    .onStart(() => {
      mapMovement.value = true;
    })
    .onChange(event => {
      offset.value = {
        x: Math.max(Math.min(offset.value.x + event.changeX, 100.0), -100.0),
        y: Math.max(Math.min(offset.value.y + event.changeY, 100.0), -100.0),
      };
    })
    .onEnd(() => {
      mapMovement.value = false;
    });

  const mapGestures = Gesture.Race(pan, pinch);

  // Player Gestures
  const flingUp = Gesture.Fling()
    .blocksExternalGesture(pan)
    .direction(Directions.UP)
    .onStart(() => console.log('----> up'));
  const flingDown = Gesture.Fling()
    .blocksExternalGesture(pan)
    .direction(Directions.DOWN)
    .onStart(() => console.log('----> down'));
  const flingLeft = Gesture.Fling()
    .blocksExternalGesture(pan)
    .direction(Directions.LEFT)
    .onStart(() => console.log('----> left'));
  const flingRight = Gesture.Fling()
    .blocksExternalGesture(pan)
    .direction(Directions.RIGHT)
    .onStart(() => console.log('----> right'));

  const playerGestures = Gesture.Race(
    flingUp,
    flingDown,
    flingLeft,
    flingRight,
  );

  const globalGesture = Gesture.Exclusive(playerGestures, mapGestures);

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

export default GameView;
