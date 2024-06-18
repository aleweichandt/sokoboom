import React from 'react';
import styled from 'styled-components/native';
import useGameStore from '../../domain/state/gameStore.ts';
import {GameElement} from '../../domain/const/GameElement.ts';

const ITEM_SIZE_PX = 48;
const CONTENT_SIZE_PX = 32;

const GameCanvas = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Grid = styled.View`
  width: ${ITEM_SIZE_PX}px;
  height: ${ITEM_SIZE_PX}px;
  align-items: center;
  justify-content: center;
`;
const Content = styled.View`
  width: ${CONTENT_SIZE_PX}px;
  height: ${CONTENT_SIZE_PX}px;
  align-items: center;
  justify-content: center;
`;
const Void = styled(Grid)`
  background-color: black;
`;
const Land = styled(Grid)`
  background-color: gray;
`;
const Goal = styled(Content)`
  background-color: coral;
`;
const Player = styled(Content)`
  border-radius: ${ITEM_SIZE_PX / 2}px;
  background-color: darkgreen;
`;
const Box = styled(Content)`
  background-color: saddlebrown;
`;

const Column = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
`;

const GameScreen = () => {
  const {grid} = useGameStore();
  return (
    <GameCanvas>
      <Row>
        {grid.map(row => (
          <Column>
            {row.map(element => {
              switch (element) {
                case GameElement.Land:
                  return <Land />;
                case GameElement.Box:
                  return (
                    <Land>
                      <Box />
                    </Land>
                  );
                case GameElement.Player:
                  return (
                    <Land>
                      <Player />
                    </Land>
                  );
                case GameElement.Goal:
                  return (
                    <Land>
                      <Goal />
                    </Land>
                  );
                default:
                  return <Void />;
              }
            })}
          </Column>
        ))}
      </Row>
    </GameCanvas>
  );
};

export default GameScreen;
