# Lupus Assets Mix
A frontend setup based upon laravel mix, webpack 3 and twig-based styleguide -
prepared for easy use with Drupal (optional).

(c) drunomics GmbH, hello@drunomics.com

## External resources
* Laravel mix documentation: https://laravel.com/docs/5./mix
* Webpack 3 documentation: https://webpack.js.org/concepts/
* Twig documentation: https://twig.sensiolabs.org/doc/2.x/

## Overview

* Assets are built using webpack 3. Laravel mix is used as configuration base
  and provides us with a fluent API for further configuration of webpack.
* Components come with SCSS, Javascript (ES6) and twig files. Optionally they
  may contain and use further resources like images or fonts.
* The app (e.g. Drupal 8) can embed and leverage components directly via Twig.
* Dependencies are managed via npm only (no bower etc).
* Javascript is written in ES6 and uses ES6 modules; e.g. see 
  http://2ality.com/2014/09/es6-modules-final.html.
* The Styleguide is based upon Silex and Twig. It's code is rather simple and
  included in the styleguide folder.
* Basic Drupal integration is provided, i.e. skeleton files for a theme based
  upon the assets are available.

### Folders

* assets: Contains generated assets only. This includes Javascript, CSS as well 
  as images, fonts etc. referenced in CSS or JS.
* styleguide: Contains the styleguide installation and config. The styleguide
  can be served from a PHP enabled webserver.
* src: Contains all the source files, that are:
  * css: Contains sass which is not component-related, i.e. mixins and general
    config.
  * js: Contains the Javascript source files (ES6) which are not component
    related, i.e. usually just basic setup. As all JS, those files are
    transpiled with Babel.
  * components: Here is the interesting part - all frontend components. Those
    are split into:
    * atom: Small, re-usable components - like links, buttons or specific form
      elements.
    * site-elements: Contains various site elements like menus and breadcrumbs.
    * layouts: Contains re-usable layouts.
    * site-regions: Contains components that represent complete site-regions
      and typically consist of smaller site-elements; e.g. header, footer or a 
      sidebar.
    * content: Various content elements; i.e. all the editorial content, its
      various display variants and lists or grids of it.
    * pages: Complete pages, showing some preview content.
* templates: Templates for use with Drupal 8. Can be deleted if not needed.
* PROJECT_* files are also skeletion files for use with Drupal 8. Can be deleted
  if not needed.
  
## Configuration overview
 
* package.json: Contains all dev-dependencies (for building) and front-end
  dependencies (CSS/SCSS, Javascript).
* The main config file is `webpack.mix.js` which configures webpack with the
  help of Laravel mix.

## Prerequisites / Setup

- Node 8.* (LTS carbon) is required 
- Optional: Manage node versions using NVM. See below for more information.
- Run `scripts/build.sh` once. This basically checks the node version and, runs
  npm install and sets up the styleguide via `composer install`. 
- For Drupal integration,

### Using NVM (Node version manager)

See https://github.com/creationix/nvm

* Installation: 
  * Follow https://github.com/creationix/nvm#install-script
  * Then run:
```
   nvm install lts/carbon
```
* Usage:
```
   # lts/carbon is configured in .nvmrc
   nvm use  
   # Switch back to the default
   nvm use system
```

## Usage

* Build assets and styleguide

  `./scripts/build.sh`
  
* Clean build

  `./scripts/clean.sh`

* Compile assets only

  * Make sure to build at least once first
  * Run `npm run build`

* Compile assets (development mode)

  * Make sure to build at least once first
  * Run `npm run build:dev`

* Development:
  * Watch (assets only)
  
    `npm run dev`
    
  * Webpack hot module replacement mode
  
    `npm run hot`
    
    See https://github.com/JeffreyWay/laravel-mix/blob/master/docs/hot-module-replacement.md 
    for more details.
 
## Usage with Drupal

For using the setup with Drupal, the whole folder can be used as a Drupal theme
with Drupal 8:

* Rename the PROJECT_* files to fir your project and adapt their content.
* Add and install "components" module: 
  https://www.drupal.org/project/components

## Styleguide usage

The styleguide just needs a PHP enabled webserver that serves the styleguide
directory. When Apache is used to serve the main app; e.g. Drupal; then the
styleguide can be accessed directly from a sub-folder; e.g. at 
/themes/your-theme/styleguide. For that to work the RewriteBase needs to be
customized in styleguide/.htaccess.
