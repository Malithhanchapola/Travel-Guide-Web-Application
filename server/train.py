from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load the model and features
with open('model.json', 'r') as f:
    data = json.load(f)

model_data = data['model']
user_features = data['user_features']
item_features = data['item_features']

@app.route('/recommend', methods=['POST'])
def recommend():
    user_id = request.json['user_id']
    user_feature = user_features[user_id]
    # Generate recommendations based on user features and model (simplified)
    recommendations = ["item_id_1", "item_id_2", "item_id_3"]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
