const ServerMock = require('mock-http-server');
const Service = require('./../../../index');

describe('Authorization component tests', () => {
  const server = new ServerMock({ host: 'localhost', port: 3030 });

  beforeEach(function(done) {
    server.start(done);
  });

  afterEach(function(done) {
    Service._kill();
    server.stop(done);
  });

  it('Should call request with OAUTH1 authorization header.', async (done) => {
    const options = {
      apiUrl: 'http://localhost:3030',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd(),
      authorization: {
        strategy: 'oauth1',
        oauth1: {
          consumerKey: 'b06382cb37b1cf75ba78506f891f013405c621433',
          consumerSecret: 'c00d645943f0264d336e91c9cebcf621'
        }
      },
    };
    Service.Start(options);
    const unittest = 'Called with oauth1 authorization.';
    server.on({
      method: 'GET',
      path: '/api/unit-test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ unittest })
      }
    });
    const { Restitup, HttpStatus } = Service;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.get();
    expect(statusCode).toEqual(HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    done();
  });

  it('Should call request with Basic authorization header.', async (done) => {
    const options = {
      apiUrl: 'http://localhost:3030',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd(),
      authorization: {
        strategy: 'basic',
        basic: {
          username: 'foo',
          password: 'bar'
        }
      },
    };
    Service.Start(options);
    const unittest = 'Called with Basic authorization.';
    server.on({
      method: 'GET',
      path: '/api/unit-test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ unittest })
      }
    });
    const { Restitup, HttpStatus } = Service;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.get();
    expect(statusCode).toEqual(HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    done();
  });

  it('Should call request with Bearer authorization header.', async (done) => {
    const options = {
      apiUrl: 'http://localhost:3030',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd(),
      authorization: {
        strategy: 'bearer',
        bearer: {
          token: 'b06382cb37b1cf75ba78506f891f013405c621433'
        }
      },
    };
    Service.Start(options);
    const unittest = 'Called with bearer authorization.';
    server.on({
      method: 'GET',
      path: '/api/unit-test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ unittest })
      }
    });
    const { Restitup, HttpStatus } = Service;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.get();
    expect(statusCode).toEqual(HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    done();
  });

});
