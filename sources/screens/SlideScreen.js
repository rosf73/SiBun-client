import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { CHAT_INFO } from "../queries/ChatQuery";
import withSuspense from "../withSuspense";

function SlideScreen(props) {
  const { data: { getChatRoom } } = useQuery(CHAT_INFO, {
    suspend: true,
    variables: {
      roomId: "ck37cx6k293nl0b00dhko3y5f"
    }
  })

  const handlePressPrev = () => {
    props.navigation.navigate("DetailView");
  };

  const handlePressChange = () => {
    props.navigation.navigate("ChangeTime");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlePressPrev}>
          <Image
            style={styles.icon}
            source={require("../../resources/images/back.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.text}>주문정보</Text>
        </View>
        <View style={styles.roomData}>
          <Text style={styles.detailData}>가맹점명</Text>
          <Text style={styles.data}>•{getChatRoom.store.name}</Text>
          <Text style={styles.detailData}>배달받을 곳</Text>
          <Text style={styles.data}>•{getChatRoom.location}</Text>
          <Text style={styles.detailData}>예상주문시간</Text>
          <View style={styles.take}>
          <Text style={styles.data}>•{getChatRoom.orderExpectedTime.substring(11,16)}</Text>
          <TouchableOpacity onPress={handlePressChange}>
          <Image
            style={styles.icon2}
            source={require("../../resources/images/change.png")}
          />
          </TouchableOpacity>
        </View>
          </View>
          
      </View>
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
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 135
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 10
  },
  icon2: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  body: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  top: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingHorizontal: 10,
    padding: 10
  },
  roomData: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingHorizontal: 10,
    padding: 10,
    paddingTop: 10
  },
  text: {
    fontSize: 20,
    color: "#605F5F"
  },
  detailData: {
    fontSize: 15,
    color: "#aaa",
    paddingTop: 10
  },
  data: {
    paddingTop: 5
  },
  take: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default  withSuspense(withNavigation(SlideScreen));