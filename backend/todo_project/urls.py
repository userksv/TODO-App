from django.contrib import admin
from django.urls import path, include
from dj_rest_auth import urls


urlpatterns = [
    path('', include('core.urls')),
    path('auth/', include('auth.urls')),
    path('admin/', admin.site.urls),
]
