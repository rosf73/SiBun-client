import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChooseCategoryScreen from '../screens/ChooseCategoryScreen';
import ChooseStoreScreen from '../screens/ChooseStoreScreen';
import InputOrderInfoScreen from '../screens/InputOrderInfoScreen';
import OrderNavigation from './OrderNavigation';

const MakeRoomNavigation = createStackNavigator({
  ChooseCategory: {
    screen: ChooseCategoryScreen
  },
  ChooseStore: {
    screen: ChooseStoreScreen
  },
  InputOrderInfo: {
    screen: InputOrderInfoScreen
  },
  OrderNavigation
}, {
  headerMode: 'none'
});

export default createAppContainer(MakeRoomNavigation);