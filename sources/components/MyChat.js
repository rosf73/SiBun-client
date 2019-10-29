import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class MyChat extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{ maxWidth: '70%', alignItems: 'flex-end' }}>
          <Text style={styles.name}>{this.props.user}</Text>
          <View style={styles.bubble}>
            <Text style={styles.content}>{this.props.content}</Text>
          </View>
        </View>

        <Image style={styles.image} source={require("../../resources/images/gold.png")}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    resizeMode: 'contain',
    marginLeft: 15
  },
  name: {
    color: '#666'
  },
  bubble: {
    borderRadius: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#FFA'
  },
  content: {
    color: '#666'
  }
});

export default MyChat;