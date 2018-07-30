// 引入插件
var uglifyJs=require('uglifyjs-webpack-plugin');

module.exports = {

    entry: {
        main: './src/js/main.js',
        info: './src/js/info.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/out"
    },
    module: {
        rules:[
            {
                test:/.js$/,
                use:["babel-loader"]
            },{
                test:/.css$/,
                use:['style-loader','css-loader']
            },{
                test:/.jpg|png|gif|ttf|eot|svg|woff$/,
                use:['url-loader']
            }
        ]
    },
    plugins: [new uglifyJs()],
    mode: 'development'
}