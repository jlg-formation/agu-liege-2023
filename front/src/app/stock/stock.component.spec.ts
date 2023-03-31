import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
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
});
