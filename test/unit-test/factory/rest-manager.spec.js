const ServerMock = require('mock-http-server');
const Service = require('./../../../index');

describe('Factory component tests', () => {
  const server = new ServerMock({ host: 'localhost', port: 3030 });

  beforeAll((done) => {
    const options = {
      apiUrl: 'http://localhost:3030',
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
  
  beforeEach(function(done) {
    server.start(done);
  });

  afterEach(function(done) {
    server.stop(done);
  });

  it('Endpoint Object instance should have EventEmitter functions', (done) => {
    const UnitTest = Service.Restitup.UnitTest;
    const event = 'some-event';
    const dataToEmit = 'data-to-emit';
    UnitTest.on(event, (data, callback) => {
      expect(data).toBe(dataToEmit);
      expect(typeof callback === 'function').toBe(true);
      callback();
    });
    UnitTest.emit(event, dataToEmit, done);
  });

  it('Should call GET from endpoint object instance', async (done) => {
    const unittest = 'called to unit test.';
    server.on({
      method: 'GET',
      path: '/api/unit-test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.get();
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    done();
  });

  it('Should call POST from endpoint object instance', async (done) => {
    const unittest = 'new unit test.';
    server.on({
      method: 'POST',
      path: '/api/unit-test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 1, unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.post({ unittest });
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    expect(data.id).toBe(1);
    done();
  });

  it('Should call PATCH from endpoint object instance', async (done) => {
    const unittest = 'unit test updated.';
    server.on({
      method: 'PATCH',
      path: '/api/unit-test/2',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 2, unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.patch(2, { unittest });
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    expect(data.id).toBe(2);
    done();
  });

  it('Should call PUT from endpoint object instance', async (done) => {
    const unittest = 'unit test updated.';
    server.on({
      method: 'PUT',
      path: '/api/unit-test/2',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 2, unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.put(2, { unittest });
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    expect(data.id).toBe(2);
    done();
  });

  it('Should call DELETE from endpoint object instance', async (done) => {
    const unittest = 'unit test deleted.';
    server.on({
      method: 'DELETE',
      path: '/api/unit-test/3',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 3, unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.delete(3);
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    expect(data.id).toBe(3);
    done();
  });

  it('Should call PATCH from endpoint object instance, but with just one result', async (done) => {
    const unittest = 'unit test updated.';
    server.on({
      method: 'GET',
      path: '/api/unit-test/2',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 2, unittest })
      }
    });
    const { Restitup } = Service;
    const { $HttpStatus } = Restitup.modules;
    const UnitTest = Restitup.UnitTest;
    const {statusCode, data} = await UnitTest.getOne(2);
    expect(statusCode).toEqual($HttpStatus.OK);
    expect(data).toBeDefined();
    expect(data.unittest).toBe(unittest);
    expect(data.id).toBe(2);
    done();
  });

  it('Should fail calling an incorrect endpoint ', async (done) => {
    const { Restitup } = Service;
    const UnitTest = Restitup.UnitTest;
    try {
      await UnitTest.getOne(2);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Timeout');
    }
    done();
  });
});
