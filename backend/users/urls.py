from django.urls import path, include
from rest_framework import routers
from .views import CustomUserViewset


router = routers.DefaultRouter()
router.register(r'users', CustomUserViewset)

urlpatterns = [
    path('', include(router.urls))
]
