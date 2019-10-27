import React, { Component, Suspense } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Order from '../components/Order';
import Chat from '../components/Chat';
import withSuspense from '../withSuspense';

const CHAT = gql`
  query messages {
    contentList {
      id
      content
    }
  }
`;

class ChatRoomScreen extends Component {
  handlePressExit = () => {
    this.props.navigation.navigate("Main");
  }
  handlePressEdit = () => {
    alert('edit!');
  }
  handlePressFolder = () => {
    alert('folder!');
  }

  renderOrderList(orderList) {

  }

  render() {
    const contentList = [];
    //const { data, error } = useQuery(CHAT, { suspend: true });
    const orderList = [];//this.renderOrderList();

    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.exit}
            onPress={this.handlePressExit}>
              <Text style={styles.exitText}>나가기</Text>
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
        </View>

        <ScrollView contentContainerStyle={styles.chat}>
          {contentList.map(chat => (
            <Chat key={chat.id} content={chat.content}/>
          ))}
        </ScrollView>

        <View style={styles.input}>

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
  exitText: {
    fontSize: 16,
    color: '#FFF'
  },
  store: {
    color: '#666'
  },
  order: {
    height: 200,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  orderList: {

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
  chat: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  input: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  }
});

export default withSuspense(ChatRoomScreen);