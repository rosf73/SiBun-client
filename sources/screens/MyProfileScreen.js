import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MyProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MyProfileScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});

export default MyProfileScreen;