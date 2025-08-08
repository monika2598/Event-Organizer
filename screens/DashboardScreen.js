import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc, setDoc, deleteDoc as deleteFavDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(fetchedEvents);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const favRef = collection(db, 'users', user.uid, 'favourites');
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const favIds = snapshot.docs.map(doc => doc.id);
      setFavourites(favIds);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = (eventId) => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteDoc(doc(db, 'events', eventId)) },
    ]);
  };

  const handleToggleFav = async (event) => {
    const favRef = doc(db, 'users', user.uid, 'favourites', event.id);
    const favSnap = await getDoc(favRef);

    if (favSnap.exists()) {
      await deleteFavDoc(favRef);
    } else {
      await setDoc(favRef, event);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Events</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Favourites')}
          >
            <Icon name="favorite" size={24} color="#d81b60" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={logout}>
            <Icon name="logout" size={24} color="#5e35b1" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Icon name="add-circle" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Create New Event</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => {
              if (item.createdBy === user.uid) {
                navigation.navigate('EditEvent', { event: item });
              } else {
                Alert.alert('Error', 'You can only edit your own events.');
              }
            }}
            onDelete={() => {
              if (item.createdBy === user.uid) {
                handleDelete(item.id);
              } else {
                Alert.alert('Error', 'You can only delete your own events.');
              }
            }}
            onToggleFav={() => handleToggleFav(item)}
            isFav={favourites.includes(item.id)}
            cardColor="#e8eaf6"
            textColor="#1a237e"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#d1c4e9',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#311b92',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#5e35b1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DashboardScreen;