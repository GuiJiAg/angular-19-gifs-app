import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { Constants } from '@modules/gifs/utils/constants';
import { GiphyService } from '../../services/apis/giphy.service';
import { Gif } from '@modules/gifs/interfaces/gif';
import { ApiGiphyRequestSearchModel } from '@modules/gifs/interfaces/api-giphy-request-search-model';
import { Subscription } from 'rxjs';

const {
  API_GIPHY_REQUEST_SEARCH_EXAMPLE
} = new Constants();

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent implements OnDestroy {
  //OBSERVABLES
  private _giphySubscription: Subscription = new Subscription();

  //INJECTS
  private _giphyService: GiphyService = inject(GiphyService);

  //SIGNALS
  public searchGifs: WritableSignal<Array<Gif>> = signal<Array<Gif>>(new Array());

  //LIFE CYCLE FUNCTIONS
  ngOnDestroy(): void {
    if (this._giphySubscription) {
      this._giphySubscription.unsubscribe();
    }
  }

  //PUBLIC FUNCTIONS
  public onSearch(inputElement: HTMLInputElement): void {
    const requestSearch: ApiGiphyRequestSearchModel = API_GIPHY_REQUEST_SEARCH_EXAMPLE;
    requestSearch.q = inputElement.value;

    //Limpiamos el input:
    inputElement.value = '';

    this._giphySubscription = this._giphyService.getSearchGifs(requestSearch)
      .subscribe( (response) => { //Devuelve la respuesta
        this.searchGifs.set(response);
      });
  }
}
