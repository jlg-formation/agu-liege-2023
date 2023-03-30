import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncIconButtonComponent } from './async-icon-button/async-icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [AsyncIconButtonComponent, AutofocusDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncIconButtonComponent, AutofocusDirective],
})
export class WidgetsModule {}
