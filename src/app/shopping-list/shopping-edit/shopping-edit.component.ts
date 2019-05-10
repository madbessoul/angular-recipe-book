import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {Subscription} from 'rxjs/subscription';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subs: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subs = this.shoppingListService.StartedEditingIngredient
      .subscribe(
        (index) =>  {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.loadIngredient(index);
          this.slForm.setValue(
            {ingredientName: this.editedItem.name,
            ingredientAmount: this.editedItem.amount
            }
          );
        }
      );
  }

  onAddIngr(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.ingredientName, value.ingredientAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.slForm.resetForm();
    this.editMode = false;

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient()  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
