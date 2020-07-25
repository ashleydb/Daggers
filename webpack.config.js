//On the command line we just need to call webpack
// which will use this config to build app.jsx and dependencies into bundle.js,
// having babel convert our jsx into js through react.

var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');
const workboxPlugin = require('workbox-webpack-plugin');

// For Workbox plugin, for ServiceWorkers
const DIST_DIR = 'public';

// Will be 'production' on heroku, but missing locallaly so we'll set to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the relevant environment vars from the config folder, (if the file exists)
envFile(path.join(__dirname, `config/${process.env.NODE_ENV}.env`), {raise: false});

// For replacing strings within the content at build time
const properties = require(path.join(__dirname, 'app/config/properties.json'));
const StringReplacePlugin = require('string-replace-webpack-plugin');
const string_replacement_loader = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /\{-{(.*)}-}/g,
      replacement: function (match, p1, offset, string) {
        return eval(`properties.${p1}`);
      }
    }
  ]});

module.exports = {
  entry: [
    'babel-polyfill',
    //Where script-loader!, (or style! or css! etc.) are used, that means use a loader, (e.g. script-loader module,) to pull in these files.
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    //If webpack finds reference to $ or jQuery in our code, load in the jquery module.
    new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      // A common mistake is not stringifying the "production" string, to save doing the lookup in prod
      //'process.env.NODE_ENV': JSON.stringify('production')
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        FIREBASE_SERVICE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_SERVICE_PROJECT_ID),
        FIREBASE_SERVICE_PRIVATE_KEY_ID: JSON.stringify(process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID),
        FIREBASE_SERVICE_PRIVATE_KEY: JSON.stringify(process.env.FIREBASE_SERVICE_PRIVATE_KEY),
        FIREBASE_SERVICE_CLIENT_EMAIL: JSON.stringify(process.env.FIREBASE_SERVICE_CLIENT_EMAIL),
        FIREBASE_SERVICE_CLIENT_ID: JSON.stringify(process.env.FIREBASE_SERVICE_CLIENT_ID),
        FIREBASE_SERVICE_CLIENT_X509_CERT_URL: JSON.stringify(process.env.FIREBASE_SERVICE_CLIENT_X509_CERT_URL),
        GOOGLE_CLOUD_STORAGE_BUCKET: JSON.stringify(process.env.GOOGLE_CLOUD_STORAGE_BUCKET),
        AUTH_SECRET: JSON.stringify(process.env.AUTH_SECRET),
        AUTH_USERNAME: JSON.stringify(process.env.AUTH_USERNAME),
        AUTH_PASSWORD: JSON.stringify(process.env.AUTH_PASSWORD),
        LEAGUE_TABLE_URL: JSON.stringify(process.env.LEAGUE_TABLE_URL)
      }
    }),
    new StringReplacePlugin(),
    new workboxPlugin({
      globPatterns: ['**\/*.{html,js,css,png,ico,json}'],
      //globIgnores: ['admin.html'],
      //swSrc: './src/sw.js',
      swDest: path.join(DIST_DIR, 'sw.js'),
    })
  ],
  output: {
    path: path.resolve(__dirname, DIST_DIR),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      './app/components/',
      './app/api/'
    ],
    alias: {
      //The resolve.alias settings means we can just require <name> rather than './component/<name>'
      app: path.resolve(__dirname, 'app/'), // This one lets you import anything as 'app/<folder>/<file>'
      applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
      actions: path.resolve(__dirname, 'app/actions/actions.jsx'),
      reducers: path.resolve(__dirname, 'app/reducers/reducers.jsx'),
      configureStore: path.resolve(__dirname, 'app/store/configureStore.jsx')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        //rules.test is a regex to see which files this loader should apply to.
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          string_replacement_loader
        ]
      },

      // {
      //   test: /\.scss$/,
      //   include: [
      //     path.resolve(__dirname, './node_modules/foundation-sites/scss')
      //   ],
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader",
      //     string_replacement_loader
      //   ]
      // },

      // {
      //     test: /\.scss$/,
      //     include: [path.resolve(__dirname, './node_modules/foundation-sites/scss')],
      //     use: [
      //       {loader: "style-loader"},
      //       {loader: "css-loader"},
      //       {
      //         loader: "sass-loader"
      //         // options: {
      //         //   sassOptions: {includePaths: [path.resolve(__dirname, './node_modules/foundation-sites/scss')]}
      //         // }
      //       },
      //       {loader: string_replacement_loader}
      //     ]
      // },

      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader'
      //     },
      //     {
      //       loader: 'sass-loader'
      //     },
      //     {
      //       loader: string_replacement_loader
      //     }
      //   ]
      // },

      {
          test: /\.scss$/,
          //include: [path.resolve(__dirname, './node_modules/foundation-sites/scss')],
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                    includePaths: [path.resolve(__dirname, './node_modules/foundation-sites/scss')]
                }
              }
            },
            {
              loader: string_replacement_loader
            }
          ]
      },


      // {
      //   test: /\.css$/,
      //   // include: [
      //   //   path.resolve(__dirname, './node_modules/foundation-sites/scss')
      //   // ],
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     string_replacement_loader
      //   ]
      // },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          // {
          //   loader: 'sass-loader'
          // },
          {
            loader: string_replacement_loader
          }
        ]
      },


      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  // sassLoader: {
  //   includePaths: [
  //     path.resolve(__dirname, './node_modules/foundation-sites/scss')
  //   ]
  // },
  //'eval-source-map' lets us debug the code as written, rather than in bundle.js.
  // Only applies during development, since it is a devtool setting.
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
}
