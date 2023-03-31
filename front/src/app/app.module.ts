import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { ArticleService } from './services/article.service';
import { HttpArticleService } from './services/http-article.service';

import { registerLocaleData } from '@angular/common';
import BelgianLocale from '@angular/common/locales/fr-BE';

registerLocaleData(BelgianLocale, 'fr-BE');

@NgModule({
  declarations: [AppComponent, HomeComponent, LegalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-BE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: ArticleService, useClass: HttpArticleService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
