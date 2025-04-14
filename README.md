## 🔧 1. Stack Technique recommandée

### 🔙 Backend

- **Langage** : **Python** (parfait pour l’IA et la data)
- **Framework API** : **FastAPI**
- **Base de données** : **PostgreSQL**
- **Authentification** : **Firebase Auth** ou **JWT**
- **Stockage d’image** : **AWS S3** ou **Cloudinary**

### 🤖 IA / ML

- **Modèle OCR / Image** : **YOLOv8** ou **Detectron2** pour la détection alimentaire
- **Analyse nutritionnelle** : Modèle custom ou API comme **Edamam**, **OpenFoodFacts**, **Nutritionix**
- **Profiling personnalisé** : Système de règles + ML pour recommandations dynamiques

### 📱 Frontend Mobile

- **Framework** : **React Native (Expo)** → cross-platform
- **Librairie UI** : **Tailwind (via NativeWind)** ou **React Native Paper**

### 🧠 MLOps / Training

- **Notebook** : Jupyter/Colab
- **Pipeline** : DVC + GitHub Actions pour le versioning

---

## 🧩 2. Roadmap Agile : Epics → Stories → Tasks

---

### 🟣 EPIC 1 : Authentification et Profil Utilisateur

#### Story 1.1 : Enregistrement et Connexion

- [ ]  Implémenter système d’auth via email + mdp (Firebase Auth)
- [ ]  Créer écran login / signup dans React Native

#### Story 1.2 : Gestion du profil nutritionnel

- [ ]  Ajouter champs : objectif (perte, masse, etc), régime (végan, etc), allergies, diabète
- [ ]  Formulaire dynamique avec validation
- [ ]  Enregistrer dans la BDD via API

---

### 🟢 EPIC 2 : Scan Alimentaire (via photo ou produit)

#### Story 2.1 : Scan code-barres (produit)

- [ ]  Intégrer lecteur de code-barres dans l'app
- [ ]  Appeler l’API OpenFoodFacts
- [ ]  Afficher les infos nutritionnelles

#### Story 2.2 : Scan via photo de plat

- [ ]  Intégrer prise de photo dans app
- [ ]  Uploader l’image vers le backend
- [ ]  Backend appelle modèle IA (ex : YOLOv8 entraîné)
- [ ]  Extraire les aliments identifiés
- [ ]  Associer les valeurs nutritionnelles (via base interne ou API)

---

### 🔵 EPIC 3 : Calcul et analyse personnalisée

#### Story 3.1 : Calcul automatique des macros (à partir des aliments détectés)

- [ ]  Associer chaque aliment aux macros (lipide, prot, glucide)
- [ ]  Calculer la somme en fonction des portions détectées

#### Story 3.2 : Analyse selon le profil

- [ ]  Implémenter règles simples (ex : si diabète → limiter sucre)
- [ ]  Afficher indicateur vert / orange / rouge selon le profil
- [ ]  Suggestions (ex : remplacer tel ingrédient, réduire la portion)

---

### 🟠 EPIC 4 : Dashboard utilisateur

#### Story 4.1 : Historique des scans

- [ ]  Afficher liste des derniers repas analysés
- [ ]  Stocker chaque scan avec date/heure

#### Story 4.2 : Statistiques hebdo/mensuelles

- [ ]  Graphe d’évolution des macros
- [ ]  Comparaison avec les objectifs

---

### 🔴 EPIC 5 : Entraînement et amélioration du modèle IA

#### Story 5.1 : Collecte de données

- [ ]  Créer dataset d’images de plats + annotations
- [ ]  Utiliser Label Studio ou Roboflow

#### Story 5.2 : Entraînement modèle de détection

- [ ]  Entraîner YOLOv8 sur les images annotées
- [ ]  Export modèle vers ONNX ou TorchScript pour déploiement

---

## ✅ 3. Tâches immédiates à faire

|Priorité|Tâche|Détail|
|---|---|---|
|🔥|Configurer repo FastAPI + PostgreSQL|Init backend + endpoints de test|
|🔥|Créer projet React Native avec Expo|Init app mobile|
|🔥|Ajouter Firebase Auth|Authentification email + mdp|
|⚡|Créer UI formulaire de profil|Type d’objectif, régime, etc|
|⚡|Intégrer lecteur de code-barres|Utiliser lib expo-barcode-scanner|
|⚡|Appeler l’API OpenFoodFacts|Tester affichage JSON brut|
|⚡|Connecter front/backend via Axios|Exemples : login, profil, scan|

---

## 🧠 Outils conseillés pour le dev

- **Postman** : tester tes endpoints
- **Figma** : maquetter l’app (même simple)
- **Trello / Notion** : suivre les Epics/Stories/Tâches
- **GitHub Projects** : si tu veux tout centraliser
