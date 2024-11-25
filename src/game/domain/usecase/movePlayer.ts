import Entity from '../const/Entity';
import Tile from '../const/Tile';
import Move from '../const/Move';
import Position from '../const/Position';
import {gameStore} from '../state/gameStore';

const samePosition = (entity: Entity, other: Entity): boolean =>
  entity.position.x === other.position.x &&
  entity.position.y === other.position.y;

const getNextPosition = (
  grid: Tile[][],
  {x, y}: Position,
  move: Move,
): Position => {
  switch (move) {
    case Move.Up:
      return {x, y: Math.max(y - 1, 0)};
    case Move.Down:
      return {x, y: Math.min(y + 1, grid.length - 1)};
    case Move.Left:
      return {y, x: Math.max(x - 1, 0)};
    case Move.Right:
      return {y, x: Math.min(x + 1, grid[0].length - 1)};
  }
};

const isAvailablePosition = (grid: Tile[][], {x, y}: Position): boolean =>
  grid[y][x] !== Tile.Void;

const moveEntity = (
  grid: Tile[][],
  entities: Entity[],
  target: Entity,
  move: Move,
): [boolean, Entity[], Entity] => {
  const nextTarget = {
    ...target,
    position: getNextPosition(grid, target.position, move),
  };
  if (
    samePosition(target, nextTarget) ||
    !isAvailablePosition(grid, nextTarget.position)
  ) {
    return [false, entities, target];
  }

  let nextEntities = entities;

  const nextEntity = entities.find(it => samePosition(it, nextTarget));
  if (nextEntity) {
    if (!target.canPushEntities) {
      return [false, entities, target];
    }

    const [success, entitiesUpdated] = moveEntity(
      grid,
      entities,
      nextEntity,
      move,
    );
    if (!success) {
      return [false, entities, target];
    }
    nextEntities = entitiesUpdated;
  }

  const newEntities = nextEntities.map(it => {
    if (samePosition(it, target)) {
      return nextTarget;
    }
    return it;
  });
  return [true, newEntities, nextTarget];
};

const movePlayer = (move: Move) => {
  const {grid, moves, entities, player} = gameStore.getState();
  const [success, nextEntities, nextPlayer] = moveEntity(
    grid,
    [...entities],
    player,
    move,
  );
  if (success) {
    const nextMoves = [...moves, move];
    gameStore.setState({
      moves: nextMoves,
      entities: nextEntities,
      player: nextPlayer,
    });
  }
};

export default movePlayer;
