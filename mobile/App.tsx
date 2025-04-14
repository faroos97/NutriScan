import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ padding: 10, color: 'blue', borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
        ON VA PETER LE MILLION AVEC NUTRISCAN!</Text>
      <Text style={{ padding: 10, color: 'green' }}>Welcome to the app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
