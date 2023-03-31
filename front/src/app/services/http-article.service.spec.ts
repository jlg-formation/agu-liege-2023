import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, of } from 'rxjs';

import { HttpArticleService, url } from './http-article.service';

describe('HttpArticleService', () => {
  let service: HttpArticleService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpArticleService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    ctrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should refresh', () => {
    service.refresh().subscribe();
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
    expect(service).toBeTruthy();
  });

  it('should refresh in error', (done: DoneFn) => {
    let mustGoHere = false;
    service
      .refresh()
      .pipe(
        catchError(() => {
          mustGoHere = true;
          return of(undefined);
        })
      )
      .subscribe({
        complete: () => {
          expect(mustGoHere).toBe(true);
          done();
        },
      });
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 404, statusText: 'Not Found' });
    expect(service).toBeTruthy();
  });
});
