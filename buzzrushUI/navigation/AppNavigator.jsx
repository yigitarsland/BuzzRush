import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';
import Checkout from '../screens/Checkout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true, // Ensure header is visible
        title: 'Home', // Title for the current screen
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.openDrawer()} // Opens the drawer
            style={{ marginLeft: 10 }} // Adjust the icon positioning
          />
        ),
      }}
    />
    <Stack.Screen 
      name="ShopDetail" 
      component={ShopDetailScreen} 
      options={{ title: 'Shop Details' }} // Custom title for ShopDetailScreen
    />
  </Stack.Navigator>
);

const CartStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: true,
        title: 'Cart',
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.openDrawer()} // Opens the drawer
            style={{ marginLeft: 10 }} // Adjust the icon positioning
          />
        ),
      }}
    />
    <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Checkout' }} />
  </Stack.Navigator>
);

function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Hide the top bar (header) for the drawer navigator
      }}
    >
      <Drawer.Screen name="Home" component={HomeTabs} />
    </Drawer.Navigator>
  );
}

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false, // Hide the top bar (header) for all tab screens
    }}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Cart" component={CartStack} />
  </Tab.Navigator>
);


export default AppNavigator;
