exports.addFile = async (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
};

exports.removeFile = async (req, res) => {};
