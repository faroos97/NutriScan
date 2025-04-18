import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { auth } from '../config/firbaseConfig';
import axios from 'axios';

const options = {
  goal: ['Perte', 'Masse', 'Maintien'],
  diet: ['Omnivore', 'Végétarien', 'Végétalien'],
  allergies: ['Aucune', 'Gluten', 'Lactose', 'Arachides'],
};

const ProfileScreen: React.FC = () => {
  const [goal, setGoal] = useState('Perte');
  const [diet, setDiet] = useState('Omnivore');
  const [allergies, setAllergies] = useState('Aucune');
  const [diabetes, setDiabetes] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'goal' | 'diet' | 'allergies' | null>(null);

  const handleSelect = (type: 'goal' | 'diet' | 'allergies', value: string) => {
    if (type === 'goal') setGoal(value);
    if (type === 'diet') setDiet(value);
    if (type === 'allergies') setAllergies(value);
    setModalVisible(false);
  };

  const handleSaveProfile = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
        const response = await axios.post('http://localhost:8000/profil', {
          goal: goal.toLowerCase(),
          diet: diet.toLowerCase(),
          allergies: allergies.toLowerCase(),
          diabetes,
          user_id: userId,
        });
        if (response.status === 200) alert('✅ Profil enregistré');
      } catch (e) {
        console.error(e);
        alert('❌ Erreur');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
  
        <Field label="🎯 Objectif" value={goal} onPress={() => { setModalType('goal'); setModalVisible(true); }} />
        <Field label="🥗 Régime" value={diet} onPress={() => { setModalType('diet'); setModalVisible(true); }} />
        <Field label="⚠️ Allergies" value={allergies} onPress={() => { setModalType('allergies'); setModalVisible(true); }} />
  
        <View style={styles.switchRow}>
          <Text style={styles.label}>🩺 Diabète</Text>
          <Switch value={diabetes} onValueChange={setDiabetes} />
        </View>
  
        <View style={styles.button}>
          <Button title="🆗" onPress={handleSaveProfile} />
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={modalType ? options[modalType] : []}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(modalType!, item)} style={styles.modalItem}>
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.button}>
                <Button title="❌" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const Field = ({ label, value, onPress }: { label: string; value: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.field} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAFA',
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 25,
      color: '#222',
    },
    label: {
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 4,
      color: '#333',
    },
    field: {
      marginBottom: 30,
    },
    fieldBox: {
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#ccc',
    },
    value: {
      fontSize: 25,
      color: '#333',
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',

    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      maxHeight: '60%',
    },
    modalItem: {
      paddingVertical: 20,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
    modalText: {
      fontSize: 25,
      textAlign: 'center',
    },
    button: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#009BFF',
      marginTop: 20,
      width: '100%',
      boxShadow : '05px 4px 6px rgba(0, 0, 0, 0.42)',
      elevation: 3
    },
  });
  
  export default ProfileScreen;