from django.contrib import admin
from django.urls import path, include
from rest_framework import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

# LOGOUT DOES NOT WORK
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')), # login logout
]