import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { throwError } from 'rxjs';

import { AsyncIconButtonComponent } from './async-icon-button.component';

describe('AsyncIconButtonComponent', () => {
  let component: AsyncIconButtonComponent;
  let fixture: ComponentFixture<AsyncIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule],
      declarations: [AsyncIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.observable();
    expect(component).toBeTruthy();
  });
  it('should run doSomething', () => {
    component.doSomething();
    expect(component).toBeTruthy();
  });
  it('should run doSomething in error', () => {
    component.observable = () => throwError(() => new Error('oups'));
    component.doSomething();
    component.observable = () => throwError(() => 'oups');
    component.doSomething();
    expect(component).toBeTruthy();
  });
});
