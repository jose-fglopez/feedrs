import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: localeEs, useValue: "es" },

  ]
})
export class CoreModule { }

/*
DO import modules that should be instantiated once in the app (a.k.a singleton)
DO place services in the module, but do not provide them
DO NOT declare components, pipes or directives, they should be under 'shared' folder
DO NOT import the CoreModule into any modules other than the AppModule
*/