import { Text, StyleSheet } from 'react-native';
import React from 'react';

export default function LoadingSDK() {
  return <Text style={styles.loading}>Loading</Text>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
