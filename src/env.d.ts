/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_USER_ID: string;
  readonly VITE_EMAILJS_KEY: string;
  readonly VITE_EMAILJS_TEMPLATE: string;
  readonly VITE_EMAILJS_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
