import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery } from 'react-apollo-hooks';

import withSuspense from '../withSuspense';
import { GET_MENU_LIST } from '../queries/OrderQuery';
import Menu from '../components/Menu';

function MenuScreen(props) {
  const { data: { getStoreMenu: menuList }} = useQuery(GET_MENU_LIST, { suspend: true });

  return (
    <View style={styles.container}>
      <ScrollView>
        {menuList.map(menu => (
          <Menu key={menu.id} name={menu.name} price={menu.price}/>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});

export default withNavigation(MenuScreen);