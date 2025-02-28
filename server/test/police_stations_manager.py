import numpy as np
import pandas as pd
import os
import math


class PoliceStationManager():
    def __init__(self):
        self.distance_threshold = 20

        # get the path of current directory        
        self.root_folder_path = os.path.dirname(__file__)

        # read locations data
        dataset_file_path = self.root_folder_path + '/Police Stations/Police stations.csv'
        self.df_police_stations = pd.read_csv(dataset_file_path, index_col="id")
    
    def getPoliceStations(self, loc):
        ref_lat, ref_long = loc[0], loc[1]

        police_stations_distances = {}
        for id in range(self.df_police_stations.shape[0]):
            data_row = self.df_police_stations.iloc[id]
            lat, long = data_row.Latitude, data_row.Longitude
            distance = self.haversine(ref_lat, ref_long, lat, long)
            police_stations_distances[distance] = data_row

        recommended_police_stations = []
        sorted_distances = sorted(police_stations_distances.keys())

        if sorted_distances[0] > self.distance_threshold:
            recommended_police_stations = [police_stations_distances[min(sorted_distances)]]
        else:
            for d in sorted_distances:
                if d < self.distance_threshold:
                    recommended_police_stations.append(police_stations_distances[d])
                else:
                    break
        recommended_police_stations = pd.DataFrame(recommended_police_stations, columns=self.df_police_stations.columns)
        return recommended_police_stations

    def haversine(self, lat1, lon1, lat2, lon2):
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
