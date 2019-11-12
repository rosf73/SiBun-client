import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery } from 'react-apollo-hooks';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import withSuspense from '../withSuspense';
import { GET_MENU_LIST } from '../queries/OrderQuery';
import Menu from '../components/Menu';

function MenuScreen(props) {
  var basket = [];
  const { data: { getStoreMenu }} = useQuery(GET_MENU_LIST, {
    suspend: true,
    variables: {
      storeName: props.navigation.state.params.storeName
    }
  });
  
  const handlePressBack = () => {
    Alert.alert('', '방 만들기를 취소할까요?', [
      {
        text: '확인', onPress: async () => {
          props.navigation.popToTop();
        }
      },
      {
        text: '취소', onPress: () => { }
      }
    ]);
  }
  const handlePressBasket = () => {
    if(basket.length === 0)
      Alert.alert("메뉴를 담아주세요");
    else
      props.navigation.navigate("Basket", {
        storeName: props.navigation.state.params.storeName,
        roomId: props.navigation.state.params.roomId,
        time: props.navigation.state.params.time,
        location: props.navigation.state.params.location,
        basket
      });
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={handlePressBack}>
          <Image style={styles.icon} source={require("../../resources/images/back.png")}/>
        </TouchableOpacity>
        <Text style={styles.store}>{props.navigation.state.params.storeName}</Text>
      </View>

      <ScrollView>
        {getStoreMenu.map(item => {
          const menu = Object.assign(item, { quantity: 0 });
          basket.push(menu);
          const onPlus = () => {
            const list = basket.map(item => {
              if(item.name === menu.name) return { ...item, quantity: item.quantity+1 };
              else return { ...item };
            });
            basket = list;
          };
          const onMinus = () => {
            const list = basket.map(item => {
              if(item.name === menu.name) return { ...item, quantity: item.quantity-1 };
              else return { ...item };
            });
            basket = list;
          };

          return <Menu key={menu.id} name={menu.name} price={menu.price} onPlus={onPlus} onMinus={onMinus}/>;
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.basket}
        onPress={handlePressBasket}>
        <FontAwesome5 name="shopping-basket" size={30} color="#FFF"/>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  store: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  basket: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#E2937B'
  }
});

export default withSuspense(withNavigation(MenuScreen));