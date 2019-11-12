import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import axios from 'axios';

import CustomIndicator from '../components/CustomIndicator';
import { SIGN_IN } from '../queries/UserQuery';
import { useInput, useNumInput } from '../hooks/useInput';

function LoginScreen({ func }) {
  const [ loading, setLoading ] = useState(false);
  const numberInput = useNumInput("");
  const pwdInput = useInput("");
  const signInMutation = useMutation(SIGN_IN, {
    variables: {
      number: numberInput.value
    }
  })[0];

  const onPressLoginButton = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('member_id', numberInput.value); // id
      formData.append('member_pw', pwdInput.value); // password
      formData.append('referer', 'http://www.kumoh.ac.kr'); // 로그인성공 후 화면 전환

      axios.post('https://www.kumoh.ac.kr:443/cms/login/idLogin.do', formData).
      then(async (Response) => {
        // json 파싱
        var arrayA = Response.headers;
        var parse = JSON.stringify(arrayA);
        var parseSet = JSON.parse(parse);
        
        if(parseSet["set-cookie"][0].length > 17) {
          const { data: { signIn } } = await signInMutation();
          if(signIn) {
            func(signIn);
          }
        }
        else {
          Alert.alert("존재하지 않는 아이디이거나 비밀번호 오류입니다");
        }

        setLoading(false);
      }).catch(function (error) {
        console.log(error);
        Alert.alert("원스톱에서 로그인 정보 가져오기에 실패하였습니다");
      })
      .finally(function () {
        setLoading(false);
      });
    }
    catch(e) {
      console.log(e);
      Alert.alert("로그인에 실패하였습니다");
    }
  }

  return (
    <View style={styles.container}>
      <CustomIndicator isLoading={loading}/>

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
        onPress={onPressLoginButton}>
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

export default LoginScreen;