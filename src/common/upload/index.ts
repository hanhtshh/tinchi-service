import multer from "multer";
import path from "path";

const createUploader = () => {
  const destinationPath = path.join(__dirname, "./temp-uploads", "/");

  return multer({
    dest: destinationPath,
  });
};

export { createUploader };
