import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  renderMenuList = () => {
    
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});

export default MenuScreen;