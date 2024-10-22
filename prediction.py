from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Path where the model and labels are stored
MODEL_PATH = 'model.h5'
LABELS_PATH = 'labels.txt'

# Load the trained model
model = tf.keras.models.load_model(MODEL_PATH)

# Load class labels
class_labels = []
with open(LABELS_PATH, "r") as file:
    for line in file:
        class_labels.append(line.strip())

# Route to handle image uploads and predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    # Get the image from the request
    file = request.files['image']
    filename = secure_filename(file.filename)

    # Save the uploaded image to a temporary directory
    file_path = os.path.join('uploads', filename)
    file.save(file_path)

    # Preprocess the image
    image = tf.keras.preprocessing.image.load_img(file_path, target_size=(224, 224))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = tf.expand_dims(image, axis=0)  # Add batch dimension

    # Make the prediction
    predictions = model.predict(image, verbose=0)
    predicted_class = tf.argmax(predictions, axis=1).numpy()[0]
    confidence_score = predictions[0][predicted_class]

    # Prepare the response
    result = {
        "predicted_class": class_labels[predicted_class],
        "confidence_score": round(float(confidence_score) * 100, 2)
    }

    # Remove the saved image after prediction
    os.remove(file_path)

    return jsonify(result), 200

# Start the Flask app
if __name__ == '__main__':
    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True)
