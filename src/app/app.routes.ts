import { Routes } from '@angular/router';
import { DashboardPageComponent } from './modules/gifs-module/pages/dashboard-page/dashboard-page.component';
import { RouterDynamicsLinksGuard } from './modules/gifs-module/guards/router-dynamics-links.guard';
import { HistoryPageComponent } from './modules/gifs-module/pages/history-page/history-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'trending',

        /**
         * Carga "lazy load" mediante "import" y "then".
         * Poco legible y mantenible, pero se puede añadir poder operativo en el "then"
         */
        loadComponent: () =>
          import('./modules/gifs-module/pages/trending-page/trending-page.component').then(
            (component) => component.TrendingPageComponent
          )
      },
      {
        path: 'search',

        /**
         * Carga "lazy load" mediante "import" sin "then".
         * Igual que la anterior, pero es necesario cambiar la clase componente,
         * añadiendo un "default" justo después del "export";
         * algo más legible, pero elimina poder operativo al no usar la función "then"
         * y se debe modificar directamente el componente
         */
        loadComponent: () =>
          import('./modules/gifs-module/pages/search-page/search-page.component')
      },
      {
        path: 'history/:key/:id',

        /**
         * Este Guard impide la navegación a este path, menos para aquellos
         * componentes que tengan activada la posibilidad de navegación interna
         */
        canActivate: [RouterDynamicsLinksGuard],

        /**
         * Carga "lazy load" mediante "import" sin "then".
         * Igual que la anterior, pero es necesario cambiar la clase componente,
         * añadiendo un "default" justo después del "export";
         * algo más legible, pero elimina poder operativo al no usar la función "then"
         * y se debe modificar directamente el componente
         */
        loadComponent: () => HistoryPageComponent
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ],

    /**
     * Carga "lazy load" mediante carga directa del componente.
     * A partir de las versiones 16+ de Angular, esta forma de carga está permitida;
     * más elegible y mantenible, pero elimina poder operativo al no usar la función "then"
     */
    loadComponent: () => DashboardPageComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
