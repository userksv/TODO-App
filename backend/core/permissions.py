from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """"
    Custom permission to only allow owner of an object to edit and view it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the task.
        return obj.owner == request.user