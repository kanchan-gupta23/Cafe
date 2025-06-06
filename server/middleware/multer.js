const multer = require("multer");

const storage = multer.memoryStorage();

const multerFiles = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true); // Correct usage
    } else {
      cb(new Error("Invalid mime type"), false); // Proper error
    }
  },
});

module.exports = multerFiles;
