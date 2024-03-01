from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


API_Key = "MJ3fTOYyaT5aGcRgtfaZpkokFUyyuG8fwQcapZ0Z"

@app.route('/get_image_url', methods=['GET'])
def get_image_url():
    try:
        start_date = request.args.get('start_date')  # Retrieve start_date from query parameters
        # Make a request to NASA API with start_date parameter
        response = requests.get(url=f"https://api.nasa.gov/planetary/apod?api_key={API_Key}&date={start_date}")
        response.raise_for_status()
        data = response.json()
        img_url = data["url"]
        return jsonify({"img_url": img_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def home():
    return 'Welcome to the Astronomy Picture of the Day API!'
    

if __name__ == "__main__":
    app.run(debug=True)
