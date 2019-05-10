import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm()  {

    let recipeName = '';
    let recipeDesc = '';
    let recipeImage = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImage = recipe.imagePath;
      if (recipe.ingredients)  {
        for (const ingredient of recipe.ingredients)  {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount,
                [Validators.required,
                Validators.pattern('^[1-9]\\d*$')])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, Validators.required),
      recipeDesc: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onSubmit()  {
    const newRecipe = new Recipe(
      this.recipeForm.value.recipeName,
      this.recipeForm.value.recipeDesc,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.editMode)  {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onAddRecipeIngredient() {
    // tslint:disable-next-line:no-unused-expression
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]d*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteRecipeIngredient(index: number)  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
