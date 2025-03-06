import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { Constants } from '@modules/gifs/utils/constants';
import { GiphyService } from '../../services/apis/giphy.service';
import { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Gif } from '@modules/gifs/interfaces/gif';

const {
  GIFS_LIST_EXAMPLE
} = new Constants();

@Component({
  selector: 'app-history-page',
  imports: [GifsListComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  //OBSERVABLES
  private _destroySubscription$ = new Subject<void>();

  //INJECTS
  private _giphyService: GiphyService = inject(GiphyService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  //SIGNALS
  public gifsList: WritableSignal<Array<GifsListItem>> = signal(GIFS_LIST_EXAMPLE);
  public gifsHistory: WritableSignal<Array<Gif>> = signal<Array<Gif>>(new Array());

  //IMPLEMENTS FUNCTIONS
  ngOnInit(): void {
    this._getGifsHistoryByKey();
  }

  ngOnDestroy(): void {
    this._destroySubscription$.next();
    this._destroySubscription$.complete();
  }

  //PRIVATE FUNCTIONS
  /**
   * Cada vez que la ruta dinámica para este componente cambia,
   * se lanzará este subscribe.
   * La señal cambiará de forma reactiva al estar subscrito.
   */
  private _getGifsHistoryByKey(): void {
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._destroySubscription$),
        map( params => {
          return params.get('key')
        })
      ).subscribe( keyParam => {
        this.gifsHistory.set(
          this._giphyService.searchGifsHistory()[keyParam!]
        );
      });
  }
}
