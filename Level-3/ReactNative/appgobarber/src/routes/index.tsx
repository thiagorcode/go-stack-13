import React from 'react';
// @createStackNavigator Gerencia nossa navegação por pilha
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from '../pages/SingIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' }
      }}
      initialRouteName="SignUp"
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />

    </Auth.Navigator>
  )
}

export default AuthRoutes;
