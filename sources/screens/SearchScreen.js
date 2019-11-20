import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "native-base";
import { GET_SAME_CATEGORY } from "../queries/UserQuery";
import { ScrollView } from "react-native-gesture-handler";
import Search from "../components/Search";
import { searchDataInput } from "../hooks/useInput";
import withSuspense from "../withSuspense";
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";

function SearchScreen(props) {
  const searchInput = searchDataInput("");

  const {
    data: { getStoreCategoryChatRoomList }
  } = useQuery(GET_SAME_CATEGORY, {
    suspend: true,
    variables: {
      storeCategoryName: searchInput.value
    }
  });

  const handlePressPrev = () => {
    props.navigation.navigate("test");
  };

  const handlePressSearch = async() => {
    //getStoreCategoryChatRoomList();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlePressPrev}>
          <Image
            style={styles.icon}
            source={require("../../resources/images/back.png")}
          />
        </TouchableOpacity>
        <TextInput
          {...searchInput}
          style={styles.textInput}
          placeholder=""
          placeholderTextColor="#FFFFFF"
        />
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handlePressSearch}
        >
          <Icon name="md-search" size={30} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity>
          <ScrollView>
            {getStoreCategoryChatRoomList.map(room => (
              <Search
                key={room.id}
                image={room.store.image}
                category={room.store.name}
                location={room.location}
                member={room.memberList.length}
              />
            ))}
          </ScrollView>
        </TouchableOpacity>
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
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderColor: "#CCC",
    borderWidth: 1,
    backgroundColor: "#EEE",
    marginHorizontal: 10
  },
  body: {
    height: "100%",
    width: "100%"
  },
  box: {
    alignItems: "stretch",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#ccc",
    height: "30%",
    margin: "5%",
    marginTop: "10%",
    flexDirection: "row"
  },
  logo: {
    flex: 1,
    height: 25,
    width: 25,
    resizeMode: "contain"
  },
  room: {
    flex: 2,
    flexDirection: "column"
  },
  roomData: {
    flex: 2,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 5,
    color: "#666"
  },
  enterMember: {
    flex: 2,
    color: "#666",
    fontSize: 15,
    marginBottom: 20
  }
});

export default withSuspense(withNavigation(SearchScreen));
