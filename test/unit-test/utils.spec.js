const {_isClass, _isEmpty} = require('./../../lib/utils');

describe('resitup utils tests', () => {
  it('Should confirm a class with _isClass', (done) => {
    const SomeClass = class SomeClass {};
    expect(_isClass(SomeClass)).toBe(true);
    done();
  });

  it('Should fail when no class is evaluated with _isClass', (done) => {
    const SomeClass = function SomeClass() {};
    expect(_isClass(SomeClass)).toBe(false);
    done();
  });

  it('Should return true, when object is null after beeing evaluated with _isEmpty', (done) => {
    expect(_isEmpty(null)).toBe(true);
    done();
  });

  it('Should return false, when object has at least one attribute after beeing evaluated with _isEmpty', (done) => {
    expect(_isEmpty([1,2,3])).toBe(false);
    done();
  });

  it('Should return true, when object has exactly zero attributes after beeing evaluated with _isEmpty', (done) => {
    expect(_isEmpty([])).toBe(true);
    done();
  });

  it('Should return true, when object is not an object after beeing evaluated with _isEmpty', (done) => {
    const someFunction = () => { return 'Unit testing restitup.' };
    expect(_isEmpty(someFunction)).toBe(true);
    done();
  });
});
