from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics

class TaskList(generics.ListCreateAPIView):
    """"
     List all tasks, or create a new task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete tasks.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer













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
