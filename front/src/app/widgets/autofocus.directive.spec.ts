import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  selector: 'app-test',
  template: ` <input appAutofocus /> `,
})
class TestComponent {}

describe('AutofocusDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AutofocusDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input');
    expect(input).toBeTruthy();
    const focusElt = document.activeElement;
    expect(focusElt).toBeTruthy();
    expect(focusElt).toBe(input);

    expect(component).toBeTruthy();
  });
});
