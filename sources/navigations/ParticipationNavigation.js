import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import OpenChatInfoScreen from '../screens/OpenChatInfoScreen';
import OrderNavigation from './OrderNavigation';

const ParicipationNavigation = createStackNavigator({
  OpenChatInfo: {
    screen: OpenChatInfoScreen
  },
  OrderNavigation
}, {
  headerMode: 'none'
});

export default createAppContainer(ParicipationNavigation);