import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@environments/environment';
import type { ApiGiphyRequestTrendingModel } from '@modules/gifs/interfaces/api-giphy-request-trending-model';
import type { ApiGiphyResponseTrendingModel } from '@modules/gifs/interfaces/api-giphy-response-trending-model';
import type { Gif } from '@modules/gifs/interfaces/gif';
import { Constants } from '@modules/gifs/utils/constants';
import { GiphyMapper } from '@modules/gifs/utils/mappers/giphy-mapper';

const {
  API_GIPHY_REQUEST_TRENDING_EXAMPLE
} = new Constants();

//Destructuración del host y basePath
const {
  host: HOST,
  basePath: BASE_PATH
} = environment.giphy;

//Destructuración de endpoints
const {
  trending: TRENDING
} = environment.giphy.endpoints;

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  //SERVICES
  /**
   * Este inject "HttpClient", al ser una instancia, debe de ser provista
   * desde al api.config
   */
  private http: HttpClient = inject(HttpClient);

  //SIGNALS
  public trendingGifs: WritableSignal<Array<Gif>> = signal<Array<Gif>>(new Array());

  constructor() {
    this.getTrendingGifs(API_GIPHY_REQUEST_TRENDING_EXAMPLE);
  }

  //PUBLIC FUNCTIONS
  public getTrendingGifs(request: ApiGiphyRequestTrendingModel): void {
    //Destructuración de la request
    const {
      api_key: API_KEY,
      limit: LIMIT,
      offset: OFFSET,
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
          offset: OFFSET!,
          rating: RATING!,
          bundle: BUNDLE!
        }
      }
    ).subscribe( (response) => {
      const {
        data: DATA
      } = response;

      this.trendingGifs.set(GiphyMapper.mapGiphyResponseTrendingDataToGifs(DATA));
    });
  }
}
