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
        <View>
          <Text>{this.props.name}</Text>
          <Text>{this.props.price}</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.onPlus();
              this.setState({ quantity: this.state.quantity+1 })
            }}>
            <Text>＋</Text></TouchableOpacity>
          <Text style={styles.button}>{this.state.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(this.state.quantity > 0) {
                this.props.onMinus();
                this.setState({ quantity: this.state.quantity-1 })
              }
            }}>
            <Text>－</Text></TouchableOpacity>
        </View>
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
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  right: {
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