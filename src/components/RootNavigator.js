import { StackNavigator } from 'react-navigation';
import Home from './HomeScreen';
import New from './NewScreen';

/**
 * A single StackNavigator to allow for a single import in App.js. Sets Home
 * as the initial route.
 */
export default StackNavigator({
  Home,
  New,
},{
  initialRouteName: 'Home',
});
