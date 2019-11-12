import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

import CustomIndicator from '../components/CustomIndicator';
import Order from '../components/Order';
import Chat from '../components/Chat';
import MyChat from '../components/MyChat';
import withSuspense from '../withSuspense';
import { CHAT_CONTENT_LIST, SEND_CHAT, NEW_CHAT, GET_ROOM_ORDER } from '../queries/ChatQuery';
import { CHECK_ME, EXIT_CHAT_ROOM } from '../queries/UserQuery';


function ChatRoomScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const [ folding, setFolding ] = useState(false);
  const [ content, setContent ] = useState("");
  const { data: { chatContents: prevChatContents } } = useQuery(CHAT_CONTENT_LIST, {
    suspend: true,
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  });
  const [ chatContentList, setChatContentList ] = useState(prevChatContents || []);
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
  })
  const [ orderList, setOrderList ] = useState([]);
  const exitChatRoomMutation = useMutation(EXIT_CHAT_ROOM, {
    variables: {
      chatId: props.navigation.state.params.roomId
    }
  })[0];

  const handleNewChats = () => {
    console.log(props);
    if(data !== undefined) {
      const { newChat } = data;
      setChatContentList(previous => [...previous, newChat]);
    }
    return () => {
      //this.flatListRef.scrollToEnd({ animated: true });
    }
  }

  useEffect(() => {
    handleNewChats();
    setTimeout(() => { /*this.flatListRef.scrollToEnd({ animated: true })*/ }, 100);
  }, [data])
  
  const handlePressExit = () => {
    Alert.alert('', '정말로 이 채팅방을 나가시겠습니까?', [
      {
        text: '확인', onPress: async () => {
          setLoading(true);
          await exitChatRoomMutation();
          setLoading(false);

          props.navigation.navigate("Main");
        }
      },
      {
        text: '취소', onPress: () => { }
      }
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
            <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>
        <Text style={styles.store}>BHC 옥계행복점</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handlePressEdit}>
          <Entypo name="menu" size={30} color="#AAA"/>
        </TouchableOpacity>
      </View>

      <View style={styles.order}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>주문 현황</Text>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={handlePressFolder}>
            <FontAwesome name="angle-double-up" size={30} color="#AAA"/>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.orderList}>
          {getRoomOrder.map(order => (
            <Order key={order.id} user={order.individualOrderList.user} menus={order.individualOrderList.menuList}/>
          ))}
        </ScrollView>
        <View style={styles.orderPrice}>
          <Text style={styles.orderPriceText}>총 주문액</Text>
        </View>
        <View style={styles.orderFooter}>
          <TouchableOpacity
            style={styles.ordering}
            onPress={handlePressFolder}>
            <Text style={styles.buttonText}>주문하기</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  order: {
    height: 250,
    backgroundColor: '#FFF',
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
    justifyContent: 'flex-end'
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