import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';

import Entity from '../../../domain/const/Entity';
import MapEntity from './MapEntity';

type Props = ViewProps & {
  entities: Entity[];
};

const EntitiesLayer: React.FC<Props> = ({style, entities, ...props}) => {
  return (
    <View style={[styles.container, style]} pointerEvents="none" {...props}>
      {entities.map((entity, i) => (
        <MapEntity
          style={styles.entity}
          key={`${entity.element}-${i}`}
          element={entity.element}
          position={entity.position}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  entity: {
    position: 'absolute',
  },
});

export default EntitiesLayer;
