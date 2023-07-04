const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
  })
  
exports.upload = multer({ storage: storage }).single('file')