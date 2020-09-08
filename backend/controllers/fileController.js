const multer = require('multer');
const shortid = require('shortid');
const { unlinkSync } = require('fs');

exports.addFile = async (req, res, next) => {
  const gig = 1024 * 1024;
  const config = {
    limits: { fileSize: req.user ? gig * 10 : gig },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads');
      },
      filename: (req, file, cb) => {
        const { originalname } = file;
        const extension = originalname.substring(
          originalname.lastIndexOf('.'),
          originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };
  const upload = multer(config).single('file');
  upload(req, res, async (error) => {
    if (!error) {
      res.json({ file: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.removeFile = async (req, res) => {
  try {
    unlinkSync(__dirname + `/../uploads/${req.file}`);
  } catch (error) {
    console.log(error);
  }
};

exports.download = (req, res) => {
  const file = __dirname + '/../uploads/' + req.params.file;
  res.download(file);
};
