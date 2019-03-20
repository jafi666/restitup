module.exports = {
  apiUrl: 'https://api.schoology.com',
  rootPath: '/v1',
  headers: {
    'Content-Type': 'application/json',
    'Host': 'api.schoology.com'
  },
  authorization: {
    strategy: 'oauth1',
    oauth1: {
      consumerKey: 'b06382cb37b1cf75ba78506f891f013405c621433',
      consumerSecret: 'c00d645943f0264d336e91c9cebcf621'
    }
  },
  endpointsPath: 'src/endpoint-objects'
};
