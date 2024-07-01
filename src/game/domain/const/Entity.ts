import Position from './Position';

export enum Element {
  Player = 0,
  Box = 1,
}

type Entity = {
  element: Element;
  position: Position;
  canPushEntities: boolean;
};

export default Entity;
