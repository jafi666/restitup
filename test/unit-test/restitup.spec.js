'use strict';

describe('resitup main class', () => {
  it('Should throw an error getting Restitup without Start service.', (done) => {
    const Service = require('./../../index');
    let errorMessage = 'Not the one I want.';
    try {
      Service.Restitup;
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).toBe('Restitup sevice was not started properly.');
    done();
  });

  it('Should initialize class correctly', (done) => {
    const Service = require('./../../index');
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
});
