import React, {PropsWithChildren} from 'react';

import MapTile from '../../domain/const/MapTile';
import GameEntity from '../../domain/const/GameEntity';
import {Goal, Land, Void} from './TileElements';
import TileEntity from './TileEntity';

type Props = PropsWithChildren & {
  tile: MapTile;
  entity?: GameEntity;
};

const GameTile: React.FC<Props> = ({tile, entity, ...props}) => {
  switch (tile) {
    case MapTile.Land:
      return (
        <Land {...props}>
          <TileEntity entity={entity} />
        </Land>
      );
    case MapTile.Goal:
      return (
        <Goal {...props}>
          <TileEntity entity={entity} />
        </Goal>
      );
    default:
      return (
        <Void {...props}>
          <TileEntity entity={entity} />
        </Void>
      );
  }
};

export default GameTile;
