import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useMutation } from 'react-apollo-hooks';

import CustomIndicator from '../components/CustomIndicator';
import withSuspense from '../withSuspense';
import Item from '../components/Item';
import { CREATE_CHAT_ROOM, SEND_CHAT } from '../queries/ChatQuery';
import { ENTER_CHAT_ROOM } from '../queries/UserQuery';
import { ADD_ORDER } from '../queries/OrderQuery';

function BasketScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const createChatRoomMutation = useMutation(CREATE_CHAT_ROOM)[0];
  const enterChatRoomMutation = useMutation(ENTER_CHAT_ROOM)[0];
  const addOrderMutation = useMutation(ADD_ORDER)[0];
  const { basket } = props.navigation.state.params;
  const sendChatMutation = useMutation(SEND_CHAT)[0];

  const handlePressBack = () => {
    props.navigation.goBack();
  }
  const handlePressParty = async () => {
    if(props.navigation.state.params.boss) { // 방을 만들 때
      // 주문 시간이 얼마나 남았는지 검사
      const newDate = new Date();
      var now = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+"T";
      if(newDate.getHours()<10)
        now += "0"+newDate.getHours()+":"+newDate.getMinutes()+":00";
      else
        now += newDate.getHours()+":"+newDate.getMinutes()+":00";
      if(Math.floor((new Date(props.navigation.state.params.time)-new Date(now))/1000/60) < 5) {
        Alert.alert('', '방 만들기가 너무 지체되었습니다. 메인 화면으로 돌아갑니다', [{
          text: '확인', onPress: () => props.navigation.popToTop()
        }]);
      }
      
      try {
        setLoading(true);
        const { data: { createChatRoom: { id } } } = await createChatRoomMutation({ // 방 생성
          variables: {
            storeName: props.navigation.state.params.storeName,
            time: props.navigation.state.params.time,
            location: props.navigation.state.params.location,
            additionalLocation: props.navigation.state.params.addLocation
          }
        });
        const menuList = basket.map(item => { return { id: item.id, quantity: item.quantity } });
        await addOrderMutation({ // 내 주문 생성
          variables: {
            roomId: id,
            menuList
          }
        });
        setLoading(false);

        props.navigation.navigate("ChatRoom", {
          roomId: id, 
          storeName: props.navigation.state.params.storeName,
          boss: props.navigation.state.params.boss
        });
      }
      catch(e) {
        Alert.alert("방 만들기에 실패했습니다");
      }
      finally {
        setLoading(false);
      }
    }
    else { // 방에 참여할 때
      try {
        setLoading(true);
        const { data: { enterChatRoom: { id } } } = await enterChatRoomMutation({ // 방 입장
          variables: {
            chatId: props.navigation.state.params.roomId
          }
        });
        const menuList = basket.map(item => { return { id: item.id, quantity: item.quantity }  });
        await addOrderMutation({ // 내 주문 생성
          variables: {
            roomId: id,
            menuList
          }
        });
        await sendChatMutation({
          variables: {
            roomId: id,
            content: "반가워요! 방금 들어왔습니다 :)"
          }
        });
        setLoading(false);
        
        props.navigation.navigate("ChatRoom", {
          roomId: id, 
          storeName: props.navigation.state.params.storeName,
          boss: props.navigation.state.params.boss
        });
      }
      catch(e) {
        Alert.alert("방에 참여할 수 없습니다");
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CustomIndicator isLoading={loading}/>
      
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
        <Text style={styles.store}>{props.navigation.state.params.storeName}</Text>
      </View>

      <View style={styles.property}>
        <Text style={{ flex: 1, textAlign: 'center' }}>이름</Text>
        <Text style={{ padding: 10 }}>수량</Text>
        <Text style={{ padding: 10 }}>가격</Text>
      </View>
      <ScrollView>
        {props.navigation.state.params.basket.map((item, index) => (
          <Item key={index} name={item.name} quantity={item.quantity} price={item.totalPrice}/>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.comfirm}
        onPress={handlePressParty}>
        {props.navigation.state.params.boss ?
          <Text style={{ color: '#FFF', fontSize: 20 }}>방만들기</Text>
          :
          <Text style={{ color: '#FFF', fontSize: 20 }}>입장하기</Text>
        }
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  store: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  property: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  comfirm: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2937B'
  }
});

export default withSuspense(withNavigation(BasketScreen));