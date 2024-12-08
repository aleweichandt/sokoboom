import React, {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import Entity, {Element} from '../../../../domain/const/Entity';
import {Box, Player} from './EntityElements';

type Props = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
  entity: Entity;
};

const MapEntity: React.FC<Props> = ({entity, ...props}) => {
  const {element, position} = entity;
  switch (element) {
    case Element.Player:
      return <Player position={position} {...props} />;
    case Element.Box:
      return <Box position={position} {...props} />;
    default:
      return null;
  }
};

export default MapEntity;
