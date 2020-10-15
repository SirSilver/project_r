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

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(password)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
