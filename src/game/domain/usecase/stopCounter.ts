import gameStore from '../state/gameStore';

const stopCounter = () => {
  const { timeRef } = gameStore.getState();
  if(timeRef) {
    clearInterval(timeRef);
    gameStore.setState({ timeRef: undefined });
  }
};

export default stopCounter;
