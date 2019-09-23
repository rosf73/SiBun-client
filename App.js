import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';

import apolloClientOptions from './apollo';

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
      <View style={styles.container}>
        { isLoggedIn === true ?
          <TouchableOpacity onPress={logUserOut}><Text>logOut</Text></TouchableOpacity>
          :
          <TouchableOpacity onPress={logUserIn}><Text>logIn</Text></TouchableOpacity>
        }
      </View>
    </ApolloProvider>
    :
    <View style={styles.container}>
      <Image source={require("./resources/images/test2.png")}/>
      <Text>로딩중</Text>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});

export default App;