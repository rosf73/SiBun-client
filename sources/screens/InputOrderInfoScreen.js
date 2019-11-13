import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, Alert, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useInput } from '../hooks/useInput';

function InputOrderInfoScreen(props) {
  const [ location, setLocation ] = useState("주소지 선택");
  const [ time, setTime ] = useState({ hour: 0, min: 0 });
  var minList = [];
  for(var i=0; i<60; i++) {
    if(i < 10)
      minList.push("0"+i);
    else
      minList.push(String(i));
  }
  const locationInput = useInput("");

  useEffect(() => {
    initTime();
  }, []);

  const initTime = () => {
    if(new Date().getMinutes() < 50 && new Date().getHours() >= 10)
      setTime({
        hour: new Date().getHours(),
        min: new Date().getMinutes()+10
      });
    else if(new Date().getMinutes() < 50 && new Date().getHours() < 10)
      setTime({
        hour: "0"+new Date().getHours(),
        min: new Date().getMinutes()+10
      });
    else if(new Date().getMinutes() >= 50 && new Date().getHours()+1 >= 10)
      setTime({
        hour: (new Date().getHours()+1)%24,
        min: "0"+(new Date().getMinutes()+10)
      });
    else
      setTime({
        hour: "0"+((new Date().getHours()+1)%24),
        min: "0"+(new Date().getMinutes()-50)
      });
  }
  const handlePressBack = () => {
    props.navigation.goBack();
    return true;
  };
  const handlePressConfirm = () => {
    if(location === "주소지 선택")
      Alert.alert("주소지를 선택해주세요");
    else if(locationInput.value === "")
      Alert.alert("추가 주소지를 입력해주세요");
    else if((new Date().getHours() < time.hour && new Date().getMinutes() < time.min)
         || (new Date().getHours() == time.hour && new Date().getMinutes()+10 > time.min)) {
      Alert.alert("현재 시간으로부터 10분 이상/1시간 이내의 시간으로 주문 예약할 수 있습니다");
      initTime();
    }
    else {
      props.navigation.navigate("OrderNavigation", {
        storeName: props.navigation.state.params.store,
        time: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"T"+time.hour+":"+time.min,
        location,
        addLocation: locationInput.value,
        boss: true
      });
    }
  }
  const handleChangeLocation = (itemValue, itemPosition) => {
    setLocation(itemValue);
  }
  const handleChangeHours = (itemValue, itemPosition) => {
    setTime({ hour: itemValue, min: time.min });
  }
  const handleChangeMins = (itemValue, itemPosition) => {
    setTime({ hour: time.hour, min: itemValue });
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
      <Text style={styles.description}>배달지를 선택해주세요</Text>
      
      <View style={styles.client}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ fontSize: 18 }}>{location}</Text>
          <Picker
            selectedValue={location}
            style={{ width: 50, height: 50 }}
            onValueChange={handleChangeLocation}>
            <Picker.Item label="금오공과대학교 기숙사" value="금오공과대학교 기숙사"/>
            <Picker.Item label="금오공과대학교 테크노관" value="금오공과대학교 테크노관"/>
            <Picker.Item label="금오공과대학교 디지털관" value="금오공과대학교 디지털관"/>
            <Picker.Item label="금오공과대학교 글로벌관" value="금오공과대학교 글로벌관"/>
            <Picker.Item label="금오공과대학교 학생회관" value="금오공과대학교 학생회관"/>
          </Picker>
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ color: '#666', fontSize: 16 }}
            {...locationInput}
            placeholder="추가 주소지 입력"
            placeholderTextColor="#CCC"/>
        </View>
        <Text style={styles.description}>예상 주문 시간을 선택해 주세요</Text>
        <View style={styles.time}>
          <Text>{time.hour}</Text>
          <Picker
            selectedValue={time.hour}
            style={{ width: 30, height: 30 }}
            onValueChange={handleChangeHours}>
            <Picker.Item label={String(new Date().getHours())} value={new Date().getHours()}/>
            <Picker.Item label={String((new Date().getHours()+1)%24)} value={(new Date().getHours()+1)%24}/>
          </Picker>
          <Text style={{ fontSize: 18, marginRight: 20 }}>시</Text>
          <Text>{time.min}</Text>
          <Picker
            selectedValue={time.min}
            style={{ width: 30, height: 30 }}
            onValueChange={handleChangeMins}>
            {
              minList.map((item, index) => (
                <Picker.item key={index} label={item} value={item}/>
              ))
            }
          </Picker>
          <Text style={{ fontSize: 18 }}>분</Text>
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
  input: {
    width: '80%',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginBottom: 30
  },
  time: {
    flexDirection: 'row',
    paddingLeft: 35
  },
  comfirm: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2937B'
  }
});

export default withNavigation(InputOrderInfoScreen);

/* <GooglePlacesAutocomplete
  placeholder='주소지 입력'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
    setLocation(data.description);
  }}
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
      color: '#666',
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#CCC'
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
  }}
  nearbyPlacesAPI="GooglePlacesSearch"/> */