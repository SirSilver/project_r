from django.conf import settings
from django.db import models
from django.urls import reverse


class BaseModel(models.Model):
    """Base model"""
    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse(f'{self.__name__}-detail', args=[str(self.id)])


class Dish(BaseModel):
    """Model contains description, recipe and set of ingredients"""
    name = models.CharField('Dish name', max_length=50)
    description = models.TextField('Dish description')
    recipe = models.TextField('Dish recipe')
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='dishes',
        related_query_name='dish',
        verbose_name='Creator of dish',
    )

    class Meta:
        verbose_name_plural = 'Dishes'


class Menu(BaseModel):
    """Model contains description and set of dishes"""
    name = models.CharField('Menu name', max_length=50)
    description = models.TextField('Menu description')
    dishes = models.ManyToManyField(
        Dish,
        blank=True,
        null=True,
        related_name='menus',
        related_query_name='menu',
        verbose_name='Dishes in menu',
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='menus',
        related_query_name='menu',
        verbose_name='Creator of menu',
    )

    def count_ingredients(self):
        """Return required quantity of ingredients for entire menu"""
        counted_ingredients = {}
        ingredients = []
        for dish in self.dishes.all():
            for ingredient in dish.ingredients.all():
                try:
                    counted_ingredients[ingredient.name] += ingredient.quantity
                except:
                    counted_ingredients[ingredient.name] = ingredient.quantity
        for name, quantity in counted_ingredients.items():
            ingredients.append({"name": name, "quantity": quantity})
        return ingredients


class Ingredient(BaseModel):
    """Model of required quantity of ingredient for dish"""
    name = models.CharField(verbose_name='Ingredient name', max_length=50)
    quantity = models.FloatField(verbose_name='Required quantity of ingredient for dish')
    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE,
        related_name="ingredients",
        related_query_name='ingredient',
        verbose_name='Dish required this ingredient',
    )
