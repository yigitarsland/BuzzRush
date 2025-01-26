import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import MenuItem from '../components/MenuItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ShopDetailScreen({ route }) {
  const { shop } = route.params;
  const { items } = useContext(CartContext); // Destructure directly from context

  // Check if cart has items from different shop
  const cartShopId = items[0]?.shopId;
  const isDifferentShop = cartShopId && cartShopId !== shop.id;

  return (
    <View style={styles.container}>
      <FlatList
        data={shop.menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem 
            item={{ 
              ...item,
              shopId: shop.id,
              shopName: shop.name
            }}
            disabled={isDifferentShop}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{shop.rating} ⭐</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.categoryText}>{shop.category}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.deliveryText}>{shop.deliveryTime}</Text>
              </View>
              
              {isDifferentShop && (
                <Text style={styles.warningText}>
                  ※ Clear cart to order from this shop
                </Text>
              )}
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { marginBottom: 15 },
  shopImage: { 
    width: '100%', 
    height: 200,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  shopInfo: { padding: 20 },
  shopName: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
  },
  dotSeparator: {
    color: '#999',
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
  },
  deliveryText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  warningText: {
    color: 'orange',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: { paddingBottom: 20 },
});