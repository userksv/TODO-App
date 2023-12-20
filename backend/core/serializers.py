from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'text', 'created']
    
    def create(self, validated_data):
        """
        Create and return a new `Task` instance, given the validated data.
        """
        return Task.objects.create(**validated_data)
    
    