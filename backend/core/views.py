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
    def get_queryset(self, *args, **kwargs):
        return Task.objects.all().filter(owner=self.request.user)
    
    # queryset = Task.objects.all() # this allows not auth users read all tasks
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
    
    def put(self, request, *args, **kwargs):
        kwargs['partial'] = True 
        return self.update(request, *args, **kwargs)


################################################################
"""
 Get back to this later.
    1. How to store token in Redis? copy from django DB? or create new?
        dj_rest_auth by default stores token in `authtoken_token` table

"""
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.core.cache import cache

# class ExampleView(APIView, TokenAuthentication):
#     # authentication_classes = TokenAuthentication
#     # permission_classes = [IsAuthenticated]

#     def get_model(self):
#             if self.model is not None:
#                 return self.model
#             from rest_framework.authtoken.models import Token
#             return Token
    
#     def get(self, request, fromat=None):
#         model = self.get_model()
#         print(model)
#         return Response("model")
        



#         #  # Set a value into the cache
#         # cache.set('my_key', 'my_value', 300)  # Cache for 300 seconds

#         # # Get a value from the cache
#         # my_value = cache.get('my_key')

#         # # content = {
#         # #     'user': str(request.user), # django.contrib.auth.User instance
#         # #     'auth': str(request.auth), # None
#         # # }
#         # return Response(my_value)
    

    
# class RedisTokenAuthentication(TokenAuthentication):
#     def get_model(self):
#         return self.model

#     def authenticate_credentials(self, key):
#         # Check if the token is present in Redis
#         user = cache.get(key)
#         if user is None:
#             # If not in Redis, fall back to the default TokenAuthentication behavior
#             return super().authenticate_credentials(key)

#         return user, None