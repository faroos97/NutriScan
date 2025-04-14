import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const App = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Remplace l'URL par celle de ton backend (adresse IP publique ou localhost adapté)
    fetch('http://localhost:8000/')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => {
          console.error('Erreur de connexion au backend:', error);
          setMessage('Erreur de connexion');
        })
        .finally(() => setLoading(false));
  }, []);

  return (
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" /> : <Text style={styles.message}>{message}</Text>}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
