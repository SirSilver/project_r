from rest_framework import generics, permissions, viewsets
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.decorators import action, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from io import BytesIO
from PIL import Image
from .models import Ingredient, Dish, Menu
from .serializers import IngredientSerializer, DishSerializer, MenuIngredientsSerializer, MenuSerializer
from .permissions import IsOwnerOrReadOnly


class DishViewSet(viewsets.ModelViewSet):
    """API endpoint that allows dishes to be viewed or edited"""
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['post'], detail=True)
    @parser_classes((FormParser, MultiPartParser))
    def set_image(self, request, pk=None):
        """Set image for dish"""
        if 'image' in request.data:
            self.object = self.get_object()
            self.object.image.delete()
            image = request.data['image']
            resized_image = Image.open(request.data['image'])
            resized_image = resized_image.resize((1099, 618))
            buffer = BytesIO()
            resized_image.save(buffer, format='JPEG')
            self.object.image.save(image.name, buffer)

            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

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
        print(request.data)
        for dish_id in request.data:
            self.get_object().dishes.add(Dish.objects.get(pk=dish_id))
            print('DISHES', self.get_object().dishes.all())
        return Response('Dishes were added')

    @action(methods=['post'], detail=True)
    def remove_dish(self, request, pk=None):
        """Remove dishes from menu"""
        menu = Menu.objects.get(pk=pk)
        for dish_id in request.data:
            menu.dishes.remove(Dish.objects.get(pk=dish_id))
        return Response('Dishes were removed')
