import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { withNavigation } from 'react-navigation';

import { CHAT_INFO } from "../queries/ChatQuery";
import withSuspense from "../withSuspense";

function OpenChatInfoScreen(props) {
  const { data: { getChatRoom }, refetch } = useQuery(CHAT_INFO, {
    suspend: true,
    variables: {
      roomId: props.navigation.state.params.roomId
    }
  });

  useEffect(() => {
    const focusSubscription = props.navigation.addListener(
      'didFocus',
      () => {
        refetch({ variables: { roomId: props.navigation.state.params.roomId } });
      }
    );
    return () => focusSubscription.remove();
  })

  const handlePressBack = () => {
    props.navigation.popToTop();
  };
  const handlePressParty = () => {
    props.navigation.navigate("OrderNavigation", {
      storeName: getChatRoom.store.name,
      roomId: props.navigation.state.params.roomId,
      boss: false
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
      </View>

      <View style={styles.body}>
        <Image style={styles.logo} source={{ uri: getChatRoom.store.image }}/>
        <Text style={styles.text}>가맹점 : {getChatRoom.store.name}</Text>
        <Text style={styles.text}>인원 : {getChatRoom.memberList.length}</Text>
        <Text style={styles.text}>주소 : {getChatRoom.location}</Text>
        <Text style={styles.text}>주문 예정 시간 : {getChatRoom.orderExpectedTime.substring(11,19)}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.party}
        onPress={handlePressParty}>
        <Text style={{ color: '#FFF', fontSize: 20 }}>참여하기</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#FFF"
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
  body: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
    marginBottom: 30
  },
  text: {
    color: "#666",
    marginBottom: 30,
    width: "50%",
    flexDirection: "column"
  },
  party: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2937B'
  }
});


export default withSuspense(withNavigation(OpenChatInfoScreen));
