import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { items, total, dispatch } = useContext(CartContext);

  const handleAdjustQuantity = (item, action) => {
    if (action === 'increment') {
      dispatch({ type: 'ADD_ITEM', payload: item });
    } else if (action === 'decrement') {
      dispatch({ type: 'REMOVE_ITEM', payload: item.id });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Browse shops to add items</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemShop}>{item.shopName}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={() => handleAdjustQuantity(item, 'decrement')}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    onPress={() => handleAdjustQuantity(item, 'increment')}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => Alert.alert('Checkout', 'Proceed to payment screen')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#999' },
  listContent: { paddingBottom: 20 },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemShop: { fontSize: 12, color: '#888', marginTop: 2 },
  itemPrice: { fontSize: 14, color: '#666', marginTop: 4 },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 15,
  },
  quantityButton: {
    backgroundColor: 'tomato',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: { color: 'white', fontSize: 18, lineHeight: 22 },
  quantity: { fontSize: 16, minWidth: 20, textAlign: 'center' },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: 'tomato',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});