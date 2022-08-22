import { Request, Response } from "express";

import { Controller } from "../Controller";

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    try {
      const requestData = {
        ...request.body,
        ...request.params,
        ...request.query,
        ...request.headers,
        ...request.files,
        ...request.file,
        companyid: request.companyId,
        companySecret: request.companySecret,
      };

      const httpResponse = await controller.handle(requestData);

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
      } else if (httpResponse.statusCode === 100) {
        response.writeHead(200, {
          "Content-Type": httpResponse.fileMimeType,
          "Content-disposition": "attachment;filename=" + httpResponse.fileName,
          "Content-Length": httpResponse.fileLength,
        });

        return response.end(Buffer.from(httpResponse.body, "binary"));
      } else {
        return response.status(httpResponse.statusCode).json({
          error: httpResponse.body.error,
        });
      }
    } catch (err) {
      return response.status(500).json({
        message: `Error class: ${err.constructor} | Message: ${err.message}`,
      });
    }
  };
};
