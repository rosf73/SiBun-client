import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>지금은 이용할 수 없어요 ㅠㅠ</Text>
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

export default SearchScreen;