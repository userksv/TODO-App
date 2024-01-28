# from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView
# from dj_rest_auth.views import LoginView, LogoutView,UserDetailsView
from django.urls import path
from dj_rest_auth.urls import urlpatterns as auth_urls
from dj_rest_auth.registration.urls import urlpatterns as registration_urls
from . import views
urlpatterns = [
    path('', views.CustomRegisterView.as_view(), name='rest_register'),
    path('login/', views.CustomLoginView.as_view(), name='rest_login'),
    # path('login/', views.CustomAuthToken.as_view(), name='rest_login')
]
urlpatterns += auth_urls
# urlpatterns += registration_urls



# Following this tutorial https://testdriven.io/blog/django-rest-auth/
# urlpatterns = [
#     # URLs that do not require a session or valid token
#     # path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
#     # path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
#     path('login/', LoginView.as_view(), name='rest_login'),
#     # URLs that require a user to be logged in with a valid session / token.
#     path('logout/', LogoutView.as_view(), name='rest_logout'),
#     path('user/', UserDetailsView.as_view(), name='rest_user_details'),
#     path('', RegisterView.as_view(), name='rest_register'),
#     path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
#     path('resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
# ]