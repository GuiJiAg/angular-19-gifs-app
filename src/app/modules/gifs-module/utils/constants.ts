import { v4 as uuidv4 } from 'uuid';
import type { SideMenuOption } from '../interfaces/side-menu-option';
import type { GifsListItem } from '../interfaces/gifs-list-item';
import type { ApiGiphyRequestTrendingModel } from '../interfaces/api-giphy-request-trending-model';
import { environment } from '@environments/environment';
import { ApiGiphyRequestSearchModel } from '../interfaces/api-giphy-request-search-model';

export class Constants {

  //SIDE MENU OPTIONS
  public SIDE_MENU_OPTIONS_EXAMPLES: Array<SideMenuOption> = [
    {
      id: uuidv4(),
      label: 'Trending',
      subLabel: 'Trending Gifs',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      id: uuidv4(),
      label: 'Search',
      subLabel: 'Search Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }
  ];
  public SIDE_MENU_OPTIONS_ROUTER_LINK_ACTIVE_STYLE: string = 'bg-blue-800';

  //GLOBAL PAGES
  public SUB_ARRAYS_LENGTH_OF_GIFS_MATRIX: number = 3;

  //TRENDING PAGE
  public GIFS_LIST_EXAMPLE: Array<GifsListItem> = [
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
      alt: ''
    },
    {
      id: uuidv4(),
      style: 'h-auto max-w-full rounded-lg',
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
      alt: ''
    }
  ];

  //GIPHY SERVICE
  public API_GIPHY_REQUEST_TRENDING_EXAMPLE: ApiGiphyRequestTrendingModel = {
    api_key: environment.giphy.apiKey,
    limit: '36',
    offset: '0',
    rating: 'g',
    bundle: 'messaging_non_clips'
  };

  public API_GIPHY_REQUEST_SEARCH_EXAMPLE: ApiGiphyRequestSearchModel = {
    api_key: environment.giphy.apiKey,
    q: "",
    limit: '36',
    offset: '0',
    rating: 'g',
    bundle: 'messaging_non_clips'
  };

  //LOCAL STORAGE ITEMS
  public LOCAL_STORAGE_GIFS_HISTORY_ITEM_NAME: string = 'gifsHistory';
  public LOCAL_STORAGE_KEYS_HISTORY_ITEM_NAME: string = 'keysHistory';

  constructor() { }
}
