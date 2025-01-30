import path from "node:path";
import type { Request } from "express";
import multer, { type StorageEngine } from "multer";

const DBPath = "assets/uploads/profile-pics";
const serverPath: string = path.join(__dirname, "../../public", DBPath);

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, serverPath);
  },
  filename: (req: Request, file, cb) => {
    const date = Date.now();
    const extension = path.extname(file.originalname);
    const randomNumber = Math.floor(Math.random() * 1000);
    const newUniqueFilename = `D${date}-R${randomNumber}${extension}`;

    cb(null, newUniqueFilename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile?: boolean) => void,
) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!file.mimetype.startsWith("image")) {
    return cb(new Error("Votre fichier doit être une image"));
  }

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Votre fichier doit être au format jpg, jpeg, png ou gif"));
  }
};

const upload = multer({ storage, fileFilter }).single("avatar");

export { upload };
