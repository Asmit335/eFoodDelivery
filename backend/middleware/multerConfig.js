const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileType = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedFileType.includes(file.mimetype)) {
      return cb(new Error("This fileType is not supported."));
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = { multer, storage };
