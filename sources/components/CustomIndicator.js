import React from 'react';
import { StyleSheet, View, Modal, Image, ActivityIndicator } from 'react-native';

function CustomIndicator(props) {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.isLoading}
      onRequestClose={() => {console.log('Close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image style={styles.logo} source={require("../../resources/images/logo.png")}/>
          <ActivityIndicator/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    height: '13%',
    resizeMode: 'contain',
    marginBottom: 25
  }
});

export default CustomIndicator;