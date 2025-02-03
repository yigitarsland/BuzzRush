import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const LocationSearch = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      updateLocationFromCoords(currentLocation.coords);
    })();
  }, []);

  const updateLocationFromCoords = async (coords) => {
    try {
      let [address] = await Location.reverseGeocodeAsync(coords);
      if (address) {
        const street = [address.streetNumber, address.street].filter(Boolean).join(' ');
        const cityRegion = [address.city, address.region].filter(Boolean).join(', ');
        setAddress({ street, cityRegion });
        setSearchQuery(`${street}, ${cityRegion}`);
      }
    } catch (error) {
      setErrorMsg('Error getting location');
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const geocodeResults = await Location.geocodeAsync(searchQuery);
      if (geocodeResults.length > 0) {
        const firstResult = geocodeResults[0];
        updateLocationFromCoords(firstResult);
        setIsEditing(false);
        setSuggestions([]); // Clear suggestions after selection
      } else {
        setErrorMsg('Address not found');
        setIsEditing(false);
        setSuggestions([]);
      }
    } catch (error) {
      setErrorMsg('Error searching address');
      setIsEditing(false);
      setSuggestions([]);
    }
  };

  const handleSearchChange = async (text) => {
    setSearchQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        setSuggestions(
          data.map((item) => ({
            lat: item.lat,
            lon: item.lon,
            display_name: item.display_name,
          }))
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (selectedAddress) => {
    setSearchQuery(selectedAddress.display_name);
    setSuggestions([]);
    updateLocationFromCoords({ latitude: parseFloat(selectedAddress.lat), longitude: parseFloat(selectedAddress.lon) });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="location-on" size={20} color="#000" style={styles.icon} />
      
      <View style={styles.textContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={searchQuery}
              onChangeText={handleSearchChange}
              onSubmitEditing={handleUpdateLocation}
              autoFocus
              placeholder="Enter your address"
            />
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
                    <Text style={styles.suggestionText}>{item.display_name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
              />
            )}
          </>
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : address ? (
          <>
            <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
              {address.street}
            </Text>
            <Text style={styles.cityText} numberOfLines={1} ellipsizeMode="tail">
              {address.cityRegion}
            </Text>
          </>
        ) : (
          <Text style={styles.addressText}>Getting location...</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          if (isEditing) {
            handleUpdateLocation();
          } else {
            setIsEditing(true);
            if (address) {
              setSearchQuery(''); // Clear the current text
            }
          }
        }}
      >
        <MaterialIcons name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  cityText: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
  searchButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    padding: 0,
    height: 40,
  },
  suggestionText: {
    padding: 8,
    fontSize: 16,
    color: '#000',
  },
  suggestionsList: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    maxHeight: 200,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default LocationSearch;
