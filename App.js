import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';

import apolloClientOptions from './apollo';

const App = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ client, setClient ] = useState(null);
  const preLoad = async () => {
    try {
      const remoteImages = [
        
      ];
      const localImages = [
        require('./resources/images/test.png'),
        require('./resources/images/test2.png')
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

      setLoaded(true);
      setClient(client);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ?
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Image source={require('./resources/images/test2.png')}/>
      </View>
    </ApolloProvider>
    :
    <View style={styles.container}>
      <Image source={require('./resources/images/test.png')}/>
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