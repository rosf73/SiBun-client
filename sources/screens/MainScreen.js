import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, PermissionsAndroid, Image, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons'

import CustomMarker from '../components/CustomMarker';
import withSuspense from '../withSuspense';
import { useInput } from '../hooks/useInput';
import { FIND_MY_CHAT_LIST } from '../queries/UserQuery';

function MainScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const [ coordinate, setCoordinate ] = useState({ latitude: 0, longitude: 0 });
  const [ hasLocationPermission, setHasLocationPermission ] = useState(true);
  const [ markers, setMarkers ] = useState([
    {
      id: 'ck2972zkwnvoy0b60s7umzvm1',
      coordinate: {
        latitude: 36.1465,
        longitude: 128.39
      },
      uri: 'https://www.bhc.co.kr/images/common/logo300.jpg',
      time: 13,
      member: 1
    }
  ]);
  const searchInput = useInput("");
  //const { data, error } = useQuery(FIND_MY_CHAT_LIST, { suspend: true });

  useEffect(() => {
    preLoad();
  }, [hasLocationPermission]);

  async function preLoad() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    }
    catch (err) {
      console.warn(err);
    }
    finally {
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            setCoordinate({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
  
      return;
    }
  }

  const handlePressSearch = () => {

  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={handlePressSearch}>
          <Image style={styles.icon} source={require('../../resources/images/me.png')}/>
        </TouchableOpacity>
        <TextInput
          {...searchInput}
          style={styles.textInput}
          placeholder=""
          placeholderTextColor="#FFFFFF"/>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handlePressSearch}>
          <Ionicon name="md-search" size={30} color="#666"/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.rooms}>
        <FlatList
          ref={ref => this.flatListRef = ref}
          data={[]}
          renderItem={({ item }) =>
            <Room uri={item.image} location={item.location}/>}
          keyExtractor={item => item.id}/>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: coordinate.latitude-0.001,
          longitude: coordinate.longitude,
          latitudeDelta: 0.005, // 낮을 수록 줌이 크게 됨.
          longitudeDelta: 0.005,
        }}>

        <Marker
          coordinate={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
          }}>
          <Image style={styles.me} source={require('../../resources/images/MyPosition.png')}/>
        </Marker>
        {markers.map((marker) => {
          const { id, uri, time, member } = marker;
          const onPress = () => {
            props.navigation.navigate("ChatRoom", { roomId: "ck2972zkwnvoy0b60s7umzvm1" })
          }
          return (
            <Marker {...marker} key={id} onPress={onPress}>
              <CustomMarker uri={uri} time={time} member={member}/>
            </Marker>
          );
        })}

      </MapView>

    </View>
  );
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
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginTop: 135
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#EEE',
    marginHorizontal: 10
  },
  rooms: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  map: {
    height: '100%',
    width: '100%'
  },
  me: {
    height: 80,
    resizeMode: 'contain'
  }
});

export default withSuspense(withNavigation(MainScreen));