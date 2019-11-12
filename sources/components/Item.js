import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>{this.props.name}</Text>
        <Text style={{ padding: 10 }}>{this.props.quantity}</Text>
        <Text style={{ padding: 10 }}>{this.props.price}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  }
});

export default Item;