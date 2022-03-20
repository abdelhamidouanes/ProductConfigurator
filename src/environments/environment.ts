// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// link of the developpement environnement when running 
// ng build ng build --base-href /ACE/vAngularStandard/ACE/dist/vAngularStandard/ --configuration=development --watch

export const environment = {
  production: false,
  apiLink : 'http://devt-01.compodata.eu/ACE/vAngularStandard/ACE/backend/ACE_engine.php'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
