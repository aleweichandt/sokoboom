import styled from 'styled-components/native';
import {LayoutSize} from '../const/LayoutSize.ts';

const ELEMENT_SIZE_PERCENT = 0.75;

const ActiveElement = styled.View`
  width: ${LayoutSize.Tile * ELEMENT_SIZE_PERCENT}px;
  height: ${LayoutSize.Tile * ELEMENT_SIZE_PERCENT}px;
  align-items: center;
  justify-content: center;
`;

export const Goal = styled(ActiveElement)`
  background-color: coral;
`;
export const Player = styled(ActiveElement)`
  border-radius: ${LayoutSize.Tile * 0.5}px;
  background-color: darkgreen;
`;
export const Box = styled(ActiveElement)`
  background-color: saddlebrown;
`;
