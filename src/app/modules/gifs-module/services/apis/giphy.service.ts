import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { ApiGiphyRequestTrendingModel } from '@modules/gifs/interfaces/api-giphy-request-trending-model';
import type { ApiGiphyResponseTrendingModel } from '@modules/gifs/interfaces/api-giphy-response-trending-model';
import { Observable } from 'rxjs';

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

  constructor() { }

  //PUBLICS FUNCTIONS
  public getTrendingGifs(request: ApiGiphyRequestTrendingModel): Observable<ApiGiphyResponseTrendingModel> {
    const {
      api_key,
      limit,
      offset,
      rating,
      bundle
    } = request;

    return this.http.get<ApiGiphyResponseTrendingModel>(`
      ${ environment.giphy.host }
      ${ environment.giphy.basePath }
      ${ environment.giphy.endpoints.trending }
      `,
      {
        params: {
          api_key: api_key,
          limit: limit!,
          offset: offset!,
          rating: rating!,
          bundle: bundle!
        }
      }
    );
  }
}
