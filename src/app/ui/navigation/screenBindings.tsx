import React from 'react';
import {  StackActions, StaticScreenProps, useNavigation } from '@react-navigation/native';

import SplashScreen from '../screen/SplashScreen';
import GameScreen from '../../../game/ui/screen/GameScreen';
import routeNames from './routeNames';

type GameIdRouteProps = StaticScreenProps<{ gameId?: string }>

export const NavSplashScreen = ({ route }: GameIdRouteProps) => {
  const { gameId = 'game0' } = route.params || {};
  const navigation = useNavigation();
  const onFinish = () => {
    navigation.dispatch(StackActions.replace(routeNames.Game, { gameId }));
  };
  return <SplashScreen onFinish={onFinish} />;
};

export const NavGameScreen = ({ route }: GameIdRouteProps) => {
  const { gameId } = route.params;
  return <GameScreen gameId={gameId} />;
};
