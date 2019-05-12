import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  saveRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://angular-recipe-book-c29d7.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  fetchData() {
    const token = this.authService.getToken();
    this.http.get<Recipe[]>('https://angular-recipe-book-c29d7.firebaseio.com/recipes.json?auth=' + token)
      .pipe(
        map(res => {

          // Check if all recipes have 'ingredients' property, if not add an empty one
          for (const recipe of res) {
            if (!recipe.ingredients)  {
              recipe.ingredients = [];
            }
          }
          this.recipeService.setRecipes(res);
        }),
        )
      .subscribe();
  }
}
