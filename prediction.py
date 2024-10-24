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
age_prediction_model = tf.keras.models.load_model('age_prediction_model_pretrained_finetuned.h5')

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

# Route to handle image uploads and predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    # Get the image from the request
    file = request.files['image']

    # Load the image from memory without saving to disk
    try:
        image = tf.keras.preprocessing.image.load_img(BytesIO(file.read()), target_size=(224, 224))
        image = tf.keras.preprocessing.image.img_to_array(image)
        image = tf.expand_dims(image, axis=0)  # Add batch dimension
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    # Make the prediction
    try:
        predictions = model.predict(image, verbose=0)
        predicted_class = int(tf.argmax(predictions, axis=1).numpy()[0])  # Convert numpy.int64 to int
        confidence_score = predictions[0][predicted_class]
    except Exception as e:
        return jsonify({"error": f"Error during model prediction: {str(e)}"}), 500

    # Prepare the response
    result = {
        "predicted_class": class_labels[predicted_class],
        "confidence_score": round(float(confidence_score) * 100, 2)
    }

    # Attempt to retrieve ThaiCelebrities_ID from the database
    try:
        cursor = db.cursor()

        # Query to get ThaiCelebrities_ID from thaicelebrities table
        sql_get_celebrity_id = "SELECT ThaiCelebrities_ID FROM thaicelebrities WHERE ThaiCelebrities_name = %s"
        cursor.execute(sql_get_celebrity_id, (class_labels[predicted_class],))
        result_id = cursor.fetchone()

        if result_id:
            thai_celebrities_id = result_id[0]  # Extract the ID
        else:
            return jsonify({"error": "Celebrity not found in the database"}), 404

        # Save the prediction result into the similarity table
        similarity_date = datetime.now().strftime('%Y-%m-%d')
        similarity_percent = result["confidence_score"]

        # SQL query to insert data into similarity table
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
        cursor.close()

    return jsonify(result), 200



# API endpoint to predict age
@app.route('/predict/age', methods=['POST'])
def predict_age():
    # Get the image file from the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Load the image from memory
    file = request.files['image']
    image = tf.keras.preprocessing.image.load_img(BytesIO(file.read()), target_size=(224, 224))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image = image / 255.0  # Rescale the image

    # Make prediction using the age prediction model
    prediction = age_prediction_model.predict(image)
    predicted_age = float(prediction[0][0])

    # Return the prediction as a JSON response
    return jsonify({'predicted_age': predicted_age})


# Start the Flask app
if __name__ == '__main__':
    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(host='0.0.0.0', port=5000, debug=True)