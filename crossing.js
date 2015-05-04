module.exports = crossing;

function crossing(interval, sdf, ret) {
  ret = ret || [0, 0];

  var axis = (interval[0][0] === interval[1][0]) ? 0 : 1;
  var other = (!axis)|0;
  ret[axis] = interval[0][axis];

  var i = [
    interval[0][other], interval[1][other],
  ];

  // first sample the sdf at each end of the interval
  var d = [
    sdf(interval[0][0], interval[0][1]),
    sdf(interval[1][0], interval[1][1])
  ];

  var ddiff = d[0] - d[1];
  var idiff = i[0] - i[1];

  console.log('ddiff:', ddiff, 'idiff:', idiff, i, d)

  var ad0 = Math.abs(d[0]);
  var ad1 = Math.abs(d[1]);

  if (ad0 > ad1) {
    var ratio = d[1] / ddiff;
    i[1] = i[1] - idiff * ratio
    console.log('i1', i[1], 'axis', other)
    ret[other] = i[1];
  } else if (ad0 < ad1) {
    var ratio = d[0] / ddiff;
    i[0] = i[0] - idiff * ratio
    console.log('i0', i[0], 'axis', other)
    ret[other] = i[0];
  } else {
    i[1] = i[0] - idiff * .5
    ret[other] = i[1];
    console.log('i0', i[1], 'axis', other)

  }

  return [ret];
}
