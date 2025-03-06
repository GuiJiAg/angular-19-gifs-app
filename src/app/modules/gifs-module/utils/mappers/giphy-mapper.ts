import type { ApiGiphyResponseSearchDataModel } from "@modules/gifs/interfaces/api-giphy-response-search-model";
import type { ApiGiphyResponseTrendingDataModel } from "@modules/gifs/interfaces/api-giphy-response-trending-model";
import type { Gif } from "@modules/gifs/interfaces/gif";

export class GiphyMapper {
  //PUBLIC STATICS FUNCTIONS
  public static mapGiphyResponseTrendingDataToGifs(giphyResponseTrendingData: Array<ApiGiphyResponseTrendingDataModel>): Array<Gif> {
    return giphyResponseTrendingData.map(this._mapGiphyResponseTrendingDataItemToGif);
  }

  public static mapGiphyResponseSearchDataToGifs(giphyResponseSearchData: Array<ApiGiphyResponseSearchDataModel>): Array<Gif> {
    return giphyResponseSearchData.map(this._mapGiphyResponseSearchDataItemToGif);
  }

  //PRIVATE STATICS FUNCTIONS
  private static _mapGiphyResponseTrendingDataItemToGif(giphyResponseTrendingDataItem: ApiGiphyResponseTrendingDataModel): Gif {
    const {
      id: ID,
      title: TITLE
    } = giphyResponseTrendingDataItem;

    const {
      url: URL
    } = giphyResponseTrendingDataItem.images.original;

    return {
      id: ID,
      title: TITLE,
      url: URL
    };
  }

  private static _mapGiphyResponseSearchDataItemToGif(giphyResponseSearchDataItem: ApiGiphyResponseSearchDataModel): Gif {
    const {
      id: ID,
      title: TITLE
    } = giphyResponseSearchDataItem;

    const {
      url: URL
    } = giphyResponseSearchDataItem.images.original;

    return {
      id: ID,
      title: TITLE,
      url: URL
    };
  }
}
