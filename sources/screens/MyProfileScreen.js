import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

import withSuspense from '../withSuspense';
import { CHECK_ME } from '../queries/UserQuery';

function MyProfileScreen(props) {
  const { data: { checkMe } } = useQuery(CHECK_ME, { suspend: true });

  const handlePressBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
      </View>

      <View style={styles.client}>
        <Image style={styles.image} source={require("../../resources/images/gold.png")}/>
        <Text style={{ marginBottom: 10 }}>{checkMe.number} 님</Text>
        <Text>신뢰점수 {checkMe.score} 점</Text>
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
    width: '100%',
    justifyContent: 'center'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  client: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
    marginBottom: 30
  }
});

export default withSuspense(withNavigation(MyProfileScreen));