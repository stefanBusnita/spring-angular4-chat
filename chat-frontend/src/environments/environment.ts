// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  _FLASH_TIMEOUT: 3000,
  stompConnect: { protocol: 'http://', path: 'localhost', port: '8080' },
  httpConnect: { protocol: 'http://', path: 'localhost', port: '8080' },
  stompPrefixes: { endpoint: '/ws', simpleBroker: '/topic', appDestionation: '/app' }
};
