import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Preview from '../screens/Preview/Preview';
import Login from '../screens/auth/Login';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgetPass from '../screens/auth/ForgetPass';
import Home from '../screens/Home/Home';
import PhoneSignUp from '../screens/auth/PhoneSignUp';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Preview"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{title: 'Preview'}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PhoneSignUp" component={PhoneSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
