from django.conf import settings
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from ration.models import Dish
from ration.serializers import DishSerializer


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'email', 'password', 'dishes', 'menus']
        read_only_fields = ['id', 'dishes', 'menus']
        extra_kwargs = {
            'password': {'write_only': True},
        }


class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
