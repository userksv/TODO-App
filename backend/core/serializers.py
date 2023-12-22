from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from django.shortcuts import redirect

class UserSerializer(serializers.ModelSerializer):
    # because 'tasks' is a `reverse` relationship on the User model, it will not be included dy default when using the
    # ModelSerializer class, so we needed to add an explicit field for it.
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all()) # getting 'tasks' for user

    class Meta:
        model = User
        fields = ['id', 'username', 'tasks']


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    # addig 'owner' field
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Task
        fields = ['id', 'url', 'title', 'description', 'completed', 'owner', 'created']
    
    def create(self, validated_data):
        """
        Create and return a new `Task` instance, given the validated data.
        """
        return Task.objects.create(**validated_data)
    