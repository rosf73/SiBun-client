import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, BackHandler } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import withSuspense from '../withSuspense';

function InputOrderInfoScreen(props) {
  const [ time, setTime ] = useState({ hour: 0, min: 0 });

  const handlePressBack = () => {
    props.navigation.goBack();
    return true;
  };
  const handlePressConfirm = () => {
    props.navigation.navigate("OrderNavigation", {  });
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
      </View>
      
      <Text style={{ fontSize: 20, padding: 20, paddingBottom: 0 }}>{props.navigation.state.params.store}</Text>
      <Text style={styles.description}>배달지를 입력해주세요</Text>
      
      <View style={styles.client}>
        <GooglePlacesAutocomplete
          placeholder='주소지 입력'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          query={{
            key: 'AIzaSyDbd8LzMXuc_A3Bkqznl9EjwF-HaQZ-v4w',
            language: 'ko',
            types: '',
          }}
          styles={{
            container: {
              flex: 0,
              width: '90%',
              height: 200,
              alignSelf: 'center'
            },
            textInputContainer: {
              backgroundColor: '#FFF',
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              height: 40,
              color: '#AAA',
              fontSize: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#CCC'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"/>
        <Text style={styles.description}>예상 주문 시간을 선택해 주세요</Text>
        <View style={styles.time}>
          <Picker
            selectedValue={time.hour}
            style={{ width: 70, height: 30 }}
            onValueChange={(itemValue, itemPosition) => setTime({ hour: itemValue, min: time.min })}>
            <Picker.Item label="0" value={0}/>
            <Picker.Item label="1" value={1}/>
          </Picker>
          <Text>시</Text>
          <Picker
            selectedValue={time.min}
            style={{ width: 70, height: 30 }}
            onValueChange={(itemValue, itemPosition) => setTime({ hour: time.hour, min: itemValue })}>
            <Picker.Item label="0" value={0}/>
            <Picker.Item label="1" value={1}/>
          </Picker>
          <Text>분</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.comfirm}
        onPress={handlePressConfirm}>
        <Text style={{ color: '#FFF', fontSize: 20 }}>확인</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    width: '100%',
    justifyContent: 'center'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  description: {
    fontSize: 20,
    padding: 20
  },
  client: {
    flex: 1
  },
  time: {
    flexDirection: 'row'
  },
  comfirm: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2937B'
  }
});

// export default withSuspense(withNavigation(InputOrderInfoScreen));
export default withNavigation(InputOrderInfoScreen);