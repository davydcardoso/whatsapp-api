export type HttpResponse = {
  statusCode: number;
  body: any;
  fileName?: string;
  fileLength?: string;
  fileMimeType?: string;
};

type FileResponseProps = {
  fileName?: string;
  fileLength?: string;
  fileMimeType?: string;
};

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  };
}

export function okDownload<T>(dto?: T, file?: FileResponseProps): HttpResponse {
  return {
    statusCode: 100,
    body: dto,
    ...file,
  };
}

export function created(body?: Object): HttpResponse {
  return {
    statusCode: 201,
    body: body !== undefined ? body : undefined,
  };
}

export function noContent(body?: Object): HttpResponse {
  return {
    statusCode: 204,
    body: body !== undefined ? body : undefined,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

export function notAcceptable(error: Error): HttpResponse {
  return {
    statusCode: 406,
    body: {
      error: error.message,
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error) {
  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  };
}
