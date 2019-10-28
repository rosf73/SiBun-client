import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from '../screens/MainScreen';
import SearchScreen from '../screens/SearchScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import OpenChatInfoScreen from '../screens/OpenChatInfoScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MakeRoomNavigation from './MakeRoomNavigation';
import ParticipationNavigation from './ParticipationNavigation';
import OrderNavigation from './OrderNavigation';

const MainNavigation = createStackNavigator({
  ChatRoom: {
    screen: ChatRoomScreen
  },
  Main: {
    screen: MainScreen
  },
  Search: {
    screen: SearchScreen
  },
  MyProfile: {
    screen: MyProfileScreen
  },
  OpenChatInfo: {
    screen: OpenChatInfoScreen
  },
  MakeRoomNavigation,
  ParticipationNavigation,
  OrderNavigation
}, {
  headerMode: 'none'
});

export default createAppContainer(MainNavigation);