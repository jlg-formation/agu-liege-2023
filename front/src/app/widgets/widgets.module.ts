import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncIconButtonComponent } from './async-icon-button/async-icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AsyncIconButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncIconButtonComponent],
})
export class WidgetsModule {}
