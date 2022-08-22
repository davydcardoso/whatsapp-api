import { logger } from "@/utils/logger";
import fs from "fs";
import { publicFolder } from "./multer";

function main() {
  logger.info("Checking system folders");
  fs.access(publicFolder, (err) => {
    if (err) {
      logger.error("A system directory was not found");
      fs.mkdir(publicFolder, (err) => {
        if (err) {
          logger.error("Error creating system directory");
          return;
        }

        logger.info("System directory created successfully");
      });
      return;
    }

    logger.info("Given Directory already exists");
  });
}

main();
