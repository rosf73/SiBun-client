import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

class ChatRoomScreen extends Component {
  handlePressExit = () => {
    this.props.navigation.navigate("Main");
  }

  render() {
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
            style={styles.edit}
            onPress={this.handlePressExit}>
            <Entypo name="menu" size={30} color="#AAA"/>
          </TouchableOpacity>
        </View>

        <View style={styles.order}>

        </View>

        <View style={styles.chat}>

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
    backgroundColor: '#FFF',
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
  edit: {
    marginRight: 10
  },
  order: {
    height: 200,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  chat: {
    flex: 1
  }
});

export default ChatRoomScreen;