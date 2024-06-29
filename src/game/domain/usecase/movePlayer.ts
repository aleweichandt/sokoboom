import {GameElement} from '../const/GameElement';
import {Move} from '../const/Move';
import {gameStore} from '../state/gameStore';

type Position = {
  x: number;
  y: number;
};

const getPlayerPosition = (grid: GameElement[][]): Position => {
  for (let x = 0; x < grid.length; x++) {
    const col = grid[x];
    for (let y = 0; y < col.length; y++) {
      const el = col[y];
      if (el === GameElement.Player) {
        return {x, y};
      }
    }
  }
  return {x: -1, y: -1};
};

const getNextPosition = (
  grid: GameElement[][],
  {x, y}: Position,
  move: Move,
): Position => {
  switch (move) {
    case Move.Up:
      return {x, y: Math.max(y - 1, 0)};
    case Move.Down:
      return {x, y: Math.min(y + 1, grid[0].length)};
    case Move.Left:
      return {y, x: Math.max(x - 1, 0)};
    case Move.Right:
      return {y, x: Math.min(x + 1, grid.length)};
  }
};

const getElementInPosition = (
  grid: GameElement[][],
  {x, y}: Position,
): GameElement => {
  return grid[x][y];
};

const gridWithUpdate = (
  grid: GameElement[][],
  pos: Position,
  element: GameElement,
) => {
  const newGrid: GameElement[][] = [];
  for (let x = 0; x < grid.length; x++) {
    const newCol: GameElement[] = [];
    for (let y = 0; y < grid[x].length; y++) {
      if (pos.x === x && pos.y === y) {
        newCol.push(element);
      } else {
        newCol.push(grid[x][y]);
      }
    }
    newGrid.push(newCol);
  }
  return newGrid;
};

const moveBox = (
  grid: GameElement[][],
  boxPosition: Position,
  move: Move,
): [boolean, GameElement[][]] => {
  const nextPlayerPosition = getNextPosition(grid, boxPosition, move);
  const element = getElementInPosition(grid, nextPlayerPosition);
  if (element === GameElement.Land) {
    const newGrid = gridWithUpdate(
      gridWithUpdate(grid, boxPosition, GameElement.Land),
      nextPlayerPosition,
      GameElement.Box,
    );
    return [true, newGrid];
  }
  return [false, grid];
};

const movePlayer = (move: Move) => {
  const {grid, moves} = gameStore.getState();
  const playerPosition = getPlayerPosition(grid);
  const nextPlayerPosition = getNextPosition(grid, playerPosition, move);
  const element = getElementInPosition(grid, nextPlayerPosition);

  let nextGrid = grid;
  let nextMoves = moves;
  switch (element) {
    case GameElement.Box:
      const [moved, gridWithBoxMove] = moveBox(
        nextGrid,
        nextPlayerPosition,
        move,
      );
      nextGrid = gridWithBoxMove;
      if (!moved) {
        break;
      }
    case GameElement.Goal:
    case GameElement.Land:
      nextGrid = gridWithUpdate(
        gridWithUpdate(nextGrid, playerPosition, GameElement.Land),
        nextPlayerPosition,
        GameElement.Player,
      );
      nextMoves = [...moves, move];
      break;
    default:
      break;
  }
  if (nextMoves.length > moves.length) {
    gameStore.setState({
      grid: nextGrid,
      moves: nextMoves,
    });
  }
};

export default movePlayer;
