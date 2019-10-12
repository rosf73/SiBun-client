import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthController';
import LoginScreen from '../screens/LoginScreen';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();

  return isLoggedIn ?
      <TouchableOpacity onPress={logOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
      :
      <LoginScreen func={logIn}/>;
}