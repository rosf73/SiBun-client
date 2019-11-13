import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    }
  }

  componentWillMount() {
    var sum = 0;
    for(var i=0; i<this.props.menus.length; i++)
      sum += this.props.menus[i].menu.price*this.props.menus[i].quantity;
    this.setState({ price: sum });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: 15 }}>
          <Text>{this.props.user}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          {this.props.menus.map(menu => {
            return <Text style={{ fontSize: 12 }}>{menu.menu.name}, </Text>
          })}
        </View>
        <View style={{ marginRight: 15 }}>
          <Text>{this.state.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  }
});

export default Order;