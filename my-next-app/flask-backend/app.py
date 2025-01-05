from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/stock', methods=['GET'])
def get_stock():
    ticker = request.args.get('ticker', 'AAPL')  # Default to 'AAPL' if no ticker is provided
    try:
        data = yf.Ticker(ticker)
        hist = data.history(period="1d", interval="1m")
        if not hist.empty:
            # Convert Timestamp keys to strings
            close_data = {str(time): value for time, value in hist['Close'].items()}
            return jsonify(close_data)
        else:
            return jsonify({'error': 'No data available for the specified ticker'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
