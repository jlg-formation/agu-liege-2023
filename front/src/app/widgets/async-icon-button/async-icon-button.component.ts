import { Component, Input } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-async-icon-button',
  templateUrl: './async-icon-button.component.html',
  styleUrls: ['./async-icon-button.component.scss'],
})
export class AsyncIconButtonComponent {
  @Input()
  observable: Observable<void> = of(undefined);

  @Input()
  label = '';
  icon = faTrashAlt;
  doSomething() {
    of(undefined)
      .pipe(
        // before
        switchMap(() => this.observable)
        // after
      )
      .subscribe();
  }
}
