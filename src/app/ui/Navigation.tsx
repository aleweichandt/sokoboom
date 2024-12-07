import React from 'react';
import { createStaticNavigation, StaticParamList, StaticScreenProps, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from '../../game/ui/screen/GameScreen.tsx';
import SplashScreen from './screen/SplashScreen.tsx';

const NavSplashScreen = () => {
  const navigation = useNavigation();
  const onFinish = () => { navigation.navigate('Game', { gameId: 'game0' }); };
  return <SplashScreen onFinish={onFinish} />;
};

const NavGameScreen = ({ route }: StaticScreenProps<{ gameId: string }>) => {
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

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default Navigation;
