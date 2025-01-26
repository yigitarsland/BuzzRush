import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ShopCard({ shop, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: shop.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.details}>
          {shop.rating} ⭐ • {shop.category} • {shop.deliveryTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    margin: 10, 
    borderRadius: 8, 
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
  },
  image: { width: '100%', height: 180 },
  infoContainer: { padding: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  details: { color: '#666', marginTop: 4, fontSize: 14 },
});