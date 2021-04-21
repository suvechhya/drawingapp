const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/main.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        alias: {}
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "./src/app")],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
        {
            test: /\.ttf$/,
            use: [
                {
                    loader: 'ttf-loader',
                    options: {
                        name: './assets/fonts/[name].[ext]',
                    },
                },
            ]
        },
        {
            test: /\.(sass|less|css)$/,
            loaders: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|svg)$/,
            loaders: ['file-loader']
          }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './app/',
        writeToDisk: true
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyWebpackPlugin({patterns:[
            {
                //Note:- No wildcard is specified hence will copy all files and folders
                from: 'app/images', //Will resolve to RepoDir/src/assets 
                to: 'images' //Copies all files from above dest to dist/assets
            },
            {
                //Wildcard is specified hence will copy only css files
                from: 'app/css', //Will resolve to RepoDir/src/css and all *.css files from this directory
                to: 'css'//Copies all matched css files from above dest to dist/css
            }
        ]})
    ],
};
