var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

// html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
// 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    /*
     * 指定node_modules目录, 如果项目中存在多个node_modules时,这个很重要.
     * import js或者jsx文件时，可以忽略后缀名
     * */
    resolve: {
        modulesDirectories: ['node_modules', './node_modules'],
        extensions: ['', '.js', '.jsx'],
        unsafeCache: true
    },
    resolveLoader: {
        modulesDirectories: ['node_modules', './node_modules']
    },

    entry: {
        index: './app/main.jsx',
        vendor: ['react', 'react-dom', 'react-router', 'classnames']
    },
    cache: true,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[chunkHash:8].js",
        publicPath: '',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.jsx$/,
                loader: 'babel',
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, "./app"),
                loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader",
            }, {
                test: /\.css$/,
                exclude: path.resolve(__dirname, "./app"),              
                loader: "style-loader!css-loader!postcss-loader",
            }, {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url?limit=10000',
            }, {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            }, {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
               
        ]
    },
    postcss: [ 
        autoprefixer({ browsers: ['last 3 versions', 'ie >= 9',] }) 
        ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            title: 'React & Antd',
            filename: './index.html', //生成的html存放路径，相对于path
            // template: './index.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: false, //为静态资源生成hash值
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            chunksSortMode: 'dependency'
        })
    ]
};

module.exports= webpackConfig;
