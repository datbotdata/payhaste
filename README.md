# Payhaste
[Payhaste](https://payhaste.datbotdata.com/)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.
CLI command: ng new payhaste --routing=true --style=scss --viewEncapsulation=None --packageManager=npm --inlineTemplate=false --inlineStyle=false

## Local Initialization
Install node.js 16.10 or greater
Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

A second terminal is needed to run the firebase functions emulator `cd functions`, `npm run serve`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

This project utilizes GCP and AWS.  Specifically Google's Firbase is used to host the backend and frontend while the database lives in AWS.
`firebase deploy`
`firebase deploy --only hosting`
`firebase deploy --only functions`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
