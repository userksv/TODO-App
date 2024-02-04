from dj_rest_auth.registration.views import RegisterView, LoginView
from allauth.account import app_settings
from .tasks import send_welcome_email_task

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status




# TODO use redis for storing token
# from dj_rest_auth.utils import default_create_token
# token created after login first login with credits, and saved to table authtoken_token


# dj_rest_auth automaticaly send verification email after registartion
# in this project I am not using this 
# custom_app_settings from allauth package
app_settings.EMAIL_VERIFICATION = 'none' # Don't auto send verification email during signup

class CustomRegisterView(RegisterView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = self.get_response_data(user)

        recipient = request.data['email']
        username = request.data['username']
        # send welcome email after registration (Celery task)
        send_welcome_email_task.delay(recipient, username)

        if data:
            response = Response(
                data,
                status=status.HTTP_201_CREATED,
                headers=headers,
            )            
        else:
            response = Response(status=status.HTTP_204_NO_CONTENT, headers=headers)

        return response
    

class CustomLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email
        })