from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Ingredient, Dish, Menu
from .serializers import IngredientSerializer, DishSerializer, MenuIngredientsSerializer, MenuSerializer
from .services import ingredient_counter
from .permissions import IsOwnerOrReadOnly


class DishViewSet(viewsets.ModelViewSet):
    """API endpoint that allows dishes to be viewed or edited"""
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['get'], detail=True, serializer_class=IngredientSerializer)
    def ingredients(self, request, pk=None):
        """List of ingredients for this dish"""
        serializer = self.get_serializer(self.get_object().ingredients, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, serializer_class=MenuSerializer)
    def menus(self, request, pk=None):
        """List of menus contain this dish"""
        serializer = self.get_serializer(self.get_object().menus, many=True)
        return Response(serializer.data)


class IngredientViewSet(viewsets.ModelViewSet):
    """API endpoint that allows ingredients to be viewed or edited"""
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class MenuViewSet(viewsets.ModelViewSet):
    """API endpoint that allows menus to be viewed or edited"""
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['get'], detail=True, serializer_class=DishSerializer)
    def dishes(self, request, pk=None):
        """List of dishes in this menu"""
        serializer = self.get_serializer(self.get_object().dishes, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def ingredients(self, request, pk=None):
        """List of all ingredients for dishes in this menu"""
        return Response(self.get_object().count_ingredients())

    @action(methods=['get'], detail=True, serializer_class=DishSerializer)
    def add_dish(self, request, pk=None):
        """List of dishes that not in menu"""
        dish_list = Dish.objects.exclude(menu=pk)
        serializer = self.get_serializer(dish_list, many=True)
        return Response(serializer.data)

    @add_dish.mapping.post
    def add_dish_to_menu(self, request, pk=None):
        """Add dishes to menu"""
        for dish_id in request.data:
            self.get_object().dishes.add(Dish.objects.get(pk=dish_id))
        return Response('Dishes were added')

    @action(methods=['post'], detail=True)
    def remove_dish(self, request, pk=None):
        """Remove dishes from menu"""
        menu = Menu.objects.get(pk=pk)
        for dish_id in request.data:
            menu.dishes.remove(Dish.objects.get(pk=dish_id))
        return Response('Dishes were removed')
