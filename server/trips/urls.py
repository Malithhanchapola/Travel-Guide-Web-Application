from django.contrib import admin
from django.urls import path
from .views import set_destination_category, set_accommodation_category, get_accommodations, get_destinations, get_transportations, get_hospitals, get_police_stations, set_area

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accommodations/', accommodation_list.as_view(), name="accommodation-list"),
    path('accommodations/get-destination-category/', set_destination_category, name="get-destination-category"),

    path('accommodations/set-accommodation-category/', set_accommodation_category, name="set-accommodation-category"),
    
    path('accommodations/set-accommodation-location/', set_area, name="set-area"),

    path('unregisterd-user/transportation/', get_transportations, name="get-random-transportation"),

    path('unregisterd-user/destination/', get_destinations, name="get-random-destination"),

    path('unregisterd-user/accommodation/', get_accommodations, name="get-random-accommodation"),
    
    path('unregisterd-user/police/', get_police_stations, name="get-random-destination"),

    path('unregisterd-user/hospital/', get_hospitals, name="get-random-accommodation"),
]
