import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function MenuItem({ item }) {
    const { dispatch } = useContext(CartContext);
  
    const handleAddToCart = () => {
      dispatch({ type: 'ADD_ITEM', payload: item });
      Alert.alert('Added to cart', `${item.name} was added to your cart`);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
          <Text style={styles.buttonText}>Add +</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
  },
  info: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, color: '#333' },
  price: { fontSize: 16, color: '#666', fontWeight: '500' },

  addButton: {
    backgroundColor: 'tomato',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});