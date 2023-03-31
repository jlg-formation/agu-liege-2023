import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, of } from 'rxjs';
import { newArticle } from 'src/test/article.data';

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

  it('should add', () => {
    service.add(newArticle).subscribe();
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 201, statusText: 'Created' });
    expect(service).toBeTruthy();
  });

  it('should add in error', (done: DoneFn) => {
    let mustGoHere = false;
    service
      .add(newArticle)
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
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 405, statusText: 'Method Not Implemented' });
    expect(service).toBeTruthy();
  });

  it('should remove', () => {
    service.remove([]).subscribe();
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 204, statusText: 'No Content' });
    expect(service).toBeTruthy();
  });

  it('should remove in error', (done: DoneFn) => {
    let mustGoHere = false;
    service
      .remove([])
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
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 405, statusText: 'Method Not Implemented' });
    expect(service).toBeTruthy();
  });
});
