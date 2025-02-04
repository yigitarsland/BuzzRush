import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderDetails from '../components/OrderDetails';

const OrdersScreen = () => {
  const navigation = useNavigation();

  // Example data for previous orders
  const orders = [
    { id: '1', date: '2025-01-25', total: '$35.00' },
    { id: '2', date: '2025-01-20', total: '$50.00' },
    { id: '3', date: '2025-01-15', total: '$20.00' },
  ];

  // Handle order item click
  const handleOrderClick = (order) => {
    // Navigate to OrderDetails, passing the order data
    navigation.navigate('OrderDetails', { order });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Previous Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderItem} onPress={() => handleOrderClick(item)}>
            <Text style={styles.orderText}>Order ID: {item.id}</Text>
            <Text style={styles.orderText}>Date: {item.date}</Text>
            <Text style={styles.orderText}>Total: {item.total}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderText: {
    fontSize: 16,
  },
});

export default OrdersScreen;
