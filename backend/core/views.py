from .models import Task
from .serializers import TaskSerializer
from core.permissions import IsOwner
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions



class TaskList(generics.ListCreateAPIView):
    """
     List all tasks, or create a new task.
    """
    # Enable in production
    # Show only owners 'tasks' 
    # def get_queryset(self, *args, **kwargs):
    #     return Task.objects.all().filter(owner=self.request.user)
    
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # The create() method of our serializer will now be passed an additional 'owner' field,
    # along with the validated data from the request.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete tasks.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]











# @csrf_exempt # for learning purposes
# def task_list(request):
#     """"
#     List all tasks, or create a new task.
#     """
#     if request.method == 'GET':
#         tasks = Task.objects.all() # change for auth user
#         serializer = TaskSerializer(tasks, many=True)
#         return JsonResponse(serializer.data, safe=False) # safe=False - accepts any python data types
    
#     elif request.method == 'POST':
#         print(request)
#         data = JSONParser().parse(request)
#         print(data)
#         serializer = TaskSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
    
# @csrf_exempt
# def task_detail(request, pk):
#     """
#     Retrieve, update or delete tasks.
#     """
#     try:
#         task = Task.objects.get(pk=pk)
#     except Task.DoesNotExist:
#         return HttpResponse(status=404)
    
#     if request.method == 'GET':
#         serializer = TaskSerializer(task)
#         return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         serializer = TaskSerializer(task, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
    
#     elif request.method == 'DELETE':
#         task.delete()
#         return HttpResponse(status=204)
