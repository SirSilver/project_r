from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ration.models import Dish, Menu
from ration.serializers import DishSerializer, MenuSerializer
from .models import CustomUser
from .permissions import IsStaffOrTargetUser
from .serializers import CustomUserSerializer


class CustomUserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = AllowAny

    def get_object(self, queryset=None):
        """Return current user"""
        return self.request.user

    def get_permissions(self):
        """Allow non-authenticated user to create via POST"""
        return (AllowAny() if self.request.method == 'POST' else IsStaffOrTargetUser()),

    @action(methods=['get'], detail=True, serializer_class=DishSerializer)
    def dishes(self, request, pk=None):
        """Dishes created by user"""
        dishes = Dish.objects.filter(created_by=pk)
        serializer = self.get_serializer(dishes, many=True)
        return Response(serializer.data)


    @action(methods=['get'], detail=True, serializer_class=MenuSerializer)
    def menus(self, request, pk=None):
        """Dishes created by user"""
        menus = Menu.objects.filter(created_by=pk)
        serializer = self.get_serializer(menus, many=True)
        return Response(serializer.data)


    @action(methods=['get'], detail=True)
    def get(self, request):
        """Get request.user"""
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)
