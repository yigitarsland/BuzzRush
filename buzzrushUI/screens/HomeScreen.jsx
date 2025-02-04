import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ShopCard from '../components/ShopCard';
import SearchBar from '../components/SearchBar';
import shops from '../data/shops';
import LocationSearch from '../components/LocationBar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.locationSearchContainer}>
        <LocationSearch />
      </View>
      
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      
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
  listContent: { paddingBottom: 30 },
  locationSearchContainer: {
    position: 'relative',
    zIndex: 1,  // Makes LocationSearch appear above other elements
    marginTop: -30
  },
  searchBarContainer: {
    position: 'relative',
    zIndex: 0,  // Ensures SearchBar appears below LocationSearch suggestions
    //marginTop: 1, // Adjust as needed for spacing
  },
});
