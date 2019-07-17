import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Product: {screen: Product},
  Products: {screen: Products},
});

const AppNav = createAppContainer(MainNavigator);

export default AppNav;