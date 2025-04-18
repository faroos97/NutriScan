from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore

# Initialisation de Firebase Admin SDK
cred = credentials.Certificate("/Users/abdou/Developer/NutriScan/backend/nutriscan-4f733-firebase-adminsdk-fbsvc-800545f370.json")
firebase_admin.initialize_app(cred)

# Initialisation Firestore
db = firestore.client()

app = FastAPI()

# Modèle pour le profil nutritionnel
class NutritionProfile(BaseModel):
    goal: str
    diet: str
    allergies: str
    diabetes: bool
    user_id: str  # ID Firebase de l'utilisateur

# Endpoint pour sauvegarder ou mettre à jour le profil nutritionnel
@app.post("/profil")
async def create_nutrition_profile(profile: NutritionProfile):
    try:
        # Enregistrement dans Firestore sous l'ID de l'utilisateur
        user_ref = db.collection("profiles").document(profile.user_id)  # Crée un document par utilisateur avec son UID Firebase
        user_ref.set({
            "goal": profile.goal,
            "diet": profile.diet,
            "allergies": profile.allergies,
            "diabetes": profile.diabetes,
        })
        return {"status": "Profil mis à jour"}
    except Exception as e:
        print(f"Erreur lors de l'enregistrement du profil : {str(e)}")
        raise HTTPException(status_code=400, detail=f"Erreur lors de l'enregistrement du profil : {str(e)}")

# Exemple d'endpoint GET pour récupérer le profil
@app.get("/profil/{user_id}")
async def get_nutrition_profile(user_id: str):
    try:
        user_ref = db.collection("profiles").document(user_id)
        doc = user_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            raise HTTPException(status_code=404, detail="Profil non trouvé")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erreur lors de la récupération du profil : {str(e)}")
