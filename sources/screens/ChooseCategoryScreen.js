import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons'

import withSuspense from '../withSuspense';
import Category from '../components/Category';

function ChooseCategoryScreen(props) {
  const categoryList = [
    {
      category: "치킨",
      uri: "https://previews.123rf.com/images/airdone/airdone1608/airdone160800034/60658875-%EC%BB%AC%EB%9F%AC-%EB%82%99%EC%84%9C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%B9%98%ED%82%A8-%EB%B6%81%EC%9D%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg"
    },
    {
      category: "중식",
      uri: "https://media.istockphoto.com/vectors/dim-sum-chinese-food-with-chopstick-vector-illustration-vector-id960662096"
    },
    {
      category: "음료",
      uri: "https://previews.123rf.com/images/andegro4ka/andegro4ka1611/andegro4ka161100005/68691496-%ED%9D%B0%EC%83%89-%EC%82%AC%EC%8B%A4%EC%A0%81%EC%9D%B8-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4%EC%85%98%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EC%95%84%EC%9D%B4%EC%8A%A4-%EC%BB%A4%ED%94%BC.jpg"
    },
  ]

  const handlePressBack = () => {
    // props.navigation.goBack();
    props.navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Ionicon name="ios-arrow-back" size={30} color="#AAA"/>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.store}>어떤 종류를 원하세요?</Text>
      
      <View style={styles.client}>
        {categoryList.map(item => {
          const handlePress = () => { props.navigation.navigate("ChooseStore", { category: item.category }); }

          return <Category category={item.category} uri={item.uri} onPress={handlePress}/>;
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
    height: 25,
    width: 25,
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

// export default withSuspense(withNavigation(ChooseCategoryScreen));
export default withNavigation(ChooseCategoryScreen);