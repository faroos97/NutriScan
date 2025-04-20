import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, CameraType, BarcodeScanningResult } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    ProductDetails: { product: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

const BarcodeScannerScreen: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const cameraRef = useRef<CameraView | null>(null);
    const navigation = useNavigation<NavigationProp>();

    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
        if (permission) {
          setHasPermission(permission.granted);
        } else {
          requestPermission();
        }
      }, [permission]);
    const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
        setScanned(true);
        //Alert.alert('Code-barres scanné', `Type : ${type}\nCode : ${data}`);

        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
            const json = await response.json();

            if (json.status === 1) {
                const product = json.product;
                navigation.navigate('ProductDetails', { product });
            } else {
                Alert.alert('Produit introuvable');
            }
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur lors de la récupération');
        }
    };

    if (hasPermission === null) return <Text>Demande de permission...</Text>;
    if (hasPermission === false) return <Text>Accès à la caméra refusé</Text>;

    return (
        <View style={styles.container}>
            <CameraView
                ref={(ref) => (cameraRef.current = ref)}
                style={styles.camera}
                facing="back" // Use "back" or "front" as string values
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
                }}
            />

            {scanned && (
                <Button title="Scanner à nouveau" onPress={() => setScanned(false)} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});

export default BarcodeScannerScreen;
