import React, {PropsWithChildren} from 'react';

import GameEntity, {GameElement} from '../../domain/const/GameEntity';
import {Box, Player} from './ActiveElements';

type Props = PropsWithChildren & {
  entity?: GameEntity;
};

const TileEntity: React.FC<Props> = ({
  entity = {element: undefined},
  ...props
}) => {
  const {element} = entity;
  switch (element) {
    case GameElement.Player:
      return <Player {...props} />;
    case GameElement.Box:
      return <Box {...props} />;
    default:
      return null;
  }
};

export default TileEntity;
