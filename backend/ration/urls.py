from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'dishes', views.DishViewSet)
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'menus', views.MenuViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
