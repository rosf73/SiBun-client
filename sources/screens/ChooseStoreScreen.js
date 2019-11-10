import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

import withSuspense from '../withSuspense';
import Category from '../components/Category';

function ChooseStoreScreen(props) {
  const storeList = [
    {
      store: "BHC 옥계점",
      uri: "https://previews.123rf.com/images/airdone/airdone1608/airdone160800034/60658875-%EC%BB%AC%EB%9F%AC-%EB%82%99%EC%84%9C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%B9%98%ED%82%A8-%EB%B6%81%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg"
    },
    {
      store: "왕초",
      uri: "https://previews.123rf.com/images/airdone/airdone1608/airdone160800034/60658875-%EC%BB%AC%EB%9F%AC-%EB%82%99%EC%84%9C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%B9%98%ED%82%A8-%EB%B6%81%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg"
    },
    {
      store: "깻잎 두마리치킨",
      uri: "https://previews.123rf.com/images/airdone/airdone1608/airdone160800034/60658875-%EC%BB%AC%EB%9F%AC-%EB%82%99%EC%84%9C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%B9%98%ED%82%A8-%EB%B6%81%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg"
    },
  ];

  const handlePressBack = () => {
    props.navigation.goBack();
    return true;
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.store}>매장을 선택해주세요</Text>
      
      <View style={styles.client}>
        {props.navigation.state.params.category !== "치킨" ?
        <Text>주변에 이용할 수 있는 매장이 없습니다</Text>
        :
        storeList.map(item => {
          const handlePress = () => { props.navigation.navigate("InputOrderInfo", { store: item.store }); }

          return <Category category={item.store} uri={item.uri} onPress={handlePress}/>;
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    width: '100%',
    justifyContent: 'center'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  store: {
    fontSize: 20,
    padding: 20
  },
  client: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

// export default withSuspense(withNavigation(ChooseStoreScreen));
export default withNavigation(ChooseStoreScreen);