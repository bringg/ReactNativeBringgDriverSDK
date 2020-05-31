import DateTimePicker from '@react-native-community/datetimepicker';
import React, { SFC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  eta: Date | null;
  setETA: (eta: Date) => void;
}

const EditETAPicker: SFC<Props> = (props) => {
  const { eta, setETA } = props;
  return (
    <DateTimePicker
      style={styles.editor}
      mode="datetime"
      minuteInterval={5}
      value={eta || new Date()}
      onChange={(_, value) => {
        if (value) {
          setETA(value);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    marginBottom: 50,
  },
});

export default EditETAPicker;
