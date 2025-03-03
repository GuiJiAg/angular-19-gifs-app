import { Component, input, InputSignal } from '@angular/core';
import { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css'
})
export class GifsListItemComponent {
  //INPUTS
  public gifsListItem: InputSignal<GifsListItem> = input.required<GifsListItem>();
}
