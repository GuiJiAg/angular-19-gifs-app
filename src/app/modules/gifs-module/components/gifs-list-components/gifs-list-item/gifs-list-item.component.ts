import { Component, input, InputSignal } from '@angular/core';
import type { Gif } from '@modules/gifs/interfaces/gif';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css'
})
export class GifsListItemComponent {
  //INPUTS
  public normalGifsAreAviable = input.required<boolean>();
  public gifsListItem: InputSignal<GifsListItem | undefined>  = input<GifsListItem>();
  public giphyGifs: InputSignal<Gif | undefined>  = input<Gif>();
}
