# Chatfirebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## Add Firebase config to environments variable

Open `/src/environments/environment.ts` and add your Firebase configuration. You can find your project configuration in [the Firebase Console](https://console.firebase.google.com). Click the Gear icon next to Project Overview, then click Project Settings and under "Firebase SDK snippet" click Config.

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```


## Resources

More information: [AngularFire](https://github.com/angular/angularfire) and [Firebase CloudFirestore](https://firebase.google.com/docs/firestore)
