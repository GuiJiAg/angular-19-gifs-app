import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { Constants } from '@modules/gifs/utils/constants';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GiphyService } from '../../services/apis/giphy.service';
import { Gif } from '@modules/gifs/interfaces/gif';
import { GifsListOutput } from '@modules/gifs/interfaces/gifs-list-output';
import { StatesControlService } from '../../services/states-control.service';

const {
  GIFS_LIST_EXAMPLE,
  SUB_ARRAYS_LENGTH_OF_GIFS_MATRIX,
  API_GIPHY_REQUEST_TRENDING_EXAMPLE
} = new Constants();

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export class TrendingPageComponent implements OnInit, OnDestroy {
  //INJECTS
  private _giphyService: GiphyService = inject(GiphyService);
  private _statesControlService: StatesControlService = inject(StatesControlService);

  //PUBLIC SIGNALS
  public gifsList: WritableSignal<Array<GifsListItem>> = signal(GIFS_LIST_EXAMPLE);
  public subArraysLength: WritableSignal<number> = signal<number>(SUB_ARRAYS_LENGTH_OF_GIFS_MATRIX);
  public scrollPositionSaved: WritableSignal<number> = signal<number>(0);
  public gifsTrendingList: Signal<Array<Gif>> = computed(() => {
    return this._giphyService.trendingGifs();
  });

  //PRIVATE SIGNALS
  private _currentScrollPosition: WritableSignal<number> = signal<number>(0);

  //IMPLEMENTS
  ngOnInit(): void {
    this._initTrendingGifs();

    /**
     * Toma el valor de la posición actual del scroll para comunicarlo
     * a su componente de GifsList
     */
    this.scrollPositionSaved.set(
      this._statesControlService.trendingPageScrollPositionState()
    );
  }

  ngOnDestroy(): void {
    /**
     * Guarda la posición actual del scroll de su componente GifsList
     */
    this._statesControlService.trendingPageScrollPositionState.set(
      this._currentScrollPosition()
    );
  }

  //PUBLIC FUNCTIONS
  public updateScrollState(gifsListOutput: GifsListOutput): void {
    const {
      scrollIsAtBottom,
      scrollTop
    } = gifsListOutput.scrollInformation;

    if (scrollIsAtBottom) this._giphyService.loadTrendingGifs(API_GIPHY_REQUEST_TRENDING_EXAMPLE);

    this._currentScrollPosition.set(scrollTop);
  }

  //PRIVATE FUNCTIONS
  private _initTrendingGifs(): void {
    const gifsTrending: Array<Gif> = this._giphyService.trendingGifs();

    if (gifsTrending.some(() => true)) return;

    this._giphyService.loadTrendingGifs(API_GIPHY_REQUEST_TRENDING_EXAMPLE);
  }
}
