import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      password: '',
      isLoaded: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.logo} source={require("../resources/images/logo.png")}/>

        <Text style={styles.text}>학번과 원스톱 비밀번호를 입력해 주세요!</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={()=>{}}
          value={this.state.number}
          placeholder="학번"
          placeholderTextColor="#FFFFFF"/>
        <TextInput
          style={styles.textInput}
          onChangeText={()=>{}}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="비밀번호"
          placeholderTextColor="#FFFFFF"/>

        <TouchableOpacity
          style={styles.button}
          onPress={this.props.func}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  logo: {
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 30
  },
  text: {
    color: '#666',
    marginBottom: 30
  },
  textInput: {
    textAlign: 'center',
    fontSize: 14,
    width: '70%',
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
    marginBottom: 10
  },
  button: {
    width: '70%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E2937B',
    marginTop: 20,
    marginBottom: 150
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF'
  }
});

export default LoginScreen;