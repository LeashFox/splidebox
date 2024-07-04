const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // For minification

module.exports = {
    mode: 'development', // 'development' or 'production'
    entry: './src/js/splidebox.js',
    output: {
        filename: 'splidebox.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/dist/js/',
        library: 'Splidebox', // Expose Splidebox as a global variable
        libraryTarget: 'umd', // Universal Module Definition
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    watch: true, // Enable watch mode

    // Configuration for webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // Serve files from the dist directory
        publicPath: '/dist/js/',
        watchContentBase: true, // Watch for changes in the static files
        compress: true, // Enable gzip compression
        port: 9000, // Specify the port to use
        hot: true, // Enable Hot Module Replacement
    },
};
