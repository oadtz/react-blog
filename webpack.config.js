var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

try {
    envFile(path.join(__dirname, '.env'));
} catch (e) {

}

module.exports = {
    entry: [
        'script-loader!jquery/dist/jquery.min.js',
        'script-loader!bootstrap/dist/js/bootstrap.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET)
            }
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
            './app/components',
            './app/components/layouts',
            './app/components/shared',
            './app/components/forms',
            './app/api'
        ],
        alias: {
            app: 'app',
            applicationStyles: 'app/styles/app.less'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0']
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        }]
    },
    devtool: process.env.ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};