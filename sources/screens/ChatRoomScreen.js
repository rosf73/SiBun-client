import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, BackHandler } from 'react-native';
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

import CustomIndicator from '../components/CustomIndicator';
import Order from '../components/Order';
import Chat from '../components/Chat';
import MyChat from '../components/MyChat';
import withSuspense from '../withSuspense';
import { CHAT_CONTENT_LIST, SEND_CHAT, NEW_CHAT, GET_ROOM_ORDER, REMOVE_CHAT_ROOM } from '../queries/ChatQuery';
import { CHECK_ME, EXIT_CHAT_ROOM } from '../queries/UserQuery';


function ChatRoomScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const [ folding, setFolding ] = useState(false);
  const [ content, setContent ] = useState("");
  const { data: { chatContents } } = useQuery(CHAT_CONTENT_LIST, {
    suspend: true,
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  });
  const [ chatContentList, setChatContentList ] = useState(chatContents || []);
  const sendChatMutation = useMutation(SEND_CHAT, {
    variables: {
      roomId: props.navigation.state.params.roomId, //props.roomId
      content
    }
  })[0];
  const { data } = useSubscription(NEW_CHAT, {
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  });
  const { data: { checkMe } } = useQuery(CHECK_ME, { suspend: true });
  const { data: { getRoomOrder } } = useQuery(GET_ROOM_ORDER, {
    suspend: true,
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  });
  var sum = 0;
  for(var i=0; i<getRoomOrder.individualOrderList.length; i++)
    for(var j=0; j<getRoomOrder.individualOrderList[i].menuList.length; j++)
      sum += getRoomOrder.individualOrderList[i].menuList[j].price;
  const removeChatRoomMutation = useMutation(REMOVE_CHAT_ROOM, {
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  })[0];
  const exitChatRoomMutation = useMutation(EXIT_CHAT_ROOM, {
    variables: {
      chatId: props.navigation.state.params.roomId
    }
  })[0];

  const handleNewChats = () => {
    if(data !== undefined) {
      const { newChat } = data;
      setChatContentList(previous => [...previous, newChat]);
    }
    return () => {
      //this.flatListRef.scrollToEnd({ animated: true });
    }
  }
  
  const handlePressBack = () => {
    props.navigation.popToTop();
    return true;
  }

  useEffect(() => {
    handleNewChats();
    setTimeout(() => { /*this.flatListRef.scrollToEnd({ animated: true })*/ }, 100);

    BackHandler.addEventListener("hardwareBackPress", handlePressBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handlePressBack)
    }
  }, [data]);

  const handlePressExit = () => {
    if(props.navigation.state.params.boss)
      Alert.alert('', '정말로 이 채팅방을 삭제하시겠습니까?', [
        {
          text: '확인', onPress: async () => {
            try {
              setLoading(true);
              await removeChatRoomMutation();
              setLoading(false);
  
              props.navigation.navigate("Main");
            }
            catch(e) { Alert.alert("방을 삭제할 수 없습니다"); }
            finally { setLoading(false); }
          }
        },
        { text: '취소', onPress: () => { } }
      ]);
    else
      Alert.alert('', '정말로 이 채팅방을 나가시겠습니까?', [
        {
          text: '확인', onPress: async () => {
            try {
              setLoading(true);
              await exitChatRoomMutation();
              setLoading(false);

              props.navigation.navigate("Main");
            }
            catch(e) { Alert.alert("퇴장할 수 없습니다"); }
            finally { setLoading(false); }
          }
        },
        { text: '취소', onPress: () => { } }
      ]);
  }
  const handlePressEdit = () => {
    alert('edit!');
  }
  const handlePressFolder = () => {
    if(folding)
      setFolding(false);
    else
      setFolding(true);
  }
  const handlePressOrder = () => {
    props.navigation.navigate("Order");
  }
  const handlePressSend = async () => {
    try {
      if(content === "") {
        Alert.alert("채팅을 입력해주세요")
      }
      else {
        setLoading(true);
        await sendChatMutation();
        setContent("");
        setLoading(false);
      }
    }
    catch(e) {
      console.log(e);
      Alert.alert("hell");
    }
  }

  return (
    <View style={styles.container}>
      <CustomIndicator isLoading={loading}/>
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.exit}
          onPress={handlePressExit}>
          {props.navigation.state.params.boss ?
            <Text style={styles.buttonText}>방삭제</Text>
            :
            <Text style={styles.buttonText}>나가기</Text>
          }
        </TouchableOpacity>
        <Text style={styles.store}>{props.navigation.state.params.storeName}</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handlePressEdit}>
          <Entypo name="menu" size={30} color="#AAA"/>
        </TouchableOpacity>
      </View>

      {folding ?
        <View style={styles.foldOrder}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>주문 현황</Text>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={handlePressFolder}>
              <FontAwesome name="angle-double-down" size={30} color="#AAA"/>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.order}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>주문 현황</Text>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={handlePressFolder}>
              <FontAwesome name="angle-double-up" size={30} color="#AAA"/>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.orderList}>
              {getRoomOrder.individualOrderList.map(order => (
                <Order key={order.id} user={order.user.number} menus={order.menuList}/>
              ))}
            </ScrollView>
            <View style={styles.orderPrice}>
              <Text style={styles.orderPriceText}>총 주문액</Text>
              <Text style={{ fontSize: 18 }}>{sum}</Text>
            </View>
            {props.navigation.state.params.boss ?
              <View style={styles.orderFooter}>
                <TouchableOpacity
                  style={styles.ordering}
                  onPress={handlePressOrder}>
                  <Text style={styles.buttonText}>주문하기</Text>
                </TouchableOpacity>
              </View>
              :
              null
            }
          </View>
        </View>
      }

      <View style={styles.chat}>
        <ScrollView>
          {chatContentList.map(chat => 
            checkMe.id === chat.user.id ? 
            <MyChat user={chat.user.number} chatRoom={chat.chatRoom.id} content={chat.content}/>
            :
            <Chat user={chat.user.number} chatRoom={chat.chatRoom.id} content={chat.content}/>
          )}
        </ScrollView>
      </View>

      <View style={styles.input}>
        <TextInput
          value={content}
          onChangeText={(content) => setContent(content)}
          style={styles.textInput}/>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={handlePressSend}>
          <SimpleLineIcon name="paper-plane" size={30} color="#666"/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  exit: {
    backgroundColor: '#88F',
    borderRadius: 10,
    padding: 10,
    marginLeft: 5
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF'
  },
  store: {
    color: '#666'
  },
  foldOrder: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  order: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  orderList: {
    flex: 1
  },
  orderHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderTitle: {
    fontSize: 18,
    color: '#666',
    marginLeft: 15
  },
  orderPrice: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  orderPriceText: {
    marginRight: 20
  },
  orderFooter: {
    height: 55,
    alignItems: 'flex-end'
  },
  ordering: {
    backgroundColor: '#88F',
    borderRadius: 10,
    padding: 10,
    marginRight: 15
  },
  chat: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  input: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#EEE',
    marginLeft: 10
  }
});

export default withSuspense(withNavigation(ChatRoomScreen));