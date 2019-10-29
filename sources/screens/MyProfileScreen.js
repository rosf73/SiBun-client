import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

import withSuspense from '../withSuspense';
import { CHECK_ME } from '../queries/UserQuery';

function MyProfileScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const { data: { checkMe } } = useQuery(CHECK_ME, { suspend: true });

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../../resources/images/gold.png")}/>

      <Text style={{ marginBottom: 10 }}>{checkMe.number} 님</Text>

      <Text>신뢰점수 {checkMe.score} 점</Text>
      
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
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#88F',
    borderRadius: 10,
    padding: 10,
    marginLeft: 5
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF'
  }
});

export default withSuspense(withNavigation(MyProfileScreen));