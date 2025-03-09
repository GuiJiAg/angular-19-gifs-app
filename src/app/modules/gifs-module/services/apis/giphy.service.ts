import { HttpClient } from '@angular/common/http';
import { computed, effect, EffectRef, inject, Injectable, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '@environments/environment';
import type { ApiGiphyRequestSearchModel } from '@modules/gifs/interfaces/api-giphy-request-search-model';
import type { ApiGiphyRequestTrendingModel } from '@modules/gifs/interfaces/api-giphy-request-trending-model';
import type { ApiGiphyResponseSearchModel } from '@modules/gifs/interfaces/api-giphy-response-search-model';
import type { ApiGiphyResponseTrendingModel } from '@modules/gifs/interfaces/api-giphy-response-trending-model';
import type { Gif } from '@modules/gifs/interfaces/gif';
import { Constants } from '@modules/gifs/utils/constants';
import { GiphyMapper } from '@modules/gifs/utils/mappers/giphy-mapper';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LocalStorageUtils } from '@modules/gifs/utils/local-storage-utils';

const {
  LOCAL_STORAGE_GIFS_HISTORY_ITEM_NAME
} = new Constants();

//Destructuración del host y basePath
const {
  host: HOST,
  basePath: BASE_PATH
} = environment.giphy;

//Destructuración de endpoints
const {
  trending: TRENDING,
  search: SEARCH
} = environment.giphy.endpoints;

@Injectable({
  providedIn: 'root'
})
export class GiphyService implements OnDestroy {
  //SUBSCRIPTION DESTROYER
  private destroySubscription$ = new Subject<void>();

  //SERVICES
  /**
   * Este inject "HttpClient", al ser una instancia, debe de ser provista
   * desde al api.config
   */
  private http: HttpClient = inject(HttpClient);

  //PUBLIC SIGNALS
  public trendingGifs: WritableSignal<Array<Gif>> = signal<Array<Gif>>(new Array());
  public searchGifs: WritableSignal<Array<Gif>> = signal<Array<Gif>>(new Array());
  public searchGifsHistory: WritableSignal<Record<string, Array<Gif>>> = signal<Record<string, Array<Gif>>>(
    LocalStorageUtils.getLocalStorageItem(LOCAL_STORAGE_GIFS_HISTORY_ITEM_NAME, {})
  );

  /**
   * Este computed se aplicará cada vez que "searchHistoy" cambie y/o se inicie,
   * obteniendo el las "keys" de esta señal de tipo Record<string(keys), Array<Gif>(values)>.
   */
  public searchGifsHistoryKeys: Signal<Array<string>> = computed( () => {
    return Object.keys(this.searchGifsHistory());
  });

  //PRIVATE SIGNALS
  private _trendingGifsPage: WritableSignal<number> = signal<number>(0);
  private _trendingGifsIsLoading: WritableSignal<boolean> = signal<boolean>(false);

  //EFFECTS -> Cada vez que cambia un signal, se ejecutan los effects
  private _saveInLocalStorageEffect: EffectRef = effect(() => {
    LocalStorageUtils.setLocalStorageItem( {
      gifsHistory: this.searchGifsHistory()
    });
  });

  constructor() { }

  //PUBLIC FUNCTIONS
  public loadTrendingGifs(request: ApiGiphyRequestTrendingModel): void {
    /**
     * Si se está llamando ya al API en el momento de volver a ejecutar
     * esta llamada, saldrá de la función; es decir, esta comprobación actúa
     * como un "semáforo" para evitar la sobrecarga innecesaria de llamadas
     */
    if (this._trendingGifsIsLoading()) return;
    /**
     * En caso de que no haya ya una llamada prevía, pondremos el "semáforo"
     * en rojo (_trendingGifsIsLoading = true)
     */
    this._trendingGifsIsLoading.set(true);

    //Destructuración de la request
    const {
      api_key: API_KEY,
      limit: LIMIT,
      rating: RATING,
      bundle: BUNDLE
    } = request;

    this.http.get<ApiGiphyResponseTrendingModel>(
      HOST
      + BASE_PATH
      + TRENDING,
      {
        params: {
          api_key: API_KEY,
          limit: LIMIT!,
          offset: this._trendingGifsPage() * parseInt(LIMIT!),
          rating: RATING!,
          bundle: BUNDLE!
        }
      }
    ).pipe(
      takeUntil(this.destroySubscription$) //Hará que la subscripción dure hasta que se cierre el destroy
    ).subscribe( (response) => {
      const {
        data: DATA
      } = response;
      const newGifs = GiphyMapper.mapGiphyResponseTrendingDataToGifs(DATA);

      /**
       * Actualiza la señal añadiendo a los ya existentes gifs (currentGifs)
       * los nuevos gifs devueltos (newGifs)
       */
      this.trendingGifs.update( currentGifs => [
        ...currentGifs,
        ...newGifs
      ]);

      this._trendingGifsPage.update( currentPage =>
        currentPage + 1
      );

      /**
       * Una vez finalizada la llamada, volvemos a poner el "semáforo"
       * en verde (_trendingGifsIsLoading = false)
       */
      this._trendingGifsIsLoading.set(false);
    });
  }

  public getSearchGifs(request: ApiGiphyRequestSearchModel): Observable<Array<Gif>> {
    //Destructuración de la request
    const {
      api_key: API_KEY,
      q: QUERY,
      limit: LIMIT,
      offset: OFFSET,
      rating: RATING,
      bundle: BUNDLE
    } = request;

    return this.http.get<ApiGiphyResponseSearchModel>(
      HOST
      + BASE_PATH
      + SEARCH,
      {
        params: {
          api_key: API_KEY,
          q: QUERY,
          limit: LIMIT!,
          offset: OFFSET!,
          rating: RATING!,
          bundle: BUNDLE!
        }
      }
    ).pipe(
      /**
       * Mapea la respuesta antes de enviarla a un objeto más personalizado
       */
      map( (response) => {
        const {
          data: DATA
        } = response;

        return GiphyMapper.mapGiphyResponseSearchDataToGifs(DATA);
      }),

      /**
       * Añade al listado de históricos actual el nuevo histórico,
       * primero la key ([QUERY]) y luego el valor de la búsqueda (response)
       */
      tap( (response) => {
        this.searchGifsHistory.update( (currentHistory) => ({
          ...currentHistory,
          [QUERY.toLowerCase()]: response
        }));
      })
    );
  }

  //IMPLEMENTS
  /**
   * Una vez se destruya el servicio (aunque este se inyecte de raíz),
   * todas aquellas subscripciones con "takeUntil(this.destroySubscription$)"
   * cerrarán sus subscripciones para evitar las fugas de memoria
   */
  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
