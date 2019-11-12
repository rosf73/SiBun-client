import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function InputOrderInfoScreen(props) {
  const [ location, setLocation ] = useState("");
  const [ time, setTime ] = useState({ hour: 0, min: 0 });
  var minList = [];
  for(var i=0; i<60; i++) {
    if(i < 10)
      minList.push("0"+i);
    else
      minList.push(String(i));
  }
  // const createChatRoomMutation = useMutation(CREATE_CHAT_ROOM, {
  //   variables: {
  //     storeName: props.navigation.state.params.store,
  //     location,
  //     time
  //   }
  // })[0];

  useEffect(() => {
    initTime();
  }, []);

  const initTime = () => {
    if(new Date().getMinutes() < 50)
      setTime({
        hour: new Date().getHours(),
        min: (new Date().getMinutes()+10)
      });
    else
      setTime({
        hour: (new Date().getHours()+1)%24,
        min: "0"+(new Date().getMinutes()-50)
      });
  }
  const handlePressBack = () => {
    props.navigation.goBack();
    return true;
  };
  const handlePressConfirm = async () => {
    if(location === "")
      Alert.alert("주소지를 선택해주세요");
    else if((new Date().getHours() < time.hour && new Date().getMinutes() < time.min)
         || (new Date().getHours() == time.hour && new Date().getMinutes()+10 > time.min)) {
      Alert.alert("현재 시간으로부터 10분 이상/1시간 이내의 시간으로 주문 예약할 수 있습니다");
      initTime();
    }
    else {
      // setLoading(true);
      // const { data: { createChatRoom: { id } } } = await createChatRoomMutation();
      // setLoading(false);
      var id = 0;

      props.navigation.navigate("OrderNavigation", {
        storeName: props.navigation.state.params.store,
        time: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"T"+time.hour+":"+time.min,
        location,
        roomId: id
      });
    }
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
        <GooglePlacesAutocomplete
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