/**
 * Created by xiaobxia on 2017/6/1.
 */
const path = require("path");
module.exports = {
    entry: './_test_page/index.js',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, '1.test'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    }
};