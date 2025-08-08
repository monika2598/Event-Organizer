import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EventCard = ({ event, onEdit, onDelete, onToggleFav, isFav, cardColor = '#e3f2fd', textColor = '#0d47a1' }) => {
  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{event.title}</Text>
        {onToggleFav && (
          <TouchableOpacity onPress={onToggleFav}>
            <Icon name={isFav ? "favorite" : "favorite-border"} size={24} color={isFav ? "#d32f2f" : textColor} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.detailRow}>
        <Icon name="event" size={16} color={textColor} />
        <Text style={[styles.detailText, { color: textColor }]}>{event.date}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Icon name="place" size={16} color={textColor} />
        <Text style={[styles.detailText, { color: textColor }]}>{event.location}</Text>
      </View>

      {(onEdit || onDelete) && (
        <View style={styles.buttonContainer}>
          {onEdit && (
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#2e7d32' }]} 
              onPress={onEdit}
            >
              <Icon name="edit" size={16} color="#fff" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#c62828' }]} 
              onPress={onDelete}
            >
              <Icon name="delete" size={16} color="#fff" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default EventCard;