import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, Alert, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';

import { useInput } from '../hooks/useInput';

function InputOrderInfoScreen(props) {
  const [ location, setLocation ] = useState("금오공과대학교 기숙사");
  const [ time, setTime ] = useState({ hour: "00", min: "00" });
  const locationInput = useInput("");

  useEffect(() => {
    initTime();
  }, []);

  const initTime = () => {
    var h = new Date().getHours();
    var m = new Date().getMinutes()+20-((new Date().getMinutes()+10)%10); // 20분을 더하고 10의 배수로 전환

    if(m < 60) { // 분이 60분 미만
      if(h < 10)
        h = "0"+h;
    }
    else { // 시간 +1
      if(h === 23)
        h = "00";
      else if(h+1 < 10)
        h = "0"+(h+1);
      else
        h = h+1;
      
      if(m-60 < 10)
        m = "0"+(m-60);
      else
        m = m-60;
    }
    setTime({ hour: h+"", min: m+"" });
  };

  const handlePressBack = () => {
    props.navigation.goBack();
    return true;
  };
  const handlePressConfirm = () => {
    if(locationInput.value === "")
      Alert.alert("추가 주소지를 입력해주세요");
    else if((new Date().getHours() < time.hour*1 && new Date().getMinutes() < time.min*1)
         || (new Date().getHours() == time.hour*1 && new Date().getMinutes()+10 > time.min*1)) {
      Alert.alert("현재 시간으로부터 10분 이상/1시간 이내의 시간으로 주문 예약할 수 있습니다");
      initTime();
    }
    else {
      var now = new Date();
      if(now.getHours() !== 0 && time.hour === "00") // 주문 시간이 다음 날 일 때
        now = new Date(now.getDate() + 24*60*60*1000); // 다음 날의 날짜
      props.navigation.navigate("OrderNavigation", {
        storeName: props.navigation.state.params.store,
        time: now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+"T"+time.hour+":"+time.min,
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
          <View style={styles.picker}>
            <Picker
              selectedValue={location}
              style={{ width: 30, height: 30 }}
              onValueChange={handleChangeLocation}>
              <Picker.Item label="금오공과대학교 기숙사" value="금오공과대학교 기숙사"/>
              <Picker.Item label="금오공과대학교 테크노관" value="금오공과대학교 테크노관"/>
              <Picker.Item label="금오공과대학교 디지털관" value="금오공과대학교 디지털관"/>
              <Picker.Item label="금오공과대학교 글로벌관" value="금오공과대학교 글로벌관"/>
              <Picker.Item label="금오공과대학교 학생회관" value="금오공과대학교 학생회관"/>
            </Picker>
          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ color: '#666', fontSize: 16 }}
            {...locationInput}
            placeholder="추가 주소지(예: 대나무숲, 오름 2동)"
            placeholderTextColor="#CCC"/>
        </View>
        <Text style={styles.description}>예상 주문 시간을 선택해 주세요</Text>
        <View style={styles.time}>
          <Text>{time.hour}</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={time.hour}
              style={{ width: 30, height: 30 }}
              itemStyle={{ paddingHorizontal: 100 }}
              onValueChange={handleChangeHours}>
              <Picker.Item label={time.hour} value={time.hour}/>
              {time.hour*1 < 9 ?
                <Picker.Item label={"0"+(time.hour*1+1)} value={"0"+(time.hour*1+1)}/>
                :
                time.hour*1 === 23 ?
                  <Picker.Item label={"00"} value={"00"}/>
                  :
                  <Picker.Item label={""+(time.hour*1+1)} value={""+(time.hour*1+1)}/>
              }
            </Picker>
          </View>
          <Text style={{ fontSize: 18, marginRight: 20 }}>시</Text>
          <Text>{time.min}</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={time.min}
              style={{ width: 30, height: 30 }}
              itemStyle={{ paddingHorizontal: 15 }}
              onValueChange={handleChangeMins}>
              <Picker.item label={"00"} value={"00"}/>
              <Picker.item label={"10"} value={"10"}/>
              <Picker.item label={"20"} value={"20"}/>
              <Picker.item label={"30"} value={"30"}/>
              <Picker.item label={"40"} value={"40"}/>
              <Picker.item label={"50"} value={"50"}/>
            </Picker>
          </View>
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
  },
  picker: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    marginLeft: 8
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