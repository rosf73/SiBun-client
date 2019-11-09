import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChooseCategoryScreen from '../screens/ChooseCategoryScreen';
import ChooseStoreScreen from '../screens/ChooseStoreScreen';
import InputOrderInfoScreen from '../screens/InputOrderInfoScreen';
import SelectAddressScreen from '../screens/SelectAddressScreen';
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
  SelectAddress: {
    screen: SelectAddressScreen
  },
  OrderNavigation
}, {
  headerMode: 'none'
});

export default createAppContainer(MakeRoomNavigation);