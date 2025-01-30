import type { RequestHandler } from "express";

const upload: RequestHandler = async (req, res) => {
  const { file } = req;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  res.status(200).json({ message: "File uploaded successfully" });
};

export default { upload };
