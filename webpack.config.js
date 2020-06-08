var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        content: './src/content.js',
        background:'./src/background.js',
        // styles: './src/styles/content.scss',
        popup: './src/popup/popup.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.scss$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    } // compiles Sass to CSS
            ]},
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
          from: 'manifest.json/',
        },
    {from: 'src/popup/popup.html'},
    {from: 'src/images/', to: 'images/'}])
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};

if (process.env.NODE_ENV === 'development') {
    module.exports.watch = true
}