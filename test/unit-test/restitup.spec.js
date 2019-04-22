const Service = require('./../../index');

describe('resitup main class', () => {
  afterEach((done) => {
    Service._kill();
    done();
  });

  it('Should throw an error getting Restitup without Start service.', (done) => {
    let errorMessage = 'Not the one I want.';
    try {
      Service.Restitup;
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe('Restitup sevice was not started properly.');
    done();
  });

  it('Should throw an error not finding endpoint objects path.', (done) => {
    let errorMessage = 'Not the one I want.';
    const path = require('path');
    const appDir = path.dirname(require.main.filename);
    const endpointsPath = 'test/test-endpoints';
    try {
      const options = {
        apiUrl: 'http://testapi.com',
        endpointsPath,
      };
      Service.Start(options);
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe(`Invalid endpoints path provided: ${path.join(appDir, endpointsPath)}`);
    done();
  });

  it('Should initialize class correctly', (done) => {
    const options = {
      apiUrl: 'http://testapi.com',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd()
    };
    Service.Start(options);
    const Restitup = Service.Restitup;

    expect(Restitup).toBeTruthy();
    expect(Restitup.options).toBeTruthy();
    expect(Restitup.options.apiUrl).toEqual(options.apiUrl);
    done();
  });

  it('Should initialize UnitTest endpoint class correctly and have $logger injected.', (done) => {
    const options = {
      apiUrl: 'http://testapi.com',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd(),
      logger: {
        appenders: {
          file: {
            type: 'file',
            filename: 'api-test.log'
          }
        }
      }
    };
    Service.Start(options);
    const Restitup = Service.Restitup;

    expect(Restitup).toBeTruthy();
    expect(Restitup.options).toBeTruthy();
    expect(Restitup.options.apiUrl).toEqual(options.apiUrl);
    expect(Restitup.UnitTest.$logger).toBeTruthy();
    done();
  });

  it('Should initialize Restitup with basic modules on it', (done) => {
    const options = {
      apiUrl: 'http://testapi.com',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd()
    };
    Service.Start(options);
    const { Restitup } = Service;
    const { $logger, $awaitTo, $asyncSpec, $HttpStatus } = Restitup.modules;

    expect(Restitup).toBeTruthy();
    expect($logger).toBeDefined();
    expect($awaitTo).toBeDefined();
    expect($asyncSpec).toBeDefined();
    expect($HttpStatus).toBeDefined();
    done();
  });
});
