import Position from './Position';

export enum GameElement {
  Player = 0,
  Box = 1,
}

type GameEntity = {
  element: GameElement;
  position: Position;
  canPushEntities: boolean;
};

export default GameEntity;
