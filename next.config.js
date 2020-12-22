const withCSS = require('@zeit/next-css');
module.exports = withCSS(
//   {
//     cssModules: true
//   }
);

const withSass = require('@zeit/next-sass')
module.exports = withSass({
  /* config options here */
  //cssModules: true
});

const webpack = require('webpack')
module.exports = {
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
            })
        )
        return config
    }
}

// For Next to serve any pages vs. our own API routes otherwise
// module.exports = {
//     async rewrites() {
//       return [
//         // we need to define a no-op rewrite to trigger checking
//         // all pages/static files before we attempt proxying
//         {
//           source: '/:path*',
//           destination: '/:path*',
//         },
//         {
//           source: '/:path*',
//           destination: `https://daggers.com/:path*`,
//         },
//       ]
//     },
//   }
