from dj_rest_auth.registration.views import RegisterView, LoginView
from allauth.account import app_settings
from .tasks import send_welcome_email_task

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response



# TODO use redis for storing token
# from dj_rest_auth.utils import default_create_token
# token created after login first login with credits, and saved to table authtoken_token


# dj_rest_auth automaticaly send verification email after registartion
# in this project I am not using this 
# custom_app_settings from allauth package
app_settings.EMAIL_VERIFICATION = 'none' # Don't auto send verification mails during signup

class CustomRegisterView(RegisterView):
    def create(self, request, *args, **kwargs):
        # send welcome email after registration Celery task
        recipient = request.data['email']
        username = request.data['username']
        send_welcome_email_task.delay(recipient, username)
        return super().create(request, *args, **kwargs)


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