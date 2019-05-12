import {DropdownDirective} from './dropdown.directive';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    DropdownDirective,
    FormsModule,
    CommonModule
  ]
})
export class SharedModule {}
