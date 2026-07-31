import { ApplicationConfig, provideZoneChangeDetection,provideAppInitializer,inject} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error.interceptor';
import { AuthService } from './core/services/auth.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,
        // globalHttpErrorInterceptor,
      ])
    ),
     provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.restoreSession();
    }),
    provideToastr(),
    provideTranslateService({
      lang: 'vi',
      fallbackLang: 'vi',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      })
    })
  ]
};
