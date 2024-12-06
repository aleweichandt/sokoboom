import React from 'react';
import { createStaticNavigation, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from '../../game/ui/screen/GameScreen.tsx';
import SplashScreen from './screen/SplashScreen.tsx';

const NavSplashScreen = () => {
  const navigation = useNavigation();
  const onFinish = () => { navigation.navigate('Game', { gameId: 'game0' }); };
  return <SplashScreen onFinish={onFinish} />;
};

const NavGameScreen = () => {
  const route = useRoute();
  const { gameId } = route.params;
  return <GameScreen gameId={gameId} />;
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screens: {
    Splash: NavSplashScreen,
    Game: NavGameScreen,
  },
});
const Navigation = createStaticNavigation(RootStack);

export default Navigation;
