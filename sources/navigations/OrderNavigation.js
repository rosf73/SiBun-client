import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuScreen from '../screens/MenuScreen';
import BasketScreen from '../screens/BasketScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const OrderNavigation = createStackNavigator({
  Menu: {
    screen: MenuScreen
  },
  Basket: {
    screen: BasketScreen
  },
  ChatRoom: {
    screen: ChatRoomScreen
  }
}, {
  headerMode: 'none'
});

export default createAppContainer(OrderNavigation);