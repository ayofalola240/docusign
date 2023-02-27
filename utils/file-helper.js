"use strict";
exports.__esModule = true;
exports.imageFileFilter = void 0;
var imageFileFilter = function (req, file, callback) {
    if (!file.originalname.match(/\.(pdf)$/)) {
        req.fileValidationError = 'only image files allowed';
        return callback(null, false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
