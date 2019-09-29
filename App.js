import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';

import apolloClientOptions from './apollo';
import NavController from './components/NavController';

const App = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ client, setClient ] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  const preLoad = async () => {
    try {
      const remoteImages = [];
      const localImages = [
        require("./resources/images/test.png"),
        require("./resources/images/test2.png")
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
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(isLoggedIn === null || isLoggedIn === "false") {
        setIsLoggedIn(false);
      }
      else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch(e) {
      console.log(e);
    }
  }

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch(e) {
      console.log(e);
    }
  }

  return loaded && client && isLoggedIn !== null ?
    <ApolloProvider client={client}>
      <NavController/>
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
    height: '18%',
    resizeMode: 'contain'
  },
  loading: {
    fontSize: 15,
    color: '#FFF'
  }
});

export default App;