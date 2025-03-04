import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    /**
     * Este "provide" es el estandar para proveer el servicio HttpClient
     * para la invocación de servicios API
     */
    provideHttpClient(withFetch())
  ]
};
