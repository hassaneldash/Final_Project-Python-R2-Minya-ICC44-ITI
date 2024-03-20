from .models import User, Activation
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import  redirect, get_object_or_404, reverse
from django.http import HttpResponse
from rest_framework.response import Response
from .models import (
    Activation,
)
from rest_framework.decorators import api_view
import jwt
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta



##################### generate jwt token which carries the information of the user login ##########################

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()
    if not user or not user.password == password:
        return Response({'error': 'Wrong email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return Response({'error': 'Please activate your account'}, status=status.HTTP_401_UNAUTHORIZED)


    payload = {
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'role':user.role,
        'password' : user.password,
    }

    token = jwt.encode(payload, 'secret_key', algorithm='HS256')
    return Response({'success': 'Authentication successful', 'token': token}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def all_users(request):
    if request.method == 'GET':
        all_users = User.objects.all()
        users_serializer = UserSerializer(all_users, many=True)
        return Response(users_serializer.data)
    
    elif request.method == 'POST':
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            activation = Activation.objects.create(
                user=user,
                expires_at=timezone.now() + timedelta(hours=168)
            )
            activation_url = request.build_absolute_uri(
                reverse('activate', args=[str(activation.token)])
            )
            send_mail(
                'Activate your account',
                f'Please click the link below to activate your account:\n{activation_url}',
                'noreply@example.com',
                [user.Email],
                fail_silently=False,
            )
            response_data = user_serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def activate(request, token):
    activation = get_object_or_404(Activation, token=token)

    if activation.is_expired():
        activation.delete()
        return HttpResponse("Activation link has expired")
    else:
        user = activation.user
        user.is_active = True
        user.save()
        activation.delete()
        return redirect('http://localhost:3000/signin')


@api_view(['GET', 'PUT', 'DELETE'])
def one_user(request, id):
    one_user = User.objects.all().get(pk=id)
    if request.method == 'GET':
        ONe_User_Ser = UserSerializer(one_user, many=False)
        return Response(ONe_User_Ser.data)
    elif request.method == 'PUT':
        one_ser = UserSerializer(
            data=request.data, instance=one_user, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            payload = {
                    'user_id': one_user.pk,
                    'email': one_user.Email,
                    'first_name': one_user.FullName,
                    'role':one_user.role,
                    'Password' : one_user.Password,
                    'age' : one_user.age,
                }
                
            token = jwt.encode(payload, 'secret_key', algorithm='HS256')
            response_data = {
                'user': one_ser.data,
                'token': token
            }

            return Response(response_data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        
        one_user.delete()
        return Response(status=status.HTTP_202_ACCEPTED)