import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { items, total, dispatch } = useContext(CartContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    City: '',
    PostalCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = 'This field is required';
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const fetchPaymentIntent = async () => {
    if (!validateForm()) return;

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
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
          <Text style={styles.priceText}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <View style={styles.formContainer}>
        {Object.keys(form).map((key) => (
          <View key={key}>
            <TextInput
              style={styles.input}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              value={form[key]}
              onChangeText={(text) => setForm({ ...form, [key]: text })}
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </View>
        ))}
      </View>
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay with Stripe</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
    color: '#333',
  },
  payButton: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
