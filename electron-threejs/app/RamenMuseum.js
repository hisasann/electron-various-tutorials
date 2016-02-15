import RamenMesh from './RamenMesh';
import RamenSprite from './RamenSprite';

class RamenMuseum {
  constructor(wrapperSelector, ramenNum) {

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.wrapper = document.querySelector(wrapperSelector);
    this.wrapper.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
    this.camera = new THREE.PerspectiveCamera(75, this.wrapper.clientWidth / this.wrapper.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.ramenType = this.RAMEN_TYPE_SPRITE;
    this.ramenNum = ramenNum;
    this.ramens = [];

    let dist = 'dist';
    this.ramenURLs = [
      dist + '/images/01.jpg',
      dist + '/images/02.jpg',
      dist + '/images/03.jpg',
      dist + '/images/04.jpg',
      dist + '/images/05.jpg',
      dist + '/images/06.jpg',
      dist + '/images/07.jpg',
      dist + '/images/08.jpg',
      dist + '/images/09.jpg',
      dist + '/images/10.jpg',
      dist + '/images/11.gif',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png',
      dist + '/images/12.png'
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
    for (var i = 1; i <= this.ramenNum; i++) {
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

  setRamenNum(ramenNum) {
    if (ramenNum > this.ramens.length) {
      this._addRamen().setRamenNum(ramenNum);
    } else if (ramenNum < this.ramens.length) {
      this._removeRamen().setRamenNum(ramenNum);
    }
    this.ramenNum = ramenNum;
  }

  _addRamen() {
    let ramenTexture = this.ramenTextures[Math.floor(this.ramenTextures.length * Math.random())];
    let ramen;
    if(this.ramenType === this.RAMEN_TYPE_MESH) {
      ramen = new RamenMesh(ramenTexture, this.scene);
    } else if(this.ramenType === this.RAMEN_TYPE_SPRITE) {
      ramen = new RamenSprite(ramenTexture, this.scene);
    }
    ramen.setPosition(Math.random() * 8 - 4, Math.random() * 8 - 4).startMotion(1 * Math.random(), 1 * Math.random(), 0.5 * Math.random());
    this.ramens.push(ramen);
    return this;
  }

  _removeRamen() {
    this.ramens.pop().remove();
    return this;
  }

  _removeAllRamen() {
    while(this.ramens.length) {
      this._removeRamen();
    }
    return this;
  }

  handleResize() {
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
    this.camera.aspect = this.wrapper.clientWidth / this.wrapper.clientHeight;
    this.camera.updateProjectionMatrix();
    return this;
  }

  toggleRamenType() {
    console.log(this.RAMEN_TYPE_MESH);
    this.ramenType = this.ramenType === this.RAMEN_TYPE_MESH ? this.RAMEN_TYPE_SPRITE : this.RAMEN_TYPE_MESH;
    return this._removeAllRamen()._addAllRamen();
  }
}

RamenMuseum.prototype.RAMEN_TYPE_MESH = 'MESH';
RamenMuseum.prototype.RAMEN_TYPE_SPRITE = 'SPRITE';

export default RamenMuseum;