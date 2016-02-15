class RamenMesh {
  constructor(texture, scene) {
    var geometry = new THREE.PlaneGeometry(1,1);
    var material = new THREE.MeshBasicMaterial({ transparent: true, map: texture });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene = scene;
    this.scene.add(this.mesh);
  }

  setPosition(x, y) {
    this.position = { x: x, y: y };
    this.mesh.position.set(x, y, 0);
    return this;
  }

  setScale(scale) {
    this.mesh.scale.set(scale, scale, scale);
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
    this.mesh.position.set(this.position.x + this.radius * Math.cos(this.angle), this.position.y + this.radius * Math.sin(this.angle), 0);
    requestAnimationFrame(this._move.bind(this));
  }

  remove() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.map.dispose();
    this.mesh.material.dispose();
    return this;
  }
}

export default RamenMesh;