import styled from 'styled-components/native';
import {LayoutSize} from '../const/LayoutSize.ts';

const Tile = styled.View`
  width: ${LayoutSize.Tile}px;
  height: ${LayoutSize.Tile}px;
  align-items: center;
  justify-content: center;
`;

export const Void = styled(Tile)`
  background-color: black;
`;
export const Land = styled(Tile)`
  background-color: gray;
`;
