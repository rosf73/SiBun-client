import React from 'react';
import { StyleSheet, View } from 'react-native';

const CustomMarker = props => {
  const {
    url,
    name,
    time,
    member
  } = props;

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E2937B',
    borderRadius: 100,
    height: 40,
    width: 40,
    padding: 10
  }
});

export default CustomMarker;