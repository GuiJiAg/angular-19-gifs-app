export const environment = {
  production: false,
  companyName: 'Gifs',
  companySubname: 'App',
  companySlogan: 'Manage your gifs!',

  //APIS
  giphy: {
    apiKey: '9BsuZWOK9rYPGeOhYZEGEu1ZR5rMw02Z',
    host: 'https://api.giphy.com',
    basePath: '/v1/gifs',
    endpoints: {
      trending: '/trending',
      search: '/search'
    }
  }
};
