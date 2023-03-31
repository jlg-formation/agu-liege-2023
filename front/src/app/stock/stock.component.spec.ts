import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { a1 } from 'src/test/article.data';
import { WidgetsModule } from '../widgets/widgets.module';

import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsModule, FontAwesomeTestingModule],
      declarations: [StockComponent],
    }).compileComponents();
  });

  it('should create', fakeAsync(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(2000);
    expect(component).toBeTruthy();
  }));

  it('should refresh', fakeAsync(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(2000);
    component.refresh().subscribe();
    tick(2000);
    expect(component).toBeTruthy();
  }));

  it('should remove', fakeAsync(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(2000);
    component.select(a1);
    component.remove().subscribe();
    tick(2000);
    expect(component).toBeTruthy();
  }));

  it('should select and unselect', fakeAsync(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(2000);
    component.select(a1);
    component.select(a1);
    expect(component).toBeTruthy();
  }));

  it('should reset and set the errorMsg', fakeAsync(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(2000);
    component.resetErrorMsg();
    component.setErrorMsg(new Error('oups'));
    expect(component).toBeTruthy();
  }));
});
