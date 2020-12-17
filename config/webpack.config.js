const path = require('path');

module.exports = {
    entry: './server/src/www.ts',
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    target:'node',
    resolve:{
        extensions: ['.tsx', '.ts', '.js']
    },
    output:{
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    }
};