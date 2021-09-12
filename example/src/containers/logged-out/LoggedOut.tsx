import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { activeCustomerManager } from '../../../../lib/typescript';
import { ActionButton } from '../../components/ActionButton';
import { useInitializeBringgDriverSDK } from '../../hooks/useInitializeBringgDriverSDK';
import LoadingSDK from './LoadingSDK';

export default function LoggedOut() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const isInitialized = useInitializeBringgDriverSDK();

  // This makes sure that no functionallity from the Bringg SDK is displayed before the SDK is initialized
  if (isInitialized) {
    return <View>
      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        ></MapView>
      </View>
    </View>;
  } else {
    return <LoadingSDK />;
  }
}


const styles = StyleSheet.create({
  mapcontainer: {
  },
  map: {
    width: '100%',
    height: 200,
  },
});
