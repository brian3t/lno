# Live N Out mobile app

Cloned from https://github.com/framework7io/framework7-appstore-react

npm install --global cross-env &&
yarn install

create src/js/conf.js

then npm run build-dev
and npm start

In babel.config.js, need to add plugin:    "@babel/plugin-proposal-class-properties"
If want additional F7 components, un-comment it in `framework7-custom.js`

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build-dev` - build web app using development mode (faster build without minification and optimization)
* 🔧 `build-prod` - build web app for production

## WebPack

There is a webpack bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Webpack config located in `build/webpack.config.js`.

Webpack has specific way of handling static assets (CSS files, images, audios). You can learn more about correct way of doing things on [official webpack documentation](https://webpack.js.org/guides/asset-management/).

## PWA

This is a PWA. Don't forget to check what is inside your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.

## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```

## Main views
Some important views are:
App.jsx : we initialize f7 here, with panels, bottom tab, views and navbar
Views:
 EventCards: the main page view, that lists all events

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 React Documentation](https://framework7.io/react/)
* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)


## To debug webpack:
In Chrome devtools, go to Source
Under webpack://
./
&nbsp;&nbsp;src/
&nbsp;&nbsp;&nbsp;&nbsp;component/
&nbsp;&nbsp;&nbsp;&nbsp;js/
