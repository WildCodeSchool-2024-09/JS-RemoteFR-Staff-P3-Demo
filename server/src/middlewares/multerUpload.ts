import path from "node:path";
import multer from "multer";

const DBPath = "assets/uploads/profile-pics";
const serverPath = path.join(__dirname, "../../public", DBPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, serverPath);
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const extension = path.extname(file.originalname);
    const randomNumber = Math.floor(Math.random() * 1000);
    const newUniqueFilename = `D${date}-R${randomNumber}${extension}`;

    cb(null, newUniqueFilename);
  },
});

const upload = multer({ storage }).single("avatar");

export { upload };
