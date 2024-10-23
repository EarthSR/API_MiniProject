from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from werkzeug.utils import secure_filename
import os
import mysql.connector
from datetime import datetime
from flask_cors import CORS
import threading  # ใช้สำหรับทำงานหน่วงเวลา

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

# Route to handle image uploads and predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    # Get the image from the request
    file = request.files['image']
    filename = secure_filename(file.filename)

    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    # Save the uploaded image to a temporary directory
    file_path = os.path.join('uploads', filename)
    file.save(file_path)

    # Schedule the file to be deleted after 180 seconds
    delete_file_after_delay(file_path, 180)  # Delete file after 10 seconds

    # Preprocess the image
    try:
        image = tf.keras.preprocessing.image.load_img(file_path, target_size=(224, 224))
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

# Start the Flask app
if __name__ == '__main__':
    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(host='0.0.0.0', port=5000, debug=True)
