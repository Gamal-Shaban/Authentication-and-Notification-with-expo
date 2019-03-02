
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Login: LoginScreen,
    SignUp: SignUpScreen
  })
  const AppContainer = createAppContainer(StackNavigator);
  export default AppContainer