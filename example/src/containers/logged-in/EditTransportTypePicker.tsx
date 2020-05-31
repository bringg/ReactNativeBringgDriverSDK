import React, { SFC } from 'react';
import { TransportType } from 'react-native-bringg-driver-sdk';
import { Picker, StyleSheet } from 'react-native';
import {
  AllowedTransportTypes,
  transportTypeDisplayLabel,
} from './AllowedTransportTypes';

interface Props {
  transportType: TransportType | null;
  setTransportType: (selectedTransportType: TransportType) => void;
}

const EditTransportTypePicker: SFC<Props> = (props) => {
  const { transportType, setTransportType } = props;
  return (
    <Picker
      selectedValue={transportType}
      style={styles.editor}
      onValueChange={(selectedTransportType) =>
        setTransportType(selectedTransportType)
      }
    >
      <Picker.Item label="" value={null} />
      {AllowedTransportTypes.map((allowedTransportType) => {
        return (
          <Picker.Item
            key={transportTypeDisplayLabel(allowedTransportType)}
            label={transportTypeDisplayLabel(allowedTransportType)}
            value={allowedTransportType}
          />
        );
      })}
    </Picker>
  );
};

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    marginBottom: 50,
  },
});

export default EditTransportTypePicker;
