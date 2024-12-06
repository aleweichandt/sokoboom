import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import useFirebaseSync from '../hooks/useFirebaseSync';

type Props = {
  onFinish: () => void
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const isLoading = useFirebaseSync();
  useEffect(() => {
    if(!isLoading) {
      onFinish();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {},
});

export default SplashScreen;
