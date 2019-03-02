
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Login: LoginScreen,
    SignUp: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white'
      },
      headerTitleStyle: {
        fontWeight: '400'
      }
    })
  })
  const AppContainer = createAppContainer(StackNavigator);
  export default AppContainer