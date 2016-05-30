import RamenMesh from './RamenMesh';

class RamenMuseum {
  constructor(wrapperSelector) {

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.wrapper = document.querySelector(wrapperSelector);
    this.wrapper.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
    this.camera = new THREE.PerspectiveCamera(60, this.wrapper.clientWidth / this.wrapper.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    let dist = 'dist';
    this.ramenURLs = [
      dist + '/01.jpg'
    ];

    this._createRamenTextures().then((textures) => {
      this.ramenTextures = textures;
      this._addAllRamen();
    });

    this.stats = new Stats();
    this.stats.setMode(0); // 0: fps, 1: ms, 2: mb

    // align top-left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';

    this.wrapper.appendChild(this.stats.domElement);

    this._render();
    return this;
  }

  _createRamenTextures() {
    return new Promise((resolve, reject) => {
      Promise.all(this.ramenURLs.map((url) => {
        return new Promise((resolve, reject) => {
          new THREE.TextureLoader().load(url, resolve);
        });
      })).then((textures) => {
        resolve(textures)
      })
    })
  }

  _addAllRamen() {
    for (var i = 0; i < this.ramenURLs.length; i++) {
      this._addRamen();
    }
    return this;
  }

  _render() {
    this.stats.begin();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
    requestAnimationFrame(this._render.bind(this));
  }

  _addRamen() {
    let ramenTexture = this.ramenTextures[Math.floor(this.ramenTextures.length * Math.random())];
    let ramen = new RamenMesh(ramenTexture, this.scene);
    ramen
      .setPosition(0, 0)
      .startMotion(1 * Math.random(), 1 * Math.random(), 0.5 * Math.random());
    return this;
  }
}

export default RamenMuseum;