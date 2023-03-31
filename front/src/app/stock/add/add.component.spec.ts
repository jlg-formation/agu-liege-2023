import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { throwError } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  describe('without injection', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          FontAwesomeTestingModule,
          ReactiveFormsModule,
        ],
        declarations: [AddComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AddComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should write qty', () => {
      component.f.controls.qty.setValue(null);
      component.f.controls.qty.setValue(1);
      component.f.controls.qty.setValue('1.' as unknown as number);
      component.f.controls.qty.setValue(null);
      component.f.controls.qty.setValue('.' as unknown as number);
      component.f.controls.qty.setValue('' as unknown as number);

      expect(component).toBeTruthy();
    });

    it('should submit', fakeAsync(() => {
      component.submit();
      tick(300);

      expect(component).toBeTruthy();
    }));
  });

  describe('with injection', () => {
    let component: AddComponent;
    let fixture: ComponentFixture<AddComponent>;

    it('should submit in error', fakeAsync(async () => {
      const myArticleService = new ArticleService();
      myArticleService.add = () => throwError(() => new Error('oups'));
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          FontAwesomeTestingModule,
          ReactiveFormsModule,
        ],
        providers: [{ provide: ArticleService, useValue: myArticleService }],
        declarations: [AddComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AddComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.submit();
      tick(300);

      expect(component).toBeTruthy();
    }));
  });
});
