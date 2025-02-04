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
import AccountScreen  from '../screens/AccountScreen'
import { useNavigation } from '@react-navigation/native'; 
import { DrawerActions } from '@react-navigation/native'; 
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetails from '../components/OrderDetails';
import { Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { Alert } from 'react-native';


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

const OrdersStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        headerShown: false,
        title: 'Previous Orders',
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
      name="OrderDetails"
      component={OrderDetails}
      options={{ title: ' ' }}
    />
  </Stack.Navigator>
);

function AppNavigator() {
  const navigation = useNavigation(); // Use the hook to get the navigation object

  const handleHelpPress = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Email Not Available',
          'Please set up an email account on your device'
        );
        return;
      }

      await MailComposer.composeAsync({
        recipients: ['yigitarsland@icloud.com'],
        subject: 'Help Request',
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to open email client. Please try again later.'
      );
      console.error('MailComposer error:', error);
    }
  };

  const handleSignOut = () => {
    // Reset the app state here (you can reset any global state or async storage if needed)
    Alert.alert('Signed Out', 'You have been signed out');
    navigation.navigate('Home'); // Navigate back to the Home screen
  };
  

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 10 }}
          />
        ),
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeTabs} 
        options={{
          drawerIcon: () => <Ionicons name="home" size={22} color="black" />,
        }}
      />
      <Drawer.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          headerShown: true,
          drawerIcon: () => <Ionicons name="person" size={22} color="black" />,
        }} 
      />
      <Drawer.Screen 
        name="Orders" 
        component={OrdersStack} 
        options={{
          headerShown: true,
          drawerIcon: () => <Ionicons name="cart" size={22} color="black" />,
        }} 
      />
      <Drawer.Screen
        name="Help"
        component={HomeScreen} // No need for a screen component here
        options={{
          headerShown: true,
          drawerLabel: 'Help',
          drawerIcon: () => <Ionicons name="help-circle" size={22} color="black" />,
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
            handleHelpPress();
          },
        })}
      />
      <Drawer.Screen
        name="Sign Out"
        component={HomeScreen} // Placeholder, doesn't navigate to a new screen
        options={{
          drawerLabel: 'Sign Out',
          drawerIcon: () => <Ionicons name="log-out" size={22} color="black" />,
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
            handleSignOut(); // Executes sign out action
          },
        })}
      />
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
