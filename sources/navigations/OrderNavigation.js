import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChooseCategoryScreen from '../screens/ChooseCategoryScreen';

const OrderNavigation = createStackNavigator({
  ChooseCategory: {
    screen: ChooseCategoryScreen
  }
});

export default createAppContainer(OrderNavigation);