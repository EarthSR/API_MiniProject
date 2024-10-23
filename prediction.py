from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from werkzeug.utils import secure_filename
import os
import mysql.connector
from datetime import datetime
from flask_cors import CORS
import threading  # ใช้สำหรับทำงานหน่วงเวลา
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Path where the model and labels are stored
MODEL_PATH = 'model.h5'
LABELS_PATH = 'star-labels.txt'

# Load the trained model
model = tf.keras.models.load_model(MODEL_PATH)

# Load class labels
class_labels = []
with open(LABELS_PATH, "r", encoding="utf-8") as file:
    class_labels = [line.strip() for line in file]

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",  # Replace with your MySQL password
    database="db_miniprojectfinal"  # Replace with your database name
)

# Function to delete file after a certain time
def delete_file_after_delay(file_path, delay):
    def delete_file():
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"{file_path} has been deleted.")
    timer = threading.Timer(delay, delete_file)  # Run after 'delay' seconds
    timer.start()

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    # Get the image from the request
    file = request.files['image']

    # Load the image from memory without saving to disk
    image = tf.keras.preprocessing.image.load_img(BytesIO(file.read()), target_size=(224, 224))
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

    return jsonify(result), 200

# Start the Flask app
if __name__ == '__main__':
    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(host='0.0.0.0', port=5000, debug=True)