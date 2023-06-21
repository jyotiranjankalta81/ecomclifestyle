"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const newdate = new Date().toLocaleDateString("fr-CA");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const file_path = `public/uploads/${newdate}`;
        var dir = path_1.default.join(__dirname, '../', '../', `public/uploads/${newdate}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        return cb(null, file_path);
    },
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/avif',
];
const image_upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1 MB
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'));
        }
        return cb(null, true);
    }
});
exports.default = image_upload;
//# sourceMappingURL=multar_upload.js.map