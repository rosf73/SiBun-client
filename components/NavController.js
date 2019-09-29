import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsLoggedIn } from '../AuthController';

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return <View style={styles.container}>
    <Text>Here is NavController</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});