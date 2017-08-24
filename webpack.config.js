const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = {
    entry: './assets/js/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './assets/html/vote.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([
            { from: './assets/html/reset.html' },
            { from: './assets/html/results.html' },
            { from: './assets/html/shouldcountips.html' },
        ]),
    ],
}

module.exports = config
