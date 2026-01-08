const multer = require("multer");

const storage = multer.memoryStorage();

const uploadFile = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG allowed"), false);
    }
  },
}).single("file");

module.exports = uploadFile;
