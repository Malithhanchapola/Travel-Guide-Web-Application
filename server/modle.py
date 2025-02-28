import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
import json


data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'item_id': [101, 102, 103, 101, 104, 101, 102, 103],
    'rating': [5, 3, 4, 4, 5, 2, 3, 4]
}


df = pd.DataFrame(data)


reader = Reader(rating_scale=(1, 5))
surprise_data = Dataset.load_from_df(df[['user_id', 'item_id', 'rating']], reader)


trainset, testset = train_test_split(surprise_data, test_size=0.2)


model = SVD()
model.fit(trainset)


predictions = model.test(testset)


rmse = np.sqrt(mean_squared_error([pred.r_ui for pred in predictions], [pred.est for pred in predictions]))
print(f"Root Mean Squared Error: {rmse:.2f}")


user_features = {
    1: {'age': 25, 'location': 'NY', 'preferred_transport': 'Car'},
    2: {'age': 30, 'location': 'LA', 'preferred_transport': 'Bike'},
    3: {'age': 22, 'location': 'TX', 'preferred_transport': 'Public Transport'}
}


item_features = {
    101: {'type': 'Hotel', 'location': 'NY', 'price': 'Medium'},
    102: {'type': 'Hotel', 'location': 'LA', 'price': 'High'},
    103: {'type': 'Restaurant', 'location': 'NY', 'price': 'Low'},
    104: {'type': 'Restaurant', 'location': 'LA', 'price': 'Medium'}
}


with open('/content/model.json', 'w') as f:
    json.dump({'model': model.__dict__, 'user_features': user_features, 'item_features': item_features}, f)

print("Model and features saved.")
