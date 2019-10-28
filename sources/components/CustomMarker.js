import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'

class CustomMarker extends Component {
  render() {
    return (
      <View style={styles.container}>
  
        <View style={styles.description}>
          <Text style={styles.text}>{this.props.time} </Text>
          <Ionicon name="ios-alarm" size={25} color="#F00"/>
          <Text style={styles.text}>  {this.props.member} </Text>
          <Image style={styles.icon} source={require('../../resources/images/me.png')}/>
        </View>
  
        <View style={styles.marker}>
          <Image style={styles.image} source={{ uri: this.props.uri }}/>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#C00',
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginBottom: 3,
    backgroundColor: '#FFF'
  },
  text: {
    color: '#666',
    fontSize: 11
  },
  icon: {
    tintColor: '#0D0',
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  marker: {
    borderRadius: 100,
    borderColor: '#666',
    borderWidth: 2
  },
  image: {
    borderRadius: 100,
    height: 70,
    width: 70,
    resizeMode: 'contain'
  }
});

export default CustomMarker;