import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { Constants } from '@modules/gifs/utils/constants';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GiphyService } from '../../services/apis/giphy.service';

const {
  GIFS_LIST_EXAMPLE
} = new Constants();

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export class TrendingPageComponent {
  //INJECTS
  public giphyService: GiphyService = inject(GiphyService);

  //SIGNALS
  public gifsList: WritableSignal<Array<GifsListItem>> = signal(GIFS_LIST_EXAMPLE);
}
