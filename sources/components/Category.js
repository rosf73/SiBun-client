import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

class Category extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}>
          <View style={styles.marker}>
            <Image style={styles.image} source={{ uri: this.props.uri }}/>
          </View>
          <Text style={{ fontSize: 18 }}>{this.props.category}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 80,
    width: 80,
    borderColor: '#AAA',
    borderWidth: 2,
    marginBottom: 10
  },
  image: {
    borderRadius: 100,
    height: 60,
    width: 60,
    resizeMode: 'contain'
  }
});

export default Category;