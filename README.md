# Payhaste
[Payhaste](https://payhaste.datbotdata.com/) is live!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.
CLI command: `ng new payhaste --routing=true --style=scss --viewEncapsulation=None --packageManager=npm --inlineTemplate=false --inlineStyle=false`

## Local Initialization
Install node.js 16.10 or greater
Run `npm install`

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

A second terminal is needed to run the firebase functions emulator `cd functions`, `npm run serve`

## Build & Deploy
This project utilizes GCP and AWS.  Specifically Google's Firbase is used to host the backend and frontend while the MySQL database lives in AWS.
`firebase deploy`
`firebase deploy --only hosting`
`firebase deploy --only functions`

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Imported to github from my bitbucket account.
