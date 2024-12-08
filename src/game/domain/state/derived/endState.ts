import EndState from '../../const/EndState';
import Entity, {Element} from '../../const/Entity';
import GameState from '../../const/GameState';
import Position from '../../const/Position';
import Tile from '../../const/Tile';

const isInPosition = (entity: Entity, position: Position): boolean =>
  entity.position.x === position.x && entity.position.y === position.y;

const endState = ({grid, entities, remainingTimeMillis }: GameState): EndState => {
  if(grid.length === 0) {
    return EndState.None;
  }
  if(remainingTimeMillis === 0) {
    return EndState.Loose;
  }

  const goals: Position[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === Tile.Goal) {
        goals.push({x, y});
      }
    }
  }
  const boxes = entities.filter(it => it.element === Element.Box);

  const hasWon = goals.every(goal =>
    boxes.some(box => isInPosition(box, goal)),
  );
  if (hasWon) {
    return EndState.Win;
  }
  return EndState.None;
};

export default endState;
