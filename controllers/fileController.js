const Link = require('../models/Link');
const multer = require('multer');
const { generate } = require('shortid');
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
        cb(null, `${generate()}${extension}`);
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
    unlinkSync(`${__dirname}/../uploads/${req.file}`);
  } catch (error) {
    console.log(error);
  }
};

exports.download = async (req, res, next) => {
  const { file } = req.params;
  const link = await Link.findOne({ name: file });
  res.download(`${__dirname}/../uploads/${file}`);
  const { name, downloads, id } = link;
  if (downloads > 1) {
    link.downloads--;
    await link.save();
  } else {
    req.file = name;
    await Link.findOneAndRemove(id);
    next();
  }
};
