export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_URL: string;
      API_PORT: string;
      API_PREFIX: string;
      API_AMBIENT: string;
      FILE_SUBMISSION_TO_AWS_S3_ENABLED: boolean;
      AWS_BUCKET_NAME: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_DB: string;
      REDIS_PASS: string;
      EMAIL_HOST: string;
      EMAIL_PORT: number;
      EMAIL_USER: string;
      EMAIL_PASS: string;
      EMAIL_TLS: boolean;
      JWT_SECRET: string;
      NO_GUI_SYSTEMS: boolean;
      DELETE_FILES_AFTER_UPLOAD: boolean;
      SHOW_SQL_SCRIPTS: boolean;
      SHOW_QRCODE_IN_TERMINAL: boolean;
    }
  }
}
