import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import Category from '../components/Category';

function ChooseCategoryScreen(props) {
  const categoryList1 = [
    {
      id: 0,
      category: "치킨",
      uri: "https://previews.123rf.com/images/airdone/airdone1608/airdone160800034/60658875-%EC%BB%AC%EB%9F%AC-%EB%82%99%EC%84%9C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%B9%98%ED%82%A8-%EB%B6%81%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg"
    },
    {
      id: 1,
      category: "중식",
      uri: "https://media.istockphoto.com/vectors/dim-sum-chinese-food-with-chopstick-vector-illustration-vector-id960662096"
    },
    {
      id: 2,
      category: "패스트푸드",
      uri: "https://data.ac-illust.com/data/thumbnails/ac/ace5f3affd8956d7dcec08e3ec28208c_t.jpeg"
    },
  ];
  
  const categoryList2 = [
    {
      id: 0,
      category: "돈까스",
      uri: "https://en.pimg.jp/032/875/502/1/32875502.jpg"
    },
    {
      id: 1,
      category: "일식",
      uri: "https://en.pimg.jp/030/854/595/1/30854595.jpg"
    },
    {
      id: 2,
      category: "족발",
      uri: "https://t4.ftcdn.net/jpg/01/04/89/63/240_F_104896383_HO0RkTAVtLJxWmvcrp06AzDe5OtmQHgX.jpg"
    },
  ];

  const handlePressBack = () => {
    props.navigation.goBack(null);
    return true;
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.store}>어떤 종류를 원하세요?</Text>
      
      <View style={styles.client}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {categoryList1.map(item => {
            const handlePress = () => { props.navigation.navigate("ChooseStore", { category: item.category }); }

            return <Category key={item.id} category={item.category} uri={item.uri} onPress={handlePress}/>;
          })}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {categoryList2.map(item => {
            const handlePress = () => { props.navigation.navigate("ChooseStore", { category: item.category }); }

            return <Category key={item.id} category={item.category} uri={item.uri} onPress={handlePress}/>;
          })}
        </View>
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
    justifyContent: 'center'
  }
});

export default withNavigation(ChooseCategoryScreen);