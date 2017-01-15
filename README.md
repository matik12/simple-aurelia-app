# What is simple-aurelia-app?

- A simple SPA application based on Aurelia Skeleton using Typescript and JSPM (project setup includes few productivity improvements)
- Contains component for converting 4 supported currencies: PLN, USD, GBP, EUR
- Leverage api -> [http://api.nbp.pl/](http://api.nbp.pl/) to calculate money conversion

Application demo can be found [here](http://webplayground.io/simple-aurelia-app/)!

![App features](./docs/app.gif)

# Responsive design

Application is using Bootstrap to provide RWD. You can check app look and feel on different devices by entering very cool website [http://ami.responsivedesign.is/](http://ami.responsivedesign.is/)

![Responsive design](./docs/responsive-design.png)

# Jasmine JavaScript unit tests

Source code includes a few sample jasmine unit tests and code coverage results available in the **coverage** folder, after running gulp test task (Karma runner).

![Code coverage](./docs/code-coverage.png)

# How to build & deploy app

## Build

Install project tools
```shell
npm install -g gulp jspm
```

Install all project dependencies - run command in root folder of the project 
```shell
npm install
```
## Run

Run following command to start server and host app using BrowserSync. You can also use watch task for local development
```shell
gulp serve
```

## Deploy

To deploy app to the server, first bundle dependencies and export all required files by running following command
```shell
gulp export --mergeConfig
```
Now you can simply deploy files from **export** folder to the host server. Website contains only static files.

---

# Development guide

Below detail information was provided in Aurelia Skeleton app and is for development purposes and day-to-day workflow. 

## Running The App

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
  > **Note:** Gulp must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.
4. Ensure that [jspm](http://jspm.io/) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required.
5. Install the client-side dependencies with jspm:

  ```shell
  jspm install -y
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
6. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
7. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

> The Skeleton App uses [BrowserSync](http://www.browsersync.io/) for automated page refreshes on code/markup changes concurrently across multiple browsers. If you prefer to disable the mirroring feature set the [ghostMode option](http://www.browsersync.io/docs/options/#option-ghostMode) to false

## Bundling
Bundling is performed by [Aurelia Bundler](http://github.com/aurelia/bundler). A gulp task is already configured for that. Use the following command to bundle the app:

  ```shell
    gulp bundle
  ```

You can also unbundle using the command bellow:

  ```shell
    gulp unbundle
  ```

To start the bundled app, execute the following command:

  ```shell
    gulp serve-bundle
  ```
#### Configuration
The configuration is done by ```bundles.js``` file.
##### Optional
Under ```options``` of ```dist/aurelia``` add ```rev: true``` to add bundle file revision/version.

## Running The Unit Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Install Aurelia libs for test visibility:

```shell
jspm install aurelia-framework
jspm install aurelia-http-client
jspm install aurelia-router
```
3. You can now run the tests with this command:

  ```shell
  karma start
  ```

## Exporting bundled production version
A gulp task is already configured for that. Use the following command to export the app:

  ```shell
    gulp export
  ```
The app will be exported into ```export``` directory preserving the directory structure.

To start the exported app, execute the following command:

  ```shell
    gulp serve-export
  ```

#### Configuration
The configuration is done by ```bundles.js``` file.
In addition, ```export.js``` file is available for including individual files.
