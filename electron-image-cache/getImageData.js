const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');

// http://stackoverflow.com/questions/9540978/nodejs-how-to-read-and-output-jpg-image

// http://stackoverflow.com/questions/169008/regex-for-parsing-directory-and-filename
const pathExpr = new RegExp('^(.+?)://(.+?):?(\d+)?(/.+)?/([^/]+)([\?#;].*)?$$');

var options = {
  isBase64: false
};

const getImageData = function(arg, cachePath, imagePath) {
  this.imageUrl = arg;
  this.cachePath = cachePath;

  const parseExpr = this.imageUrl.match(pathExpr);

  this.imagePath = imagePath + parseExpr[4];
  this.filename = parseExpr[5];

  this.absolutePath = [this.cachePath, this.imagePath, '/', this.filename].join('');

  var readPromise = this.accessImage();
  var self = this;
  return new Promise(function(resolve, reject) {
    readPromise.then(function (data) {
      // already exist
      console.log('already exist');

      var getPromise = self.readImage();

      getPromise.then(function (data) {
        resolve(data);
      });
    }, function () {
      // not exist
      console.log('not exist');

      var requestPromise = self.requestImage();
      requestPromise.then(function () {
        var getPromise = self.readImage();

        getPromise.then(function (data) {
          resolve(data);
        });
      });
    });
  });
};

getImageData.prototype.accessImage = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    fs.access(self.absolutePath, fs.R_OK, function(err) {
      if (err) {
        reject();
        return;
      }

      resolve();
    });
  });
};

getImageData.prototype.readImage = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    // return file path
    if (!options.isBase64) {
      resolve(self.absolutePath);
      return;
    }

    // return base64 string
    fs.readFile(self.absolutePath, (err, data) => {
      if (err) {
        reject();
        return;
      }

      resolve('data:image/jpeg;base64,' + new Buffer(data).toString('base64'));
    });
  });
};

getImageData.prototype.requestImage = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    request(
      {method: 'GET', url: self.imageUrl, encoding: null}, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          // make images directory
          mkdirp(self.cachePath + self.imagePath, function (err) {
            if (err) {
              console.error(err)
            }

            // save image
            var writePromise = self.writeImage(body);
            writePromise.then(function () {
              resolve();
            });
          });
        }
      }
    );
  });
};

getImageData.prototype.writeImage = function(body) {
  var self = this;
  return new Promise(function(resolve, reject) {
    fs.writeFile(self.absolutePath, body, 'binary', function() {
      resolve();
    });
  });
};

module.exports = getImageData;
