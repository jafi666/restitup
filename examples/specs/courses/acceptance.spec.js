const { Restitup, HttpStatus } = require('restitup');

describe('Test framework', () => {
  it('Just a simple test', async (done) => {
    const {statusCode, data} = await Restitup.Courses.get('/groups');
    expect(statusCode).toEqual(HttpStatus.OK);
    expect(data.group).toBeDefined();
    done();
  });
});
