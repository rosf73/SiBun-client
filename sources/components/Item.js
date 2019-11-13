import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={{ textAlign: 'center' }}>{this.props.name}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text>{this.props.quantity}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text>{this.props.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  }
});

export default Item;