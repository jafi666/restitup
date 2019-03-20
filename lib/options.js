module.exports = {
  apiUrl: 'http://localhost',
  rootPath: '/api',
  headers: {},
  authorization: {
    strategy: 'none',
    oauth1: {
      consumerKey: '',
      consumerSecret: '',
      oauthToken: '',
      oauthTokenSecret: '',
      requestUrl: '',
      accessUrl: '',
      version: '1.0',
      authorizeCallback: '',
      signatureMethod: 'HMAC-SHA1',
    },
    basic: {
      username: '',
      password: ''
    },
    bearer: {
      token: ''
    }
  },
  endpointsPath: 'src/endpoint-objects'
};
