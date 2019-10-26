import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'

const CustomMarker = props => {
  const {
    uri,
    time,
    member
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.text}>{time} </Text>
        <Ionicon name="ios-alarm" size={25} color="#F00"/>
        <Text style={styles.text}>  {member} </Text>
        <Image style={styles.icon} source={require('../../resources/images/me.png')}/>
      </View>
      <View style={styles.marker}>
        <Image style={styles.image} source={{ uri }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#E2937B',
    borderRadius: 100,
    height: 70,
    width: 70,
    padding: 10,
    justifyContent: 'center'
  },
  image: {
    borderRadius: 100,
    height: '100%',
    resizeMode: 'contain'
  }
});

export default CustomMarker;