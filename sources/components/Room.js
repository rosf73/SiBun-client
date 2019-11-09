import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class Room extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.marker}>
          <Image style={styles.image} source={{ uri: this.props.uri }}/>
        </View>
        <Text style={{ fontSize: 10 }}>{this.props.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  marker: {
    borderRadius: 100,
    borderColor: '#AAA',
    borderWidth: 2
  },
  image: {
    borderRadius: 100,
    height: 40,
    width: 40,
    resizeMode: 'contain'
  }
});

export default Room;