const multer = require('multer')

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/tmp/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-art_works-${file.originalname}`)
  },
})

var uploadFile = multer({ storage: storage, fileFilter: imageFilter })
module.exports = uploadFile