import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetails = ({ route }) => {
    const { order } = route.params;
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.orderText}>Order ID: {order.id}</Text>
        <Text style={styles.orderText}>Date: {order.date}</Text>
        <Text style={styles.orderText}>Total: {order.total}</Text>
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
  orderText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OrderDetails;
