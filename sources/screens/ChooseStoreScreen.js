import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

import withSuspense from '../withSuspense';
import Category from '../components/Category';
import { GET_STORE_LIST } from '../queries/OrderQuery';

function ChooseStoreScreen(props) {
  const { data: { getStoreList } } = useQuery(GET_STORE_LIST, {
    suspend: true,
    variables: {
      storeCategoryName: props.navigation.state.params.category
    }
  });

  const handlePressBack = () => {
    props.navigation.goBack();
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
        {getStoreList.length === 0 ?
        <Text>주변에 이용할 수 있는 매장이 없습니다</Text>
        :
        getStoreList.map(item => {
          const handlePress = () => { props.navigation.navigate("InputOrderInfo", { store: item.name }); }

          return <Category key={item.id} category={item.name} uri={item.image} onPress={handlePress}/>;
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

export default withSuspense(withNavigation(ChooseStoreScreen));