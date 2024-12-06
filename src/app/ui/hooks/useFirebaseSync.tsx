import remoteConfig from '@react-native-firebase/remote-config';
import { useEffect, DependencyList, useState } from 'react';
import remoteConfigDefaults from '../../../../res/firebase/remoteConfigDefaults.json';

// Remote config sync
const frcSync = async () => {
    const frc = remoteConfig();
    await frc.setDefaults(remoteConfigDefaults);
    await frc.fetchAndActivate();
};

const tsLoading = async (millis: number) => {
  await new Promise(r => setTimeout(r, millis));
};



const useFirebaseSync = (millis: number = 1000, deps: DependencyList = []) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const runSync = async () => {
      setLoading(true);
      // combine all loadings with a minimum time to display the screen
      await Promise.all([
        frcSync(),
        tsLoading(millis),
      ]);
      setLoading(false);
    };

    runSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isLoading;
};

export default useFirebaseSync;
