import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';

//import CustomIndicator from '../components/CustomIndicator';
import { SIGN_IN } from '../queries/UserQuery';
import useInput, { useNumInput } from '../hooks/useInput';

export default ({ func }) => {
  const numberInput = useNumInput("");
  const pwdInput = useInput("");
  const onSignIn = useMutation(SIGN_IN, {
    variables: {
      number: numberInput.value,
      pwd: pwdInput.value
    }
  })[0];

  onPressLoginButton = async () => {
    try {
      const { data: { signIn } } = await onSignIn();
      if(signIn) {
        func();
      }
      else {
        Alert.alert("존재하지 않는 아이디입니다");
      }
    }
    catch(e) {
      console.log(e);
      Alert.alert("로그인에 실패하였습니다");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/images/logo.png")}/>

      <Text style={styles.text}>학번과 원스톱 비밀번호를 입력해 주세요!</Text>

      <TextInput
        {...numberInput}
        style={styles.textInput}
        placeholder="학번"
        placeholderTextColor="#FFFFFF"/>
      <TextInput
        {...pwdInput}
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="비밀번호"
        placeholderTextColor="#FFFFFF"/>

      <TouchableOpacity
        style={styles.button}
        onPress={this.onPressLoginButton}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
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