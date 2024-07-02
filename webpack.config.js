const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // For minification

module.exports = {
    mode: 'production', // or 'development' for development mode
    entry: './src/js/splidebox.js',
    output: {
        filename: 'splidebox.min.js',
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
};
