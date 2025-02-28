# from django.shortcuts import render

# Create your views here.
# from rest_framework import generics
# from .models import Accommodation
# from .serializer import AccommodationSerializer



# class accommodation_list(generics.ListAPIView):
#   queryset = Accommodation.objects.all()
#   serializer_class = AccommodationSerializer
  

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from test.travelling_guide import TravelGuide
from test.travelling_guide_random import TravelGuideRandomPicker
import pandas as pd
import numpy as np

@api_view(['POST'])
def set_destination_category(request):
    if request.method == 'POST':
        category = request.data.get('category')
        guide = TravelGuide()
        guide.setDestinationCategory(category)
        category_locations = guide.getCategoryLocations()
        return Response({'category_locations': category_locations})

@api_view(['POST'])
def set_destination_location(request):
    if request.method == 'POST':
        location = request.data.get('location')
        guide = TravelGuide()
        guide.setCategoryLocation(location)
        return Response({'success': True})

@api_view(['POST'])
def set_area(request):
    if request.method == 'POST':
        location = request.data.get('location')
        category = request.data.get('category')
        guide = TravelGuide()
        guide.setDestinationCategory(category)
        print(location)
        guide.setCategoryLocation(location)
        response = guide.getAvailableAccomodationTypes()
        return Response(response)
    
def structure_response(data):
    response = {
        "destinations_picked": [],
        "destinations_recommended": [],
        "accommodations": [],
        "hospitals": [],
        "transportation": [],
        "police_stations": []
    }

    try:
        # Structure destinations
        for name, district, destination_type, rating, encoded_type in zip(data['picked']['Destination'], data['picked']['District'], data['picked']['Destination Type'], data['picked']['Rating'], data['picked']['Destination Type (encoded)']):
            response['destinations_picked'].append({
                "name": name,
                "district": district,
                "destination_type": destination_type,
                "rating": rating,
                "encoded_type": encoded_type
            })
        for name, district, destination_type, rating, encoded_type in zip(data['recommended']['Destination'], data['recommended']['District'], data['recommended']['Destination Type'], data['recommended']['Rating'], data['recommended']['Destination Type (encoded)']):
            response['destinations_recommended'].append({
                "name": name,
                "district": district,
                "destination_type": destination_type,
                "rating": rating,
                "encoded_type": encoded_type
            })
        # Structure accommodations
        for name, address, rooms, grade, district, in zip(data['accommodations']['Name'], data['accommodations']['Address'], data['accommodations']['Rooms'], data['accommodations']['Grade'], data['accommodations']['District']):
            if pd.isna(grade):  # Check if grade is NaN
                grade = 0
            response['accommodations'].append({
                "name": name,
                "address": address,
                "rooms": rooms,
                "grade": grade,
                "district": district,
            })

        # Structure hospitals
        for name, district, contact, in zip(data['hospitals']['Hospital'], data['hospitals']['District'], data['hospitals']['Contact ']):
            response['hospitals'].append({
                "name": name,
                "district": district,
                "contact": contact,
            })

        # Structure transportation
        for district, vehicle_type, name, contact, price, review in zip(data['transportation']['District'], data['transportation']['vehicle type'], data['transportation']['Name'], data['transportation']['Contact'], data['transportation']['price'], data['transportation']['review']):
            response['transportation'].append({
                "district": district,
                "vehicle_type": vehicle_type,
                "name": name,
                "contact": contact,
                "price": price,
                "review": review
            })

        # Structure police stations
        for province, division, police_station, contact in zip(data['police_stations']['Province'], data['police_stations']['Division'], data['police_stations']['Police Station'], data['police_stations']['Contact']):
            response['police_stations'].append({
                "province": province,
                "division": division,
                "police_station": police_station,
                "contact": contact,
            })

    except Exception as e:
        # Handle the exception gracefully
        error_message = f"An error occurred while structuring the response: {str(e)}"
        response['error'] = error_message
        # Log the error for further investigation
        print(error_message)

    return response

@api_view(['POST'])
def set_accommodation_category(request):
    if request.method == 'POST':
        first = request.data.get('first')
        third = request.data.get('third')
        guide = TravelGuide()
        second = request.data.get('second')
        guide.setDestinationCategory(first)
        guide.setCategoryLocation(second)
        guide.setAccomodationCategory(third)
        picked, recommended = guide.getRecommendedLocations()
        accommodations = guide.getRecommendedAccomodations()
        hospitals = guide.getRecommendedHospitals()
        police_stations = guide.getRecommendedPoliceStations()
        transportation = guide.getRecommendedTransportations()
        return Response(structure_response({'picked': picked, 'recommended': recommended, 'accommodations': accommodations, 'hospitals':hospitals,'transportation':transportation,'police_stations':police_stations}))
   


guide_picker = TravelGuideRandomPicker()

@api_view(['GET'])
def get_destinations(request):
    if request.method == 'GET':
        destinations = guide_picker.PickDestinations()
        # Convert DataFrame to JSON and return
        return Response(destinations.to_dict(orient='records'))

@api_view(['GET'])
def get_accommodations(request):
    if request.method == 'GET':
        guide_picker.setDestinationCountPerDistrict(8)
        guide_picker.setAccomodationCountPerDistrict(5)
        guide_picker.seTransportationCountPerDistrict(5)
        accommodations = guide_picker.PickAccomodations()
        accommodations = accommodations.drop(columns=['Longitude', 'Latitude'])
        accommodations = accommodations.where(pd.notnull(accommodations), None)
        # Convert DataFrame to JSON and return
        return Response(accommodations.to_dict(orient='records'))

@api_view(['GET'])
def get_hospitals(request):
    if request.method == 'GET':
        hospitals = guide_picker.PickHospitals()
        hospitals = hospitals.drop(columns=['Longitude', 'Latitude'])
        hospitals = hospitals.where(pd.notnull(hospitals), None)
        # Convert DataFrame to JSON and return
        return Response(hospitals.to_dict(orient='records'))

@api_view(['GET'])
def get_police_stations(request):
    if request.method == 'GET':
        police_stations = guide_picker.PickPoliceStations()
        police_stations = police_stations.drop(columns=['Longitude', 'Latitude'])
        police_stations = police_stations.where(pd.notnull(police_stations), None)
        # Convert DataFrame to JSON and return
        return Response(police_stations.to_dict(orient='records'))

@api_view(['GET'])
def get_transportations(request):
    if request.method == 'GET':
        transportations = guide_picker.PickTransportations()
        # transportations = transportations.drop(columns=['Longitude', 'Latitude'])
        transportations = transportations.where(pd.notnull(transportations), None)
        # Convert DataFrame to JSON and return
        return Response(transportations.to_dict(orient='records'))