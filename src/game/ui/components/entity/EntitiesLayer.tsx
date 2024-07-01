import React from 'react';
import {View, ViewProps} from 'react-native';

import Entity from '../../../domain/const/Entity';
import MapEntity from './MapEntity';

type Props = ViewProps & {
  entities: Entity[];
};

const EntitiesLayer: React.FC<Props> = ({entities, ...props}) => {
  return (
    <View pointerEvents="none" {...props}>
      {entities.map((entity, i) => (
        <MapEntity key={`${entity.element}-${i}`} entity={entity} />
      ))}
    </View>
  );
};

export default EntitiesLayer;
