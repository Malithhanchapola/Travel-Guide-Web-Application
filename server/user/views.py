from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class UpdateUserAnswers(APIView):
  permission_classes = (permissions.AllowAny,)

  def put(self, request):
        email = request.data.get('email')
        first_answer = request.data.get('first_answer')
        second_answer = request.data.get('second_answer')
        third_answer = request.data.get('third_answer')

        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            raise NotFound("User not found.")

        user.first_answer = first_answer
        user.second_answer = second_answer
        user.third_answer = third_answer
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateIsUsingRecommendations(APIView):
  permission_classes = (permissions.AllowAny,)

  def put(self, request):
    email = request.data.get('email')
    isUsingRecommendation = request.data.get("is_using_recommendation")
    
    UserModel = get_user_model()
    try:
      user = UserModel.objects.get(email=email)
    except UserModel.DoesNotExist:
      raise NotFound("User not found.")

    user.is_using_recommendations = isUsingRecommendation
    user.save()

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

# @method_decorator(csrf_exempt, name='dispatch')
class GetUserDetails(APIView):
  permission_classes = (permissions.AllowAny,)
  
  def post(self, request):
      email = request.data.get('email')
      if email:
          try:
              user = get_user_model().objects.get(email=email)
              serializer = UserSerializer(user)
              return Response(serializer.data, status=status.HTTP_200_OK)
          except get_user_model().DoesNotExist:
              return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
      else:
          return Response({"error": "Email not provided."}, status=status.HTTP_400_BAD_REQUEST)