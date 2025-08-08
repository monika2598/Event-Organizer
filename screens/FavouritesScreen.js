import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavouritesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!user) return;
    const favCol = collection(db, 'users', user.uid, 'favourites');
    const unsubscribe = onSnapshot(favCol, (snapshot) => {
      const favs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavourites(favs);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6a1b9a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourite Events</Text>
        <View style={{ width: 24 }} />
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="favorite-border" size={48} color="#ab47bc" />
          <Text style={styles.emptyText}>No favourite events yet</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on events to add them here</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isFav={true}
              cardColor="#f3e5f5"
              textColor="#4a148c"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#e1bee7',
    padding: 15,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a148c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#7b1fa2',
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9c27b0',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default FavouritesScreen;