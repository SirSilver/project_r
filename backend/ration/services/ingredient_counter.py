def count_ingredients(ingredient_list):
    """Return dictionary with numbers of each ingredient"""
    counted_ingredients = {}
    counted_list = []

    for ingredient in ingredient_list:
        try:
            counted_ingredients[ingredient.name.lower()] += ingredient.quantity
        except:
            counted_ingredients[ingredient.name.lower()] = ingredient.quantity

    for name, quantity in counted_ingredients.items():
        counted_list.append({'name': name, 'quantity': quantity})

    return counted_list
