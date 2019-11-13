import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

function OrderScreen(props) {
  return (
    <View style={styles.container}>
      <Text>준비 중인 서비스입니다!</Text>
      <Text>가맹점과 연결되면 이용하실 수 있습니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default withNavigation(OrderScreen);