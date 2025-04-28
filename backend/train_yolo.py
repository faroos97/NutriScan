from ultralytics import YOLO

# === Configuration ===
model = YOLO('yolov8n.pt')  # On part d'un modèle léger YOLOv8n pour aller vite

# === Entraînement ===
model.train(
    data='C:/Users/faroo/Downloads/labeled-data/data.yaml',  # <-- mets ici ton vrai chemin vers ton data.yaml
    epochs=10,            # nombre d'epochs (change si tu veux)
    imgsz=640,            # taille des images
    batch=32,             # batch size (augmente si tu as une grosse carte graphique)
    name='nutriscan_model',  # nom du dossier de sauvegarde runs/train/
)

print("✅ Entraînement terminé !")
