import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { GifsListItemComponent } from "../gifs-list-components/gifs-list-item/gifs-list-item.component";

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent {
  //INPUTS
  public gifsList: InputSignal<Array<GifsListItem>> = input.required<Array<GifsListItem>>();
}
