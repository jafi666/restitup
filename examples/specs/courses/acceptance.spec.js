const { Restitup, HttpStatus } = require('restitup');

describe('Test framework', () => {
  it('Should get a list of courses', async (done) => {
    const {statusCode, data} = await Restitup.Courses.get();
    Restitup.$logger.info(JSON.stringify(data));
    expect(statusCode).toEqual(HttpStatus.OK);
    expect(data.course).toBeDefined();
    expect(parseInt(data.total)).toBe(data.course.length);
    done();
  });
});
