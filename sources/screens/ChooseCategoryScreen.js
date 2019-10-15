import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ChooseCategoryScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ChooseCategoryScreen</Text>
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

export default ChooseCategoryScreen;