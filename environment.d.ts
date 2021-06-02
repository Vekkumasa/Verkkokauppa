declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWTSECRET: string;
      GITHUB_AUTH_TOKEN: string;
      MONGODB_URI: string;
      PORT?: string;
      PWD: string;
      EMAIL: string;
      EMAILPW: string;
    }
  }
}

export {};