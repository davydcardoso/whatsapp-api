import path from "path";
import multer from "multer";

export const publicFolder = path.resolve(__dirname, "..", "..", "public");

export const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "file/psd": "psd",
  "application/msword": "doc",
  "audio/mpeg": "mp3",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "application/pdf": "pdf",
  "application/xml": "xml",
  "text/xml": "xml",
  "application/atom+xml": "xml",
  "application/vnd.android.package-archive": "apk",
};

export default {
  dest: publicFolder,

  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const mimetypeIsValid = MIME_TYPE_MAP[file.mimetype];

      if (!mimetypeIsValid) {
        return callback(new Error("File is not suported"), null);
      }

      callback(null, publicFolder);
    },

    filename: (request, file, callback) => {
      const fileExtension = MIME_TYPE_MAP[file.mimetype];

      const fileName = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-")
        .split(".")[0];

      callback(null, fileName + "-" + Date.now() + "." + fileExtension);
    },
  }),
} as multer.Options;
