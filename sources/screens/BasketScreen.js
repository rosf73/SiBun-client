import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import withSuspense from '../withSuspense';

function BasketScreen(props) {
  useEffect(() => {
    console.log(props.navigation.state.params.basket);
  }, []);

  const handlePressBack = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
        <Text style={styles.store}>{props.navigation.state.params.storeName}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  store: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  }
});

export default withSuspense(withNavigation(BasketScreen));