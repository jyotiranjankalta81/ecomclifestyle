import multer from "multer";
import path from "path";
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const newdate = new Date().toLocaleDateString("fr-CA");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const file_path = `public/defaults/images`;
    // var file_path = path.join(__dirname, "../", "../", `public/uploads/images`);
    // if (fs.existsSync(file_path)) {
    //   fs.mkdirSync(file_path, { recursive: true });
    // }
    return cb(null, file_path);
  },
  filename: function (_req: any, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const whitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
];

const image_upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000, // 1 MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    return cb(null, true);
  },
});

export default image_upload;
