/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    mapbox_key: 'pk.eyJ1IjoiYnJ1bm8yMjMyIiwiYSI6ImNsZ2duazFmODBkZnAzcm8wbzdycnk3bG4ifQ.k4eDylfV8LZBbNwnVuanqw',
    google_map_api: 'AIzaSyBxvvk_EtqpixTqtt9W0_eqeXMv-aJOXVE',
  }
};
export default config;
