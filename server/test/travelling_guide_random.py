import numpy as np
import pandas as pd
import os
import random
import math

class TravelGuideRandomPicker():
    def __init__(self):
        self.destination_per_district = 10
        self.accomodations_per_district = 10
        self.hospitals_per_district = 10
        self.police_stations_per_district = 10
        self.transportations_per_district = 10

        self.root_folder_path = os.path.dirname(__file__)
    
        self.df_destinations = pd.read_csv(self.root_folder_path + '/Destinations/Unique destinations.csv')
        self.df_accomodations = pd.read_csv(self.root_folder_path + '/Accomodations/Information for Accommodation.csv')
        self.df_hospitals = pd.read_csv(self.root_folder_path + '/Hospitals/Hospitals.csv')
        self.df_police_stations = pd.read_csv(self.root_folder_path + '/Police Stations/Police stations.csv')
        self.df_transportations = pd.read_csv(self.root_folder_path + '/Transportations/Transportations.csv')
    
    def setDestinationCountPerDistrict(self, count):
        self.destination_per_district = count
    
    def setAccomodationCountPerDistrict(self, count):
        self.accomodations_per_district = count

    def setHospitalCountPerDistrict(self, count):
        self.hospitals_per_district = count
    
    def setPoliceStationCountPerDistrict(self, count):
        self.police_stations_per_district = count

    def seTransportationCountPerDistrict(self, count):
        self.transportations_per_district = count
    

    
    def randomItems(self, df, count, category_column, districts=None):
        unique_categories = df[category_column].unique()

        if districts is None:
            unique_districts = df.District.unique()
        else:
            unique_districts = districts
        

        minimum_items_per_category = count // unique_categories.shape[0]

        picked_items = []
        for district in unique_districts:
            idx = []
            df_district = df[df.District == district]
            for cat_id in range(unique_categories.shape[0]):
                category = unique_categories[cat_id]
                df_district_category = df_district[df_district[category_column] == category]

                if df_district_category.shape[0] == 0:
                    continue
                else:
                    if minimum_items_per_category > df_district_category.shape[0]:
                        random_idx = random.sample(range(0, df_district_category.shape[0]), df_district_category.shape[0])
                    else:
                        samples = minimum_items_per_category
                        random_idx = random.sample(range(0, df_district_category.shape[0]), samples)

                    picked_data_rows = df_district_category.iloc[random_idx]
                    picked_items.extend(picked_data_rows.to_numpy())
                    idx.extend(picked_data_rows.index.to_numpy())

                    remaining_items_count = count - len(idx)

            while remaining_items_count > 0:
                if len(idx) >= df_district.shape[0]:
                    break
                random_id = np.random.randint(0, df_district.shape[0])
                if random_id in idx:
                    continue
                else:
                    picked_items.append(df_district.iloc[random_id])
                    idx.append(random_id)
                remaining_items_count -= 1
            
        picked_items = pd.DataFrame(picked_items, columns=df.columns)
        return picked_items

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

    
    def PickDestinations(self):
        self.picked_destinations = self.randomItems(self.df_destinations, self.destination_per_district, "Destination Type")
        return self.picked_destinations
    
    def PickAccomodations(self):
        self.PickDestinations()
        self.picked_accomodations = self.randomItems(self.df_accomodations, self.accomodations_per_district, "Type", districts=self.picked_destinations.District.unique())
        return self.picked_accomodations
    
    def PickHospitals(self):
        self.PickDestinations()
        idx = []
        for id in range(self.picked_destinations.shape[0]):
            data_row = self.picked_destinations.iloc[id]
            dest_lat, dest_long = data_row.Latitude, data_row.Longitude
            distances = self.df_hospitals.apply(lambda row: self.haversine(row['Latitude'], row['Longitude'], dest_lat, dest_long), axis=1)
            
            sorted_idx = np.argsort(distances)
            if not sorted_idx[0] in idx:
                idx.append(sorted_idx[0])

        picked_hospitals = self.df_hospitals.iloc[idx]
        return picked_hospitals

    def PickPoliceStations(self):
        self.PickDestinations()
        idx = []
        for id in range(self.picked_destinations.shape[0]):
            data_row = self.picked_destinations.iloc[id]
            dest_lat, dest_long = data_row.Latitude, data_row.Longitude
            distances = self.df_police_stations.apply(lambda row: self.haversine(row['Latitude'], row['Longitude'], dest_lat, dest_long), axis=1)
            
            sorted_idx = np.argsort(distances)
            if not sorted_idx[0] in idx:
                idx.append(sorted_idx[0])

        picked_hospitals = self.df_police_stations.iloc[idx]
        return picked_hospitals

    def PickTransportations(self):
        self.PickDestinations()
        unique_districts = self.picked_destinations.District.unique()

        picked_transportations = []
        idx = []
        for district in unique_districts:
            df_district = self.df_transportations[self.df_transportations.District == district]

            if df_district.shape[0] == 0:
                continue
            else:
                if self.transportations_per_district > df_district.shape[0]:
                    random_idx = random.sample(range(0, df_district.shape[0]), df_district.shape[0])
                else:
                    samples = self.transportations_per_district
                    random_idx = random.sample(range(0, df_district.shape[0]), samples)

                picked_data_rows = df_district.iloc[random_idx]
                picked_transportations.extend(picked_data_rows.to_numpy())
                idx.extend(picked_data_rows.index.to_numpy())
        
        picked_transportations = pd.DataFrame(picked_transportations, columns=df_district.columns)
        return picked_transportations
        

if __name__ == "__main__":
    guide_picker = TravelGuideRandomPicker()

    guide_picker.setDestinationCountPerDistrict(8)
    guide_picker.setAccomodationCountPerDistrict(5)
    guide_picker.seTransportationCountPerDistrict(5)

    picked_destinations = guide_picker.PickDestinations()
    picked_accomodations = guide_picker.PickAccomodations()
    picked_hospitals = guide_picker.PickHospitals()
    picked_police_stations = guide_picker.PickPoliceStations()
    picked_transportations = guide_picker.PickTransportations()

    print("Picked destinations: ", picked_destinations)
    print("Picked accomodations: ", picked_accomodations)
    print("Picked hospitals: ", picked_hospitals)
    print("Picked police stations: ", picked_police_stations)
    print("Picked transportations: ", picked_transportations)