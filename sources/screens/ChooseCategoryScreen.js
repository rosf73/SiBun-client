import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons'

import withSuspense from '../withSuspense';

function ChooseCategoryScreen(props) {
  const handlePressBack = () => {
    props.navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={handlePressBack}>
          <Ionicon name="ios-arrow-back" size={30} color="#AAA"/>
        </TouchableOpacity>
        <Text style={styles.store}>hi</Text>
      </View>
      
      <View style={styles.client}>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  store: {
    flex: 1,
    color: '#666',
    textAlign: 'center'
  },
  client: {
    flex: 1
  }
});

// export default withSuspense(withNavigation(ChooseCategoryScreen));
export default withNavigation(ChooseCategoryScreen);