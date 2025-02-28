import numpy as np
import pandas as pd
import os
import json
import math
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.preprocessing import LabelEncoder

class LocationManager(): 
    def __init__(self):
        self.distance_threshold = 20


        # get the path of current directory        
        self.root_folder_path = os.path.dirname(__file__)

        # read locations data
        dataset_file_path = self.root_folder_path + '/Destinations/Unique destinations.csv'
        self.df_destinations = pd.read_csv(dataset_file_path, index_col="id")

        self.destination_type_encoder = LabelEncoder()
        self.df_destinations["Destination Type (encoded)"] = self.destination_type_encoder.fit_transform(self.df_destinations['Destination Type'])

        # read categories
        self.categories = self.readCategories()

        # self.createSimilarityMatrix()
        self.euclidean_dist_matrix = np.load(self.root_folder_path + "/euclidean_matrix.npy")
    
    def readCategories(self):
        with open(self.root_folder_path + '/tripper_categories.json', 'r') as f:
            categories = json.load(f)
        return categories
    
    def setCategory(self, category):
        self.destination_category = category
        self.locations_for_category = self.categories[self.destination_category]
    
    def getLocationsForCategory(self):
        return self.locations_for_category

    def setLocation(self, loc):
        self.category_location = self.locations_for_category[loc]
        return self.category_location
    
    def getDestinationLocations(self):
        related_district_destinations_df = self.df_destinations[self.df_destinations.District == self.category_location[2]]

        ref_lat, ref_long = self.category_location[0], self.category_location[1]
        recommonded_locations = []
        closest_location = ""
        min_distance = 100
        for loc in range(related_district_destinations_df.shape[0]):
            destination = related_district_destinations_df.iloc[loc]
            dest_lat, dest_long = destination.Latitude, destination.Longitude
            distance_from_reference_loc = self.haversine(ref_lat, ref_long, dest_lat, dest_long)

            if distance_from_reference_loc < self.distance_threshold:
                recommonded_locations.append(destination)
            
            if distance_from_reference_loc < min_distance and destination.District == self.category_location[2]:
                min_distance = distance_from_reference_loc
                closest_location = destination
        
        picked_locations = pd.DataFrame(recommonded_locations, columns=related_district_destinations_df.columns).sort_values("Rating", ascending=False)
        # recommonded_locations = self.df_destinations[self.df_destinations["Destination Type"] == self.destination_category]
        recommonded_locations = self.getRecommendedLocations(picked_locations, closest_location)
        
        return picked_locations, recommonded_locations
    
    def getRecommendedLocations(self, picked_locations, closest_location):
        closest_location_id = np.where(self.df_destinations.Destination == closest_location.Destination)[0][0]
        idx = np.argsort(self.euclidean_dist_matrix[closest_location_id, :])
        # print(closest_location_id, closest_location)
        recommended_locations = []

        rec_loc = 0
        already_picked_destinations = picked_locations.Destination.to_numpy()
        for id in idx:
            if self.df_destinations.Destination.iloc[id] not in already_picked_destinations:
                recommended_locations.append(self.df_destinations.iloc[id])
                rec_loc += 1
            if rec_loc == 10:
                break
        recommended_locations = pd.DataFrame(recommended_locations, columns=picked_locations.columns).sort_values("Rating", ascending=False)
        return recommended_locations
        return 0
    
    def haversine(self, lat1, lon1, lat2, lon2):
        """
        Calculate the great circle distance between two points
        on the earth (specified in decimal degrees)
        """
        # Convert decimal degrees to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

        # Haversine formula
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        r = 6371  # Radius of earth in kilometers. Use 3956 for miles
        distance = r * c

        return distance
    
    # def createSimilarityMatrix(self):
    #     self.euclidean_dist_matrix = euclidean_distances(self.df_destinations[['Destination Type (encoded)', 'Rating', 'Latitude', 'Longitude']])
    
