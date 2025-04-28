from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from PIL import Image
import shutil
import os
import uuid

# Initialisation de Firebase Admin SDK
cred = credentials.Certificate("nutriscan-4f733-firebase-adminsdk-fbsvc-86d4a34a0d.json")
firebase_admin.initialize_app(cred)

# Initialisation Firestore
db = firestore.client()

app = FastAPI()

model = YOLO("best.pt")
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

@app.post("/scan-image")
async def scan_image(file: UploadFile = File(...)):
    try:
        # Étape 1: Sauvegarder temporairement l'image
        temp_filename = f"temp_{uuid.uuid4().hex}.jpg"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Étape 2: Charger l’image avec PIL pour détection
        image = Image.open(temp_filename)

        # Étape 3: Inference avec YOLOv8
        results = model.predict(image)
        detected = []

        for result in results:
            boxes = result.boxes
            names = result.names
            for box in boxes:
                cls_id = int(box.cls[0].item())
                name = model.names[cls_id]
                detected.append(name)

        # Étape 4: Nettoyage
        os.remove(temp_filename)

        # Étape 5: Retourner la liste des aliments détectés
        return JSONResponse(content={"aliments_detectes": list(set(detected))})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l’analyse de l’image : {str(e)}")