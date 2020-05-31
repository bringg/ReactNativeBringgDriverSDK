import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useIsLoggedIn } from './hooks/useIsLoggedIn';
import LoggedOut from './containers/logged-out/LoggedOut';
import LoggedIn from './containers/logged-in/LoggedIn';

export default function App() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  safeArea: {
    flex: 1,
  },
});
