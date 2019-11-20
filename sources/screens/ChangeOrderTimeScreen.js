import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import { withNavigation } from "react-navigation";
import { CHAT_INFO } from "../queries/ChatQuery";
import { useQuery, useMutation } from "react-apollo-hooks";
import withSuspense from "../withSuspense";

function ChangeOrderTimeScreen(props) {
  const {
    data: { getChatRoom }
  } = useQuery(CHAT_INFO, {
    suspend: true,
    variables: {
      roomId: "ck37cx6k293nl0b00dhko3y5f"
    }
  });
  const handlePressCancel = () => {
    props.navigation.navigate("slide");
  };
  const handlePressCheck = () => {
    props.navigation.navigate();
  };
  const [time, setTime] = useState({ hour: 0, min: 0 });
  var minList = [];
  const handleChangeHours = (itemValue, itemPosition) => {
    setTime({ hour: itemValue, min: time.min });
  };
  const handleChangeMins = (itemValue, itemPosition) => {
    setTime({ hour: time.hour, min: itemValue });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={handlePressCancel}
        >
          <Image
            style={styles.icon}
            source={require("../../resources/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text}>예상 주문 시간 변경</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handlePressCheck}
        >
          <Text style={styles.text}>확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.time}>
          <Picker
            selectedValue={time.hour}
            style={{ width: 30, height: 30 }}
            onValueChange={handleChangeHours}
          >
            <Picker.Item
              label={getChatRoom.orderExpectedTime.substring(11, 13)}
              value={getChatRoom.orderExpectedTime.substring(11, 13)}
            />
            <Picker.Item
              label={
                Number(getChatRoom.orderExpectedTime.substring(11, 13)) + 1
              }
              value={
                Number(getChatRoom.orderExpectedTime.substring(11, 13)) + 1
              }
            />
          </Picker>
          <Text style={{ fontSize: 18, marginTop: "30%"}}>시</Text>
          <Picker
            selectedValue={time.min}
            style={{ width: 30, height: 30, marginBottom:-10}}
            onValueChange={handleChangeMins}
          >
            <Picker.Item
              label={getChatRoom.orderExpectedTime.substring(14, 16)}
              value={getChatRoom.orderExpectedTime.substring(14, 16)}
            />
            <Picker.Item
              label={Number(getChatRoom.orderExpectedTime.substring(14, 16))+10}
              value={Number(getChatRoom.orderExpectedTime.substring(14, 16))+10}
            />
          </Picker>
          <Text style={{ fontSize: 18, marginTop: "30%" }}>분</Text>
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginTop: 135
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain"
  },
  body: {
    height: "100%",
    width: "100%",
  },
  text: {
    marginLeft: 40,
    fontSize: 15
  },
  time: {
    flexDirection: 'row',
    justifyContent:"space-evenly",
    alignContent:"flex-start",
    margin:0,
  }
});

export default withSuspense(withNavigation(ChangeOrderTimeScreen));
