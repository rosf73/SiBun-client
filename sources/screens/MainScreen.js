import React, { Component } from 'react';
import { View, StyleSheet, TextInput, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import CustomMarker from '../components/CustomMarker';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      hasLocationPermission: false,
      isLoaded: false,
      markers: [
        {
          coordinate: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          },
          uri: '',
          name: '',
          time: '',
          member: 0
        }
      ]
    };
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ hasLocationPermission: true });
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async componentDidMount() {
    await this.requestLocationPermission();

    if (this.state.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ latitude: position.coords.latitude });
          this.setState({ longitude: position.coords.longitude });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.textInput}
            onChangeText={(number)=>{this.setState({number})}}
            value={this.state.number}
            placeholder=""
            placeholderTextColor="#FFFFFF"/>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005, // 낮을 수록 줌이 크게 됨.
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}>
            <Image style={styles.me} source={require('../../resources/images/MyPosition.png')}/>
          </Marker>
          {this.state.markers.map((marker) => {
            const { uri, name, time, member } = marker;
            return (
              <Marker {...marker}>
                <CustomMarker url={uri} name={name} time={time} member={member}/>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  map: {
    flex: 1
  },
  me: {
    height: 80,
    resizeMode: 'contain'
  }
});

export default MainScreen;