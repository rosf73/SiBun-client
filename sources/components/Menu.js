import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}></View>
        <View style={styles.right}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  left: {

  },
  right: {

  }
});

export default Menu;