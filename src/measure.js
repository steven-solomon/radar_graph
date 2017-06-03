const PolarCoordinate =  require('./polar_coordinate');
class Measure {
  constructor(boundingBox, name, value) {
    this._box = boundingBox;
    this._center = this._calculateCenter(boundingBox);
    this._name = name;
    this._value = value;
  }

  point() {
    const polar = new PolarCoordinate(this._calculateHeight(), 1.58);
    const cartesian = polar.toCartesian();
    return { x: cartesian.x + this._center.x, y: cartesian.y, name: this._name };
  }

  line() {
    const x = this._box.width / 2;
    return [{type: 'M', x: x, y: 0}, {type: 'L', x: x, y: this._box.height}];
  }

  _calculateCenter(box) {
    return {x: box.width / 2, y: box.height / 2}
  }

  _calculateHeight() {
    // 10 is the height of each marker in the range
    return (this._box.height / 2) - (10 * this._value);
  }
}

module.exports = Measure;
