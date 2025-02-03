import React, { useContext, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { items, total, dispatch } = useContext(CartContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }), // Convert to cents
      });
      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      Alert.alert('Payment Error', 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntent();
    if (!clientSecret) return;

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    if (error) {
      Alert.alert('Payment Error', error.message);
      return;
    }

    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) {
      Alert.alert('Payment Error', paymentError.message);
    } else {
      Alert.alert('Success', 'Payment completed!');
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Checkout</Text>
      {items.map((item) => (
        <Text key={item.id}>{item.name} x{item.quantity} - ${item.price * item.quantity}</Text>
      ))}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Total: ${total.toFixed(2)}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Pay with Stripe" onPress={handlePayment} />
      )}
    </View>
  );
}
