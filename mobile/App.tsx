import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import BarcodeScannerScreen from './screens/BarcodeScannerScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

// Create the root stack navigator
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;  // For the main flow after login/signup
  Profile: undefined; // Add the "Profile" key
  BarcodeScanner: undefined; // Add the "BarcodeScanner" key
  ProductDetails: { product: any }; // Add the "ProductDetails" key
};

// Create the bottom tab navigator
type BottomTabParamList = {
  Profile: undefined;
  BarcodeScanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Bottom tab navigator component
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'BarcodeScanner') {
            iconName = focused ? 'scan' : 'scan-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
    </Tab.Navigator>
  );
}

// Main stack navigator component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator} // Switch to the BottomTabNavigator after login/signup
          options={{ headerShown: false }}
        />
         <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
         <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: true }}/>

         <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
