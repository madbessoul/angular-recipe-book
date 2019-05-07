import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Mac and Chesse 1',
      'Well mac and cheese with Bacon',
      'https://www.thechunkychef.com/wp-content/uploads/2016/12/Family-Favorite-Baked-Mac-and-Cheese-20.jpg',
      [
        new Ingredient('Bacon', 1),
        new Ingredient('Bread', 1)
      ]
    ),
    new Recipe(
      'Mac and Cheese 2',
      'Mac and Chesse and Crème Fraîche',
      'https://www.thechunkychef.com/wp-content/uploads/2016/12/Family-Favorite-Baked-Mac-and-Cheese-20.jpg',
      [
        new Ingredient('Macaroni', 2),
        new Ingredient('Cheese', 20),
        new Ingredient('Crème Fraîche', 1)
      ]
    ),
    new Recipe(
      'Mac and Chesse 3',
      'Well mac and cheese and Parmesan',
      'https://www.thechunkychef.com/wp-content/uploads/2016/12/Family-Favorite-Baked-Mac-and-Cheese-20.jpg',
      [
        new Ingredient('Macaroni', 3),
        new Ingredient('Cheese', 30),
        new Ingredient('Parmesan', 2)
      ]
    )];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes()  {
      return this.recipes.slice();
    }

    getRecipeById(index: number) {
      return this.recipes.slice()[index];
    }

    AddIngredientsToShoppingList(ingredients: Ingredient[])  {
      this.shoppingListService.addIngredients(ingredients);
    }
}
