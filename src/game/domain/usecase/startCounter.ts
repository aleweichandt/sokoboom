import dayjs from 'dayjs';
import gameStore from '../state/gameStore';
import stopCounter from './stopCounter';

const DELTA_TIME = 100;

const startCounter = () => {
  const { remainingTimeMillis } = gameStore.getState();
  if(remainingTimeMillis <= 0) {
    return;
  }

  let refTs = dayjs().valueOf();
  const timeRef = setInterval(() => {
    const { remainingTimeMillis: currentTime } = gameStore.getState();

    const nowTs = dayjs().valueOf();
    const realDelta = nowTs - refTs;
    let nextTime = currentTime - realDelta;
    if(nextTime < 1000) {
      nextTime = 0;
    }
    refTs = nowTs;

    gameStore.setState({ remainingTimeMillis: nextTime });

    if(nextTime <= 0) {
      stopCounter();
    }
  }, DELTA_TIME);
  gameStore.setState({ timeRef });
};

export default startCounter;
