import React, { useState } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CameraScanScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission refusée',
        'Autorise l’accès à la caméra pour utiliser cette fonctionnalité.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      await uploadImage(imageUri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as unknown as Blob);

      const response = await fetch('http://172.20.10.12:8000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await response.json();
      if (response.ok) {
        Alert.alert('Succès', 'Image uploadée avec succès !');
        console.log('Réponse du backend :', json);
      } else {
        throw new Error(json.message || 'Erreur lors de l\'upload');
      }
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Prendre une photo" onPress={takePhoto} />
      {uploading && <ActivityIndicator size="large" color="tomato" style={{ marginTop: 16 }} />}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default CameraScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 8,
  },
});
