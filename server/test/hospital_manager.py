import numpy as np
import pandas as pd
import os
import math


class HospitalManager():
    def __init__(self):
        # get the path of current directory        
        self.root_folder_path = os.path.dirname(__file__)

        # read locations data
        dataset_file_path = self.root_folder_path + '/Hospitals/Hospitals.csv'
        self.df_hospitals = pd.read_csv(dataset_file_path, index_col="id")
    
    def getHospitals(self, loc):
        ref_lat, ref_long = loc[0], loc[1]

        district_hospitals = self.df_hospitals[self.df_hospitals.District == loc[2]]
        return district_hospitals
    
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

