import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo-hooks';

import apolloClient from './sources/apollo';
import NavController from './sources/NavController';
import { AuthProvider } from './sources/AuthController';

const App = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  
  const preLoad = async () => {
    try {
      const remoteImages = [];
      const localImages = [
        require("./resources/images/logo.png"),
        require("./resources/images/back.png"),
        require("./resources/images/basket.png"),
        require("./resources/images/change.png"),
        require("./resources/images/check.png"),
        require("./resources/images/location.png"),
        require("./resources/images/me.png"),
        require("./resources/images/remove.png"),
        require("./resources/images/star.png"),
        require("./resources/images/yellowStar.png")
      ];
      await FastImage.preload(remoteImages.map(image => ({
        uri: image
      })));
      await FastImage.preload(localImages.map(image => ({
        uri: Image.resolveAssetSource(image).uri
      })));

      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
      // await AsyncStorage.setItem("isLoggedIn", "false");
      // await AsyncStorage.setItem("TOKEN", "");
      // setIsLoggedIn(false);

      // await new Promise((resolve) =>
      //   setTimeout(
      //     () => { resolve('result') }, 1000
      //   ));

      setLoaded(true);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => { // 초기 실행
    preLoad();
  }, []);

  return loaded && apolloClient && isLoggedIn !== null ?
    <ApolloProvider client={apolloClient}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <NavController/>
      </AuthProvider>
    </ApolloProvider>
    :
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./resources/images/logo.png")}/>
      <Text style={styles.loading}>loading...</Text>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2937B'
  },
  logo: {
    height: '13%',
    resizeMode: 'contain',
    marginBottom: 25
  },
  loading: {
    fontSize: 15,
    color: '#FFF'
  }
});

export default App;