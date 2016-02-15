class RamenSprite {
  constructor(texture, scene) {
    var material = new THREE.SpriteMaterial({ transparent: true, map: texture });
    this.sprite = new THREE.Sprite(material);
    this.scene = scene;
    this.scene.add(this.sprite);
  }

  setPosition(x, y) {
    this.position = { x: x, y: y };
    this.sprite.position.set(x, y, 0);
    return this;
  }

  setScale(scale) {
    this.sprite.scale.set(scale, scale, scale);
    return this;
  }

  startMotion(startAngle, radius, deltaAngle) {
    this.angle = startAngle;
    this.radius = radius;
    this.deltaAngle = deltaAngle;
    this._move();
    return this;
  }

  _move() {
    this.angle += this.deltaAngle;
    this.sprite.position.set(this.position.x + this.radius * Math.cos(this.angle), this.position.y + this.radius * Math.sin(this.angle), 0);
    requestAnimationFrame(this._move.bind(this));
  }

  remove() {
    this.scene.remove(this.sprite);
    this.sprite.material.map.dispose();
    this.sprite.material.dispose();
    return this;
  }
}

export default RamenSprite;