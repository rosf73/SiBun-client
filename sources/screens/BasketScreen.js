import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useMutation } from 'react-apollo-hooks';

import withSuspense from '../withSuspense';
import Item from '../components/Item';
import { CREATE_CHAT_ROOM } from '../queries/ChatQuery';
import { ENTER_CHAT_ROOM } from '../queries/UserQuery';

function BasketScreen(props) {
  const createChatRoomMutation = useMutation(CREATE_CHAT_ROOM)[0];
  const enterChatRoomMutation = useMutation(ENTER_CHAT_ROOM)[0];

  const handlePressBack = () => {
    props.navigation.goBack();
  }
  const handlePressParty = async () => {
    if(props.navigation.state.params.boss) { // 방을 만들 때
      try {
        setLoading(true);
        const { data: { createChatRoom: { id } } } = await createChatRoomMutation({
          variables: {
            storeName: props.navigation.state.params.storeName,
            time: props.navigation.state.params.time,
            location: props.navigation.state.params.location
          }
        });
        setLoading(false);

        props.navigation.navigate("ChatRoom", { roomId: id });
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
        const { data: { enterChatRoom: { id } } } = await enterChatRoomMutation({
          variables: {
            chatId: props.navigation.state.params.roomId
          }
        });
        setLoading(false);
        
        props.navigation.navigate("ChatRoom", { roomId: id });
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
      
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
        <Text style={styles.store}>{props.navigation.state.params.storeName}</Text>
      </View>

      <View style={styles.property}>
        <Text style={{ flex: 1 }}>이름</Text>
        <Text style={{ padding: 10 }}>수량</Text>
        <Text style={{ padding: 10 }}>가격</Text>
      </View>
      <ScrollView>
        {props.navigation.state.params.basket.map((item, index) => (
          <Item key={index} name={item.name} quantity={item.quantity} price={item.price}/>
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
    justifyContent: 'space-around',
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