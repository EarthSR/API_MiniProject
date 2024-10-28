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
age_prediction_model = tf.keras.models.load_model('age_prediction_model_Final_2.h5')

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

# Route to handle image predictions
@app.route('/ai/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if not file.content_type.startswith('image/'):
        return jsonify({"error": "Invalid file type. Please upload an image."}), 400

    try:
        file_stream = BytesIO(file.read())
        file_stream.seek(0)  # Reset the pointer of the file stream
        image = tf.keras.preprocessing.image.load_img(file_stream, target_size=(224, 224))
        image = tf.keras.preprocessing.image.img_to_array(image)
        image = tf.expand_dims(image, axis=0)  # Add batch dimension
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    try:
        predictions = model.predict(image, verbose=0)
        predicted_class = int(tf.argmax(predictions, axis=1).numpy()[0])
        confidence_score = predictions[0][predicted_class]
    except Exception as e:
        return jsonify({"error": f"Error during model prediction: {str(e)}"}), 500

    result = {
        "predicted_class": class_labels[predicted_class],
        "confidence_score": round(float(confidence_score) * 100, 2)
    }

    try:
        cursor = db.cursor()
        sql_get_celebrity_id = "SELECT ThaiCelebrities_ID FROM thaicelebrities WHERE ThaiCelebrities_name = %s"
        cursor.execute(sql_get_celebrity_id, (class_labels[predicted_class],))
        result_id = cursor.fetchone()

        if not result_id:
            return jsonify({"error": "Celebrity not found in the database"}), 404

        thai_celebrities_id = result_id[0]
        similarity_date = datetime.now().strftime('%Y-%m-%d')
        similarity_percent = result["confidence_score"]

        sql_insert_similarity = """
        INSERT INTO similarity (similarity_Date, similarityDetail_Percent, ThaiCelebrities_ID) 
        VALUES (%s, %s, %s)
        """
        cursor.execute(sql_insert_similarity, (similarity_date, similarity_percent, thai_celebrities_id))
        db.commit()

    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({"error": f"MySQL error: {str(err)}"}), 500
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor:
            cursor.close()

    return jsonify(result), 200



# API endpoint to predict age
@app.route('/ai/predict/age', methods=['POST'])
def predict_age():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if not file.content_type.startswith('image/'):
        return jsonify({'error': 'Invalid file type. Please upload an image.'}), 400

    try:
        # Load and preprocess the image
        image = tf.keras.preprocessing.image.load_img(BytesIO(file.read()), target_size=(224, 224))
        image = tf.keras.preprocessing.image.img_to_array(image)
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        image = image / 255.0  # Rescale the image

        # Log the shape of the image
        print(f"Image shape: {image.shape}")

        # Make prediction
        prediction = age_prediction_model.predict(image)
        predicted_age = int(prediction[0][0])  # Convert to integer
        
        # Log the prediction result
        print(f"Predicted age: {predicted_age}")

    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

    # Prepare the data for database insertion
    age_date = datetime.now().strftime('%Y-%m-%d')
    try:
        cursor = db.cursor()
        sql = "INSERT INTO age (age_Date, age_result) VALUES (%s, %s)"
        cursor.execute(sql, (age_date, predicted_age))
        db.commit()
        cursor.close()
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({'error': f'MySQL error: {str(err)}'}), 500

    return jsonify({'predicted_age': predicted_age})


# Start the Flask app
if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)