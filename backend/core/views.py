from .models import Task
from .serializers import TaskSerializer
from core.permissions import IsOwner
from rest_framework import generics
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    """ Endpoit for api root """
    return Response({
        'tasks': reverse('task-list', request=request, format=format),
    })

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
        print(self.request.user)
        serializer.save(owner=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete tasks.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
