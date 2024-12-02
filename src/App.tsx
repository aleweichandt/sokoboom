import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from './game/ui/screen/GameScreen.tsx';

const RootStack = createNativeStackNavigator({
  screens: {
    Game: GameScreen,
  },
});
const Navigation = createStaticNavigation(RootStack);

function App() {
  return (
    <Navigation />
  );
}

export default App;
