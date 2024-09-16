from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)  # Make sure this line exists
CORS(app)

@app.route('/api/content', methods=['GET'])
def get_content():
    content = {
        'title': 'Hello from Flask!',
        'body': 'This is content fetched from the Flask backend.'
    }
    return jsonify(content)

if __name__ == '__main__':
    app.run(debug=True)
