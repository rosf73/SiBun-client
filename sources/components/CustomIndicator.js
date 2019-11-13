import React from 'react';
import { StyleSheet, View, Modal, Image, ActivityIndicator } from 'react-native';

function CustomIndicator(props) {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.isLoading}
      onRequestClose={() => {console.log('Close modal')}}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../resources/images/logo.png")}/>
        <ActivityIndicator/>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040'
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 25
  }
});

export default CustomIndicator;