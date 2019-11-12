import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, PermissionsAndroid, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Room from '../components/Room'
import CustomIndicator from '../components/CustomIndicator';
import CustomMarker from '../components/CustomMarker';
import withSuspense from '../withSuspense';
import { useInput } from '../hooks/useInput';
import { GET_CHAT_ROOM_LIST } from '../queries/ChatQuery';
import { FIND_MY_CHAT_LIST, ENTER_CHAT_ROOM } from '../queries/UserQuery';


function MainScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const [ coordinate, setCoordinate ] = useState({ latitude: 0, longitude: 0 });
  const [ hasLocationPermission, setHasLocationPermission ] = useState(true);
  const { data: { getChatRoomList } } = useQuery(GET_CHAT_ROOM_LIST, { suspend: true });
  const { data: { findMyChatList } } = useQuery(FIND_MY_CHAT_LIST, { suspend: true });
  const searchInput = useInput("");

  useEffect(() => {
    preLoad();
  }, []);

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
      if (hasLocationPermission)
        positioning();
      return;
    }
  }

  const positioning = () => {
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

  const handlePressProfile = () => {
    props.navigation.navigate("MyProfile");
  }
  const handlePressSearch = () => {
    props.navigation.navigate("Search");
  }
  const handlePressPositioning = () => {
    positioning();
  }
  const handlePressPlus = () => {
    props.navigation.navigate("ChooseCategory");
  }

  return (
    <View style={styles.container}>
      <CustomIndicator isLoading={loading}/>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={handlePressProfile}>
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
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {findMyChatList.map(room => (
            <Room key={room.id} uri={room.store.image} location={room.location}/>
          ))}
        </ScrollView>
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
        {getChatRoomList.map((marker) => {
          const { id, latitude, longitude, store, orderExpectedTime, memberList } = marker;
          const onPress = () => {
            props.navigation.navigate("ParticipationNavigation", { roomId: id });
          }
          return (
            <Marker
              coordinate={{ latitude, longitude }}
              key={id}
              onPress={onPress}>
              <CustomMarker uri={store.image} time={orderExpectedTime} member={memberList.length}/>
            </Marker>
          );
        })}

      </MapView>

      <TouchableOpacity
        style={styles.myPosition}
        onPress={handlePressPositioning}>
        <MaterialIcons name="my-location" size={25} color="#666"/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.plus}
        onPress={handlePressPlus}>
        <AntDesign name="pluscircle" size={55} color="#E2937B"/>
      </TouchableOpacity>

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
  },
  myPosition: {
    position: 'absolute',
    right: 20,
    bottom: 85,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FFF'
  },
  plus: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 100,
    backgroundColor: '#FFF'
  }
});

export default withSuspense(withNavigation(MainScreen));