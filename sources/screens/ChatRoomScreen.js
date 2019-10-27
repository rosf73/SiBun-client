import React, { Component, Suspense } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

import Order from '../components/Order';
import Chat from '../components/Chat';
import withSuspense from '../withSuspense';
import useInput from '../hooks/useInput';

const CHAT = gql`
  query chatContent {
    contentList {
      id
      user {
        id
      }
      chatRoom {
        id
      }
      content
    }
  }
`;

class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: "",
      isLoaded: false
    };
  }

  handlePressExit = () => {
    this.props.navigation.navigate("Main");
  }
  handlePressEdit = () => {
    alert('edit!');
  }
  handlePressFolder = () => {
    alert('folder!');
  }
  handlePressSend = () => {
    alert('send!');
  }

  renderOrderList(orderList) {

  }

  render() {
    const contentList = [
      { id: "1", user: { id: "밥풀이1" }, chatRoom: { id: "1" }, content: "안녕하세요" },
      { id: "2", user: { id: "밥풀이2" }, chatRoom: { id: "1" }, content: "배고파요 ㅠㅠ" },
    ];
    //const { data, error } = useQuery(CHAT, { suspend: true });
    const orderList = [];//this.renderOrderList();

    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.exit}
            onPress={this.handlePressExit}>
              <Text style={styles.buttonText}>나가기</Text>
          </TouchableOpacity>
          <Text style={styles.store}>BHC 옥계행복점</Text>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={this.handlePressEdit}>
            <Entypo name="menu" size={30} color="#AAA"/>
          </TouchableOpacity>
        </View>

        <View style={styles.order}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>주문 현황</Text>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={this.handlePressFolder}>
              <FontAwesome name="angle-double-up" size={30} color="#AAA"/>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.orderList}>
            {orderList.map(order => (
              <Order key={order.id} user={order.user} menus={order.menuList}/>
            ))}
          </ScrollView>
          <View style={styles.orderPrice}>
            <Text>총 주문액</Text>
          </View>
          <View style={styles.orderFooter}>
            <TouchableOpacity
              style={styles.ordering}
              onPress={this.handlePressFolder}>
              <Text style={styles.buttonText}>주문하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.chat}>
          {contentList.map(chat => (
            <Chat key={chat.id} user={chat.user.id} chatRoom={chat.chatRoom.id} content={chat.content}/>
          ))}
        </ScrollView>

        <View style={styles.input}>
          <TextInput
            value={this.state.chat}
            onChangeText={(chat) => {this.setState({ chat })}}
            style={styles.textInput}/>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={this.handlePressEdit}>
            <SimpleLineIcon name="paper-plane" size={30} color="#666"/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
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

export default withSuspense(ChatRoomScreen);