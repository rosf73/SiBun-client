import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [ loaded, setLoaded ] = useState(false);

  return loaded ? 
    <View style={styles.container}>
      <Text>hello world!</Text>
    </View>
    :
    <View style={styles.container}>
      <Image source={require('./resources/images/test.png')}/>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default App;