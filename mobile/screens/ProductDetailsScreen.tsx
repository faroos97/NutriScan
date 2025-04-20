import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// Définis une interface pour le produit
interface Product {
  brands: string;
  categories: string;
  code: string;
  allergens?: string;
  additives_tags?: string[];
  countries?: string;
  ecoscore_data?: {
    grade?: string;
  };
}

// Définis le type pour les paramètres de route
type RouteParams = {
  product: Product;
};

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {product.brands} - {product.categories}
      </Text>

      <Text style={styles.code}>Code barre : {product.code}</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Allergènes :</Text>
        <Text>{product.allergens || 'Non spécifié'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Additifs :</Text>
        <Text>{product.additives_tags?.join(', ') || 'Aucun'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Pays :</Text>
        <Text>{product.countries || 'Non spécifié'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Éco-score :</Text>
        <Text>{product.ecoscore_data?.grade?.toUpperCase() || 'N/A'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  code: {
    fontSize: 14,
    marginBottom: 16,
    color: 'gray',
  },
  section: {
    marginBottom: 16,
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ProductDetailsScreen;
