export interface ApiGiphyRequestSearchModel {
  api_key: string,
  q: string;
  limit?: string,
  offset?: string,
  rating?: string,
  lang?: string;
  bundle?: string
}
