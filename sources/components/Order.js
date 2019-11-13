import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

class Order extends Component {
  componentWillMount() {
    for(var i=0; i<this.props.menus.length; i++) {
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: 15 }}>
          <Text>{this.props.user}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          {this.props.menus.map(menu => {
            return <Text>{menu.name}</Text>
          })}
        </View>
        <View style={{ marginRight: 15 }}>
          <Text>{this.props.user}</Text>
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
    justifyContent: 'space-between'
  }
});

export default Order;