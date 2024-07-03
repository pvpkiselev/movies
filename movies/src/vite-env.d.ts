/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_GENRES: string;
  readonly VITE_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
