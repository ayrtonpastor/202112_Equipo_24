// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const host = 'floating-tor-20058.herokuapp.com';

export const environment = {
  production: false,
  baseUrl: `https://${host}/`
};