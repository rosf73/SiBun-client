import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class Chat extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.image} source={require("../../resources/images/logo.png")}/>

        <View>
          <Text style={styles.name}>{this.props.user}</Text>
          <View style={styles.bubble}>
            <Text style={styles.content}>{this.props.content}</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    backgroundColor: '#AFF'
  },
  content: {
    color: '#666'
  }
});

export default Chat;