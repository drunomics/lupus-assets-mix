let mix = require('laravel-mix');

/**
 * Basic settings.
 */
mix
  .setPublicPath('assets')
  .setResourceRoot('/assets/')
  .options({
    processCssUrls: true,
    uglify: {},
    purifyCss: false,
    clearConsole: false,
    autoprefixer: {
      options: {
        browsers: [
          'last 2 versions',
          'IE >= 11',
          'Safari >= 8',
        ]
      }
    },
    hmrOptions: {
      host: 'localhost',
      port: '8889'
    }
  });

/**
 * Configure css & js files.
 */
mix
  .js('src/js/main.js', '.')
  .sass('src/css/main.scss', '.');

/**
 * Customize webpack config.
 */
const webpackExtraConfig = {
  module: {
    rules: [
      // Add support for sass import globbing.
      {
        test: /\.scss/,
        enforce: "pre",
        loader: "import-glob-loader",
      },
    ],
  },
  plugins: [],
};
mix.webpackConfig(webpackExtraConfig);
