import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

class Search extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Image style={styles.logo} source={{ uri: this.props.image }} />
        <View style={styles.room}>
          <Text style={styles.roomData}>{this.props.category}</Text>
          <Text style={styles.roomData}>{this.props.location}</Text>
          <Text style={styles.roomData}>인원 : {this.props.member}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    marginRight: 15,
  },
  room: {
    flex: 1,
    flexDirection: "column"
  },
  roomData: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
  }
});

export default Search;
