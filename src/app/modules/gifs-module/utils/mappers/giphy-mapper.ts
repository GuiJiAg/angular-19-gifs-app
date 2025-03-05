import type { ApiGiphyResponseDataModel } from "@modules/gifs/interfaces/api-giphy-response-trending-model";
import type { Gif } from "@modules/gifs/interfaces/gif";

export class GiphyMapper {
  //PUBLIC STATICS FUNCTIONS
  public static mapGiphyResponseTrendingDataToGifs(giphyResponseTrendingData: Array<ApiGiphyResponseDataModel>): Array<Gif> {
    return giphyResponseTrendingData.map(this._mapGiphyResponseTrendingDataItemToGif);
  }

  //PRIVATE STATICS FUNCTIONS
  private static _mapGiphyResponseTrendingDataItemToGif(giphyResponseTrendingDataItem: ApiGiphyResponseDataModel): Gif {
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
}
