import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const { user } = useContext(AuthContext);

  const handleCreate = async () => {
    if (!title || !date || !location) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        date,
        location,
        createdBy: user.uid,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create event.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput 
            placeholder="Enter event title" 
            placeholderTextColor="#bdbdbd"
            value={title} 
            onChangeText={setTitle} 
            style={styles.input} 
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TextInput 
            placeholder="MM/DD/YYYY" 
            placeholderTextColor="#bdbdbd"
            value={date} 
            onChangeText={setDate} 
            style={styles.input} 
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput 
            placeholder="Enter location" 
            placeholderTextColor="#bdbdbd"
            value={location} 
            onChangeText={setLocation} 
            style={styles.input} 
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Icon name="event" size={20} color="#fff" />
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e57c2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5e35b1',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#5e35b1',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#5e35b1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CreateEventScreen;