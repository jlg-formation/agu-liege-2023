import { TestBed } from '@angular/core/testing';
import { a1, a2, newArticle } from 'src/test/article.data';

import { articles, ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should refresh', () => {
    service.refresh().subscribe();
    expect(service).toBeTruthy();
  });

  it('should add', () => {
    service.add(newArticle).subscribe();
    expect(service).toBeTruthy();
  });

  it('should remove', () => {
    articles.push(a1);
    articles.push(a2);
    service.remove(['a1']).subscribe();
    expect(service).toBeTruthy();
  });
});
