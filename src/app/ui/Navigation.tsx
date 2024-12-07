import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavGameScreen, NavSplashScreen } from './navigation/screenBindings';
import routeNames from './navigation/routeNames';

const linking = {
  prefixes: ['sokoboom://'],
};


const RootStack = createNativeStackNavigator({
  initialRouteName: routeNames.Splash,
  screens: {
    [routeNames.Splash]: {
      screen: NavSplashScreen,
      linking: {
        path: 'game/:gameId?',
      },
    },
    [routeNames.Game]: {
      screen: NavGameScreen,
      linking: {
        path: '',
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


const BaseNavigation = createStaticNavigation(RootStack);

const Navigation: React.FC = () => (
  <BaseNavigation linking={linking}/>
);


export default Navigation;
