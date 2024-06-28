import React from 'react';

import {GameElement} from '../../domain/const/GameElement';
import {Land, Void} from './TileElements';
import {Box, Goal, Player} from './ActiveElements';

type Props = {
  element: GameElement;
};

const GameTile: React.FC<Props> = ({element, ...props}) => {
  switch (element) {
    case GameElement.Land:
      return <Land {...props} />;
    case GameElement.Box:
      return (
        <Land {...props}>
          <Box />
        </Land>
      );
    case GameElement.Player:
      return (
        <Land {...props}>
          <Player />
        </Land>
      );
    case GameElement.Goal:
      return (
        <Land {...props}>
          <Goal />
        </Land>
      );
    default:
      return <Void {...props} />;
  }
};

export default GameTile;
