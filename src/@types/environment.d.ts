export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_URL: string;
      API_PORT: string;
      API_PREFIX: string;
      API_AMBIENT: string;
    }
  }
}
