import { Component, input, InputSignal } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { GifsListItemComponent } from "../gifs-list-components/gifs-list-item/gifs-list-item.component";
import type { Gif } from '@modules/gifs/interfaces/gif';

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent {
  //CONSTANTS
  public normalGifsAreAviable: boolean = false;

  //INPUTS
  public gifsList: InputSignal<Array<GifsListItem>> = input.required<Array<GifsListItem>>();
  public giphyTrendingGifs: InputSignal<Array<Gif>> = input.required<Array<Gif>>();
}
