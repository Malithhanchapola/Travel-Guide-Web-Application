import numpy as np
import pandas as pd
import os
import json
import math
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.preprocessing import LabelEncoder


class AccomodationManager():
    def __init__(self):
        self.distance_threshold = 20


        # get the path of current directory        
        self.root_folder_path = os.path.dirname(__file__)

        # read locations data
        dataset_file_path = self.root_folder_path + '/Accomodations/Information for Accommodation.csv'
        self.df_accomodations = pd.read_csv(dataset_file_path)

        
    
    def setAccomodationType(self, category):
        self.accomodation_type = category
    
    def setAccomodationLocation(self, cat):
        self.ref_lat, self.ref_long = cat[0], cat[1]
        self.district = cat[2]
        # print(cat_lat, cat_long)

    def getAccomodations(self):
        related_accomodations = self.df_accomodations[self.df_accomodations.Type == self.accomodation_type]
        recommended_accomodations = []
        for accomodation in range(related_accomodations.shape[0]):
            datarow = related_accomodations.iloc[accomodation]
            accom_lat, accom_long = datarow.Latitude, datarow.Longitude            
            distance_from_reference_loc = self.haversine(self.ref_lat, self.ref_long, accom_lat, accom_long)
            # print(datarow.Name, distance_from_reference_loc)

            if distance_from_reference_loc < self.distance_threshold:
                recommended_accomodations.append(datarow)
        
        recommended_accomodations = pd.DataFrame(recommended_accomodations, columns=self.df_accomodations.columns).sort_values("Grade", ascending=False)
        return recommended_accomodations
    
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
    
    def getAccomodationTypes(self):
        return self.df_accomodations[self.df_accomodations.District == self.district].Type.unique()