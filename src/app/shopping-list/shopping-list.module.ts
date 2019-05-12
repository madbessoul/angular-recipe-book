import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {SharedModule} from '../shared/shared.module';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {}
