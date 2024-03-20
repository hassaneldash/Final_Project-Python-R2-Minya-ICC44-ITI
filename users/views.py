import uuid
from django.shortcuts import render
from rest_framework import generics,viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


class UserList(APIView):
    def get(self, request):
        email = request.query_params.get("email", None)
        password = request.query_params.get("password", None)

        if email and password:
            users = User.objects.filter(email=email, password=password)
        elif email:
            users = User.objects.filter(email=email)
        else:
            users = User.objects.all()

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        id = request.query_params.get("id", None)
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        else:
            email = request.query_params.get("email", None)
            if email:
                user = User.objects.filter(email=email).first()
                if user:
                    serializer = UserSerializer(user, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    return Response(
                        serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "Id or Email parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request):
        id = request.query_params.get("id", None)
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                user.delete()
                return Response({"message": "User deleted successfully"})
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        else:
            email = request.query_params.get("email", None)
            if email:
                user = User.objects.filter(email=email).first()
                if user:
                    user.delete()
                    return Response({"message": "User deleted successfully"})
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "Id or Email parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ValidateSessionView(APIView):
    def post(self, request):
        session_token = request.data.get('session_token')
        user = User.objects.filter(session_token=session_token).first()
        if user:
            return Response({'message': 'Session is valid'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid session token'}, status=status.HTTP_401_UNAUTHORIZED)


# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = User.objects.filter(email=email, password=password).first()
#         if user:
#             user.session_token = uuid.uuid4()
#             user.save()
#             return Response({'session_token': str(user.session_token)}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        session_token = request.data.get('session_token')
        user = User.objects.filter(session_token=session_token).first()
        if user:
            user.session_token = None
            user.save()
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid session token'}, status=status.HTTP_400_BAD_REQUEST)

# class FetchUserRoleView(APIView):
#     def get(self, request):
#         session_token = request.headers.get('Authorization').split(' ')[1]  # Assuming the session token is sent in the Authorization header
#         user = User.objects.filter(session_token=session_token).first()
#         if user:
#             return Response({'role': user.role}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid session token'}, status=status.HTTP_401_UNAUTHORIZED)
# views.py


@csrf_exempt
def login(request):
    if request.method == 'POST':
        session_token = request.headers.get('Authorization')
        if session_token:
            user = User.objects.filter(session_token=session_token).first()
            if user:
                return JsonResponse({'role': user.role})
    return JsonResponse({'error': 'Unauthorized'}, status=401)


@csrf_exempt
def validate_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.filter(email=email, password=password).first()
        if user:
            user.session_token = uuid.uuid4()  # Generate session token
            print(user.session_token)
            user.save()
            return JsonResponse({'session_token': str(user.session_token), 'role': user.role})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

