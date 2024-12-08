import React, {PropsWithChildren} from 'react';

import Tile from '../../../../domain/const/Tile';
import {Goal, Land, Void} from './TileElements';

type Props = PropsWithChildren & {
  tile: Tile;
};

const MapTile: React.FC<Props> = ({tile, ...props}) => {
  switch (tile) {
    case Tile.Land:
      return <Land {...props} />;
    case Tile.Goal:
      return <Goal {...props} />;
    default:
      return <Void {...props} />;
  }
};

export default MapTile;
