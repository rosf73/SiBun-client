import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChooseCategoryScreen from '../screens/ChooseCategoryScreen';

const MakeRoomNavigation = createStackNavigator({
  ChooseCategory: {
    screen: ChooseCategoryScreen
  }
});

export default createAppContainer(MakeRoomNavigation);