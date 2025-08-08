import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);

  const handleUpdate = async () => {
    try {
      const ref = doc(db, 'events', event.id);
      await updateDoc(ref, { title, date, location });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update event.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Title Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Event Title</Text>
          <View style={styles.inputContainer}>
            <Icon name="title" size={20} color="#7E57C2" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter event title"
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Date Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Date & Time</Text>
          <View style={styles.inputContainer}>
            <Icon name="date-range" size={20} color="#7E57C2" style={styles.inputIcon} />
            <TextInput
              placeholder="MM/DD/YYYY HH:MM"
              placeholderTextColor="#BDBDBD"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />
          </View>
        </View>

        {/* Location Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <Icon name="location-on" size={20} color="#7E57C2" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter location"
              placeholderTextColor="#BDBDBD"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Icon name="save" size={22} color="#fff" />
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#673AB7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#5E35B1',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 25,
    paddingTop: 30,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 20,
  },
  inputWrapper: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5E35B1',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D1C4E9',
    shadowColor: '#7E57C2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7E57C2',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#5E35B1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default EditEventScreen;