var blueprint = require ('@onehilltech/blueprint')
  , util      = require ('util')
  , fs        = require ('fs')
  , winston   = require ('winston')
  ;

function HelloWorldController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (HelloWorldController);

HelloWorldController.prototype.uploadImage = function () {
  return blueprint.app.server.upload.singleFile ('image', function (req, res) {
    blueprint.app.database.gridfs.writeFileToDatabase (req.file, function (file) {
      return res.render ('helloworld', {file : file});
    });
  });
};

HelloWorldController.prototype.getImage = function () {
  return function (req, res) {
    var imageId = req.imageId;
    blueprint.app.database.gridfs.createReadStream ({_id : imageId}).pipe (res);
  };
};

module.exports = exports = HelloWorldController;
