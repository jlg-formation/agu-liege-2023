import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncIconButtonComponent } from './async-icon-button/async-icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutofocusDirective } from './autofocus.directive';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  declarations: [AsyncIconButtonComponent, AutofocusDirective, EllipsisPipe],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncIconButtonComponent, AutofocusDirective, EllipsisPipe],
})
export class WidgetsModule {}
