// First, make sure we're in an environment that has require
if (typeof require !== 'undefined') {
// Include the assertion library
var expect = require('chai').expect;

// Include the that contains the code to test
var _ = require('../html/login.html');
}

// Create describe blocks for each component
describe('login', function() {
// Create id blocks for each test
it('should iterate over properties of objects', function() {
  var obj = {
    cow: 'cow_value',
    sheep: 'sheep_value'
  };

  // Run your function
  _.each(obj, function(value, key, list) {
    // Finally, test that the behavior is correct
    expect(value).to.equal(key+'_value');
    expect(list).to.equal(obj);
  });
});
});