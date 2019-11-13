import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from '../screens/MainScreen';
import SearchScreen from '../screens/SearchScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import OrderScreen from '../screens/OrderScreen';
import MakeRoomNavigation from './MakeRoomNavigation';
import ParticipationNavigation from './ParticipationNavigation';

const MainNavigation = createStackNavigator({
  Main: {
    screen: MainScreen
  },
  Search: {
    screen: SearchScreen
  },
  MyProfile: {
    screen: MyProfileScreen
  },
  ChatRoom: {
    screen: ChatRoomScreen
  },
  Order: {
    screen: OrderScreen
  },
  MakeRoomNavigation,
  ParticipationNavigation
}, {
  headerMode: 'none'
});

export default createAppContainer(MainNavigation);