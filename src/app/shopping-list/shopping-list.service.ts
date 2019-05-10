import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/subject';

export class ShoppingListService {

  IngredientsChanged = new Subject<Ingredient[]>();
  StartedEditingIngredient = new Subject<number>();

  private aIngredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Potato', 5),
    new Ingredient('Tomato', 2),
    new Ingredient('Bacon', 10)];

  // Add ingredient in the Shopping List manually
  addIngredient(ingredient: Ingredient) {
    let bFound = false;
    for (const ing of this.aIngredients) {
      if (ingredient.name === ing.name) {
        ing.amount = ing.amount + ingredient.amount;
        this.IngredientsChanged.next(this.aIngredients.slice());
        bFound = true;
      }
    }
    if (!bFound) {
      this.aIngredients.push(ingredient);
      this.IngredientsChanged.next(this.aIngredients.slice());
    }
  }

  // Add ingredients of a recipe to the Shopping List
  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
      // this.aIngredients.push(...ingredients);
    }
  }

  updateIngredient(index: number, ingredient: Ingredient)  {
    this.aIngredients[index] = ingredient;
    this.IngredientsChanged.next(this.aIngredients.slice());
  }

  deleteIngredient(index: number)  {
    this.aIngredients.splice(index, 1);
    this.IngredientsChanged.next(this.aIngredients.slice());
  }

  // Load ingredient for editing in the Shopping List
  loadIngredient(index: number) {
    return this.aIngredients[index];
  }

  getIngredients() {
    return this.aIngredients.slice();
  }


}

