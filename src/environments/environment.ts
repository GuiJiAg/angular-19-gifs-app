export const environment = {
  production: true,
  companyName: 'Gifs',
  companySubname: 'App',
  companySlogan: 'Manage your gifs like a PRO!',

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
