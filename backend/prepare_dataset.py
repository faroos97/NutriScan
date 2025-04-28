import os
import shutil
import random

# === CONFIGURATION ===
SOURCE_DIR = "C:/Users/faroo/Downloads/food-101/food-101.zip/food-101/food-101/food-101/images" # <-- remplace ici
OUTPUT_DIR = 'C:/Users/faroo/Downloads/labeled-data'  # <-- remplace ici

train_split = 0.8  # 80% pour l'entrainement
classes = sorted(os.listdir(SOURCE_DIR))  # liste des classes par dossier
class_to_id = {cls: idx for idx, cls in enumerate(classes)}

# === CREATION DES DOSSIERS ===
for split in ['train', 'val']:
    os.makedirs(os.path.join(OUTPUT_DIR, 'images', split), exist_ok=True)
    os.makedirs(os.path.join(OUTPUT_DIR, 'labels', split), exist_ok=True)

# === TRAITEMENT ===
for cls in classes:
    class_folder = os.path.join(SOURCE_DIR, cls)
    images = [f for f in os.listdir(class_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    random.shuffle(images)

    split_idx = int(len(images) * train_split)
    train_imgs = images[:split_idx]
    val_imgs = images[split_idx:]

    for split_name, split_imgs in [('train', train_imgs), ('val', val_imgs)]:
        for img_name in split_imgs:
            img_src = os.path.join(class_folder, img_name)
            img_dst = os.path.join(OUTPUT_DIR, 'images', split_name, img_name)
            shutil.copy(img_src, img_dst)

            # Créer le fichier .txt pour annotation (bounding box couvrant toute l'image)
            label_dst = os.path.join(OUTPUT_DIR, 'labels', split_name, os.path.splitext(img_name)[0] + '.txt')

            with open(label_dst, 'w') as f:
                # format YOLOv8 : class_id center_x center_y width height (normalisés entre 0 et 1)
                # ici : bbox = toute l'image => center=0.5,0.5 et width=1,height=1
                f.write(f"{class_to_id[cls]} 0.5 0.5 1.0 1.0\n")

print("✅ Dataset prêt au format YOLOv8!")

# === CREATION DU data.yaml ===
yaml_path = os.path.join(OUTPUT_DIR, 'data.yaml')
with open(yaml_path, 'w') as f:
    f.write(f"train: {os.path.join(OUTPUT_DIR, 'images/train')}\n")
    f.write(f"val: {os.path.join(OUTPUT_DIR, 'images/val')}\n")
    f.write(f"nc: {len(classes)}\n")
    f.write(f"names: {classes}\n")

print("✅ Fichier data.yaml généré!")
