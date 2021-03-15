declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      MONGODB_URI: string;
      PORT?: string;
      PWD: string;
    }
  }
}

export {};