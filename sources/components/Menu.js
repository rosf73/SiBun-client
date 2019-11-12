import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text>{this.props.name}</Text>
          <Text>{this.props.price}</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ quantity: this.state.quantity+1 })}>
            ＋</TouchableOpacity>
          <Text style={styles.button}>{this.state.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ quantity: this.state.quantity+1 })}>
            －</TouchableOpacity>
        </View>
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
    flex: 1
  },
  right: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }
});

export default Menu;