import React, { Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function withSuspense(Component) {
  return class extends React.Component {
    render() {
      return (
        <Suspense fallback={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        }>
          <Component/>
        </Suspense>
      );
    }
  }
}