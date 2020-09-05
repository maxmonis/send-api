const multer = require('multer');
const shortid = require('shortid');

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
    console.log(req.file);
    if (!error) {
      res.json({ file: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.removeFile = async (req, res) => {};
