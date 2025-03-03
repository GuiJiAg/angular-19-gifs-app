import { Component, signal, WritableSignal } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { Constants } from '@modules/gifs/utils/constants';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

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
  //SIGNALS
  public gifsList: WritableSignal<Array<GifsListItem>> = signal(GIFS_LIST_EXAMPLE);
}
