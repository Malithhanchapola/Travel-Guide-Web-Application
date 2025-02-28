# import required libraries
from .locations_manager import LocationManager
from .accomodation_manager import AccomodationManager
from .hospital_manager import HospitalManager
from .police_stations_manager import PoliceStationManager
from .transportations_manager import TransportationManager

# class for handling the guide
class TravelGuide():
    '''
    This class is for handling the guides with locations and accomodations    
    '''
    def __init__(self):
        self.location_manager = LocationManager()
        self.accomodation_manager = AccomodationManager()
        self.hospital_manager = HospitalManager()
        self.police_station_manager = PoliceStationManager()
        self.transportation_manager = TransportationManager()

        # print(self.location_manager.categories)
        # self.location_manager.setCategory("Beach paradise")
    
    def setDestinationCategory(self, cat):
        self.location_manager.setCategory(cat)

    def getCategoryLocations(self):
        return self.location_manager.getLocationsForCategory()

    def setCategoryLocation(self, loc):
        self.category_location = self.location_manager.setLocation(loc)
        self.accomodation_manager.setAccomodationLocation(self.category_location)

    def getRecommendedLocations(self):
        return self.location_manager.getDestinationLocations()
    
    def setAccomodationCategory(self, cat):
        self.accomodation_manager.setAccomodationType(cat)

    def getRecommendedAccomodations(self):
        return self.accomodation_manager.getAccomodations()
    
    def getRecommendedHospitals(self):
        return self.hospital_manager.getHospitals(self.category_location)

    def getRecommendedPoliceStations(self):
        return self.police_station_manager.getPoliceStations(self.category_location)

    def getRecommendedTransportations(self):
        return self.transportation_manager.getTransportations(self.category_location)
    def getAvailableAccomodationTypes(self):
        return self.accomodation_manager.getAccomodationTypes()
        
if __name__ == "__main__":
    guide = TravelGuide()
    guide.setDestinationCategory("Beach paradise")
    # print(guide.getCategoryLocations())
    guide.setCategoryLocation("Unawatuna Beach")
    picked, recommended = guide.getRecommendedLocations()
    #edited 9.45
    available_accomodation_types = guide.getAvailableAccomodationTypes()
    guide.setAccomodationCategory("Bangalows")
    accomodations = guide.getRecommendedAccomodations()
    hospitals = guide.getRecommendedHospitals()
    police_stations = guide.getRecommendedPoliceStations()
    transportations = guide.getRecommendedTransportations()

    print("picked: ", picked)
    print("recommended: ", recommended)
    print("accomodations: ", accomodations)
    print("hospitals: ", hospitals)
    print("police stations: ", police_stations)
    print("transportations: ", transportations)
