from django.urls import path
from core import views

urlpatterns = [
    path('', views.api_root),
    path('tasks/', views.TaskList.as_view(), name='task-list'),
    path('task/create', views.TaskCreate.as_view(), name='task-create'),
    path('task/<int:pk>', views.TaskDetail.as_view(), name='task-detail'),
    path('task/<int:pk>/update', views.TaskUpdate.as_view(), name='task-update'),
    path('task/<int:pk>/patch', views.TaskPatch.as_view(), name='task-patch'),
    path('task/<int:pk>/delete', views.TaskDelete.as_view(), name='task-delete'),
]