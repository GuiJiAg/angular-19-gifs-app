import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { Constants } from '@modules/gifs/utils/constants';
import { GiphyService } from '../../services/apis/giphy.service';
import { Gif } from '@modules/gifs/interfaces/gif';
import { ApiGiphyRequestSearchModel } from '@modules/gifs/interfaces/api-giphy-request-search-model';
import { Subscription } from 'rxjs';
import { GifsListOutput } from '@modules/gifs/interfaces/gifs-list-output';
import { StatesControlService } from '../../services/states-control.service';

const {
  API_GIPHY_REQUEST_SEARCH_EXAMPLE,
  SUB_ARRAYS_LENGTH_OF_GIFS_MATRIX
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
  public subArraysLength: WritableSignal<number> = signal<number>(SUB_ARRAYS_LENGTH_OF_GIFS_MATRIX);
  public scrollPositionSaved: WritableSignal<number> = signal<number>(0);

  //IMPLEMENTS
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
