from rest_framework import serializers
from .models import Ingredient, Dish, Menu


class BaseSerializerWithOwner(serializers.HyperlinkedModelSerializer):
    """Base serializer with auto assigning user from request to created_by field"""
    created_by = serializers.ReadOnlyField(source='created_by.username')

    def create(self, validated_data):
        """Assign current user on creating"""
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['url', 'id', 'name', 'quantity', 'dish']


class DishSerializer(BaseSerializerWithOwner):
    class Meta:
        model = Dish
        fields = ['url', 'id', 'name', 'description', 'recipe', 'ingredients', 'menus', 'created_by']
        read_only_fields = ['ingredients', 'menus', 'created_by']


class MenuSerializer(BaseSerializerWithOwner):
    class Meta:
        model = Menu
        fields = ['url', 'id', 'name', 'description', 'dishes', 'created_by']
        read_only_fields = ['dishes', 'created_by']


class MenuIngredientsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'quantity']
