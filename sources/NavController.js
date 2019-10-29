import React from 'react';

import { useIsLoggedIn, useLogIn } from './AuthController';
import LoginScreen from './screens/LoginScreen';
import MainNavigation from './navigations/MainNavigation';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();

  return isLoggedIn ?
    <MainNavigation/>
    :
    <LoginScreen func={logIn}/>;
}