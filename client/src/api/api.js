import { api } from "./axiosInstance";

export const register = async (data) => api.post("/user/register/", data);

export const login = async (data) => api.post("/user/login/", data);

export const getUser = async () => api.get("/user/user/");

export const logout = async () => api.post("/user/logout/");

export const updateUserPreference = async (data) =>
  api.put("/user/update-answers/", data);

export const updateUserUsingRecommendations = async (data) =>
  api.put("/user/update-recommendation/", data);

export const getDestinations = async (data) =>
  api.post("/trips/accommodations/get-destination-category/", data);

export const getRecommendations = async (data) =>
  api.post("/trips/accommodations/set-accommodation-category/", data);

export const getAccommodations = async (data) =>
  api.post("/trips/accommodations/set-accommodation-location/", data);

export const getRandomDestinations = async () =>
  api.get("/trips/unregisterd-user/destination/");

export const getRandomAccommodations = async () =>
  api.get("/trips/unregisterd-user/accommodation/");

export const getRandomTransportation = async () =>
  api.get("/trips/unregisterd-user/transportation/");
