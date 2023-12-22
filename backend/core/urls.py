from django.urls import path
from core import views

urlpatterns = [
    path('', views.api_root),
    path('tasks/', views.TaskList.as_view(), name='task-list'),
    path('tasks/<int:pk>', views.TaskDetail.as_view(), name='task-detail'),

]