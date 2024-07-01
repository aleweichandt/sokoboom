import React, {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {Element} from '../../../domain/const/Entity';
import {Box, Player} from './EntityElements';
import Position from '../../../domain/const/Position';

type Props = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
  element: Element;
  position: Position;
};

const MapEntity: React.FC<Props> = ({element, ...props}) => {
  switch (element) {
    case Element.Player:
      return <Player {...props} />;
    case Element.Box:
      return <Box {...props} />;
    default:
      return null;
  }
};

export default MapEntity;
