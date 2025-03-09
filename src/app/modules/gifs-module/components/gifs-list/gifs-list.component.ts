import { AfterViewInit, Component, computed, ElementRef, inject, input, InputSignal, OnInit, output, OutputEmitterRef, Signal, viewChild } from '@angular/core';
import type { GifsListItem } from '@modules/gifs/interfaces/gifs-list-item';
import { GifsListItemComponent } from "../gifs-list-components/gifs-list-item/gifs-list-item.component";
import type { Gif } from '@modules/gifs/interfaces/gif';
import { GifsService } from '../../services/gifs.service';
import { GifsListOutput } from '@modules/gifs/interfaces/gifs-list-output';

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent implements AfterViewInit {
  //CONSTANTS
  public normalGifsAreAviable: boolean = false;

  //INPUTS
  public gifsList: InputSignal<Array<GifsListItem>> = input.required<Array<GifsListItem>>();
  public giphyGifsList: InputSignal<Array<Gif>> = input.required<Array<Gif>>();
  public subArraysLength: InputSignal<number> = input.required<number>();
  public scrollPosition: InputSignal<number | undefined> = input<number>();

  //OUTPUTS
  public gifsListOutput: OutputEmitterRef<GifsListOutput> = output<GifsListOutput>();

  //INJECTS
  private _gifsService: GifsService = inject(GifsService);

  //HTML ELEMENTS
  private _fatherDivElementRef: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild<ElementRef<HTMLDivElement>>('fatherDiv');

  //SIGNALS
  public giphyGifsMatrix: Signal<Array<Array<Gif>>> = computed(() => {
    return this._gifsService.sliceGifsList(
      this.giphyGifsList(),
      this.subArraysLength()
    )
  });

  //IMPLEMENTS
  ngAfterViewInit(): void {
    /**
     * Si se ha informado al componente de una posición del scroll previamente,
     * guardado, este será establecido al elemento <div>
     */
    if (this.scrollPosition()) {
      this._fatherDivElementRef()!.nativeElement.scrollTop = this.scrollPosition()!;
    } 
  }

  //PUBLIC FUNCTIONS
  public onScroll() {
    /**
     * Obtenemos el elemento <div>
     */
    const fatherDivElement: HTMLDivElement | undefined = this._fatherDivElementRef()?.nativeElement;

    //Si no existe scroll, sale de la función
    if (this._divElementNotExists(fatherDivElement)) return;

    //Devuelve al componente padre información de su scroll
    this.gifsListOutput.emit(
      this._getScrollInformation(fatherDivElement!)
    );
  }

  //PRIVATE FUNCTIONS
  private _divElementNotExists(divElement: HTMLDivElement | undefined): boolean {
    return !divElement ? true : false;
  }

  private _getScrollInformation(fatherDivElement: HTMLDivElement): GifsListOutput {
    /**
     * Cantidad de pixeles scrolleados desde la parte top del elemento;
     * si está en la parte top, devolverá 0 px, y a medida que baje devolverá
     * un número mayor de px
     */
    const scrollTop: number | undefined = fatherDivElement?.scrollTop;

    /**
     * Altura en pixeles del "viewpoint", es decir, el tamaño de la vista
     * devuelta por pantalla (lo que se visualice) del elemento.
     * Si esta altura es menor al tamaño real del elemento, se generará un scroll
     */
    const clientHeight: number | undefined = fatherDivElement?.clientHeight;

    /**
     * Altura total en pixeles del elemento, es decir, toda la altura que
     * se puede scrollear
     */
    const scrollHeight: number | undefined = fatherDivElement?.scrollHeight;

    /**
     * Si la suma de la cantidad de pixeles que se hayan scrolleado desde arriba
     * (scrollTop) con el tamaño del viewport (clientHeight) es igual o superior
     * a la altura total del elemento (scrollHeight), querrá decir que el scroll
     * está abajo del todo.
     *
     * En la suma, se suma también unos 100px, para que el componente detecte que el
     * scroll se está acercando al final, para que no espere justo hasta el final del scroll
     */
    const scrollIsAtBottom: boolean = scrollTop + clientHeight + 100 >= scrollHeight;

    return {
      scrollInformation: {
        scrollIsAtBottom: scrollIsAtBottom,
        scrollTop: scrollTop
      }
    }
  }
}
