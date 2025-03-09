import { Injectable } from '@angular/core';
import { Gif } from '../interfaces/gif';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() { }

  //PUBLIC FUNCTIONS

  /**
   *
   * @param gifsList
   * @param subArraysLength
   * @returns Array<Array<Gif>> (Matriz de Gifs)
   *
   * Esta función realiza lo siguiente:
   *
   *  1-  Calcula el tamaño de la matriz a devolver tras calcular
   * el número de subArrays que pueden crearse a partir de un array
   * dado y de un tamaño específico para cada subArray (arrayLike)
   *
   *  2-  La función de mapeo crea la matriz a partir del arrayLike,
   * devolviendo un array en cada iteración. Para ello se parametriza
   * el elemento actual del arrayLike en cada iteración y su index:
   * el parámetro del elemento se define como "_", el cual significa
   * que no estamos recogiendo su valor debido a que no va a ser usado
   * dentro de la función de mapeo
   */
  public sliceGifsList(gifsList: Array<Gif>, subArraysLength: number): Array<Array<Gif>> {
    const arrayLike = {
      length: Math.ceil(gifsList.length / subArraysLength)
    };

    return Array.from(
      arrayLike,
      (_, index) => {
        return gifsList.slice(index * subArraysLength, index * subArraysLength + subArraysLength);
      }
    );
  }
}
