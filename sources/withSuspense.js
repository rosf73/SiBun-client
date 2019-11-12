import React, { Suspense } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';

export default function withSuspense(Component) {
  return class extends React.Component {
    render() {
      return (
        <Suspense fallback={
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E2937B'
          }}>
            <Image style={{
              height: '13%',
              resizeMode: 'contain',
              marginBottom: 25
            }}
            source={require("../resources/images/logo.png")}/>
            <ActivityIndicator/>
            <Text style={{
              fontSize: 15,
              color: '#FFF'
            }}>loading...</Text>
          </View>
        }>
          <Component/>
        </Suspense>
      );
    }
  }
}