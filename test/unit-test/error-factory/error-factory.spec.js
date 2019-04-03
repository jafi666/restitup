const Service = require('./../../../index');

describe('Restitup Error Factory module', () => {
  
  beforeAll((done) => {
    const options = {
      apiUrl: 'http://testapi.com',
      endpointsPath: 'test/test-endpoints',
      appDir: process.cwd()
    };
    Service.Start(options);
    done();
  });

  afterAll((done) => {
    Service._kill();
    done();
  });

  it('Should throw native error by passing non exiting error name', (done) => {
    const ErrorFactory = Service.ErrorFactory;
    let errorMessage = 'Not the one I want.';
    try {
      ErrorFactory.throwError('notRegistered');
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe(`The Error 'notRegistered' was not defined in the system.`);
    done();
  });

  it('Should throw invalid endpoints path error by its name', (done) => {
    const ErrorFactory = Service.ErrorFactory;
    let errorMessage = 'Not the one I want.';
    try {
      ErrorFactory.throwError('invalidEndpointsPath', '/foo/bar');
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe(`Invalid endpoints path provided: /foo/bar`);
    done();
  });

  it('Should get an error instance by its name', (done) => {
    const ErrorFactory = Service.ErrorFactory;
    const error = ErrorFactory.getError('serviceNotStarted');

    expect(error).toBeTruthy();
    expect(error instanceof Error).toBeTruthy();
    expect(error.message).toBe('Restitup sevice was not started properly.');
    done();
  });
});
