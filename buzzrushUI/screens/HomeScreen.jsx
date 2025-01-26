import { View, FlatList, StyleSheet } from 'react-native';
import ShopCard from '../components/ShopCard';
import SearchBar from '../components/SearchBar';
import shops from '../data/shops';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShopCard 
            shop={item}
            onPress={() => navigation.navigate('ShopDetail', { shop: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContent: { paddingBottom: 20 },
});