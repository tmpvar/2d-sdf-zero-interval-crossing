var test = require('tape');
var crossing = require('./crossing');
var createSDF = require('sdf-polygon-2d');

test('against a line (y)', function(t) {

  var sdf = createSDF([[[0, 0], [10, 0]]]);

  var interval = [[5, 0], [5, 10]];
  var radius = 5;

  function sdfWithRadius(x, y) {
    return sdf(x, y) - radius;
  }

  var zero = crossing(interval, sdfWithRadius);
  t.deepEqual(zero, [[5, 5]], 'found zero crossing right on the edge');
  t.end();
});

test('against a line (-y)', function(t) {

  var sdf = createSDF([[[0, 0], [10, 0]]]);

  var interval = [[5, 0], [5, -10]];
  var radius = 5;

  function sdfWithRadius(x, y) {
    return sdf(x, y) - radius;
  }

  var zero = crossing(interval, sdfWithRadius);
  t.deepEqual(zero, [[5, -5]], 'found zero crossing right on the edge');
  t.end();
});

test('against a line (x)', function(t) {

  var sdf = createSDF([[[10, -10], [10, 10]]]);

  var interval = [[-10, 0], [10, 0]];
  var radius = 5;
  function sdfWithRadius(x, y) {
    return sdf(x, y) - radius;
  }

  var zero = crossing(interval, sdfWithRadius);

  t.deepEqual(zero, [[5, 0]], 'found zero crossing right on the edge');

  t.end();
});

test('against a line (-x)', function(t) {

  var sdf = createSDF([[[10, -10], [10, 10]]]);

  var interval = [[20, 0], [10, 0]];
  var radius = 5;
  function sdfWithRadius(x, y) {
    return sdf(x, y) - radius;
  }

  var zero = crossing(interval, sdfWithRadius);

  t.deepEqual(zero, [[15, 0]], 'found zero crossing right on the edge');

  t.end();
});

test('against a diagonal line', function(t) {

  var sdf = createSDF([[[0, 0], [10, 10]]]);

  var interval = [[0, 6.41421356], [5, 6.41421356]]
  var radius = 2;

  function sdfWithRadius(x, y) {
    return sdf(x, y) - radius;
  }

  var zero = crossing(interval, sdfWithRadius);

  t.deepEqual(zero, [[3.58578643525381, 6.41421356]], 'found zero crossing right on the edge');

  t.end();
});
