import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChooseCategoryScreen from '../screens/ChooseCategoryScreen';

const ParicipationNavigation = createStackNavigator({
  ChooseCategory: {
    screen: ChooseCategoryScreen
  }
});

export default createAppContainer(ParicipationNavigation);