const mix = require('laravel-mix');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

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
        ],
      },
    },
    hmrOptions: {
      host: 'localhost',
      port: '8889',
    },
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
        enforce: 'pre',
        loader: 'import-glob-loader',
      },
      {
        test: /\.js/,
        enforce: 'pre',
        loader: 'import-glob-loader',
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          failOnWarning: process.env.NODE_ENV === 'production',
        },
      },
    ],
  },
  plugins: [
    // Ensure any style errors are shown on build fails.
    new FriendlyErrorsPlugin({
      clearConsole: false
    }),
    new StyleLintPlugin({
      context: 'src',
      files: [
        '**/*.scss',
        '**/*.vue',
      ],
      failOnError: process.env.NODE_ENV === 'production',
    }),
  ],
};
mix.webpackConfig(webpackExtraConfig);
