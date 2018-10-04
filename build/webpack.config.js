const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const root = path.resolve(__dirname, '../');
module.exports = NODE_ENV => ({
    entry: {
        // polyfill: "babel-polyfill",
        app: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        // 使用[chunkhash]时,bundle文件名是对文件内容的映射,
        // 所以如果文件没有修改,名字不变,有利于客户端的缓存策略
        filename: `./static/js/[name]${NODE_ENV === 'production' ? '.[chunkhash]' : ''}.js`
    },
    target: "web",
    resolve: {
        // 创建模块别名，在import require时使用别名会更简洁
        alias: {
            '@': path.resolve(root, 'src'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        // 当导入文件没有明确扩展名，将依次使用一下扩展名进行推测
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.png', '.vue', '.jpg']
    },
    module: {
        rules: [{
            // 使用import()动态加载代码时，
            // 需要安装"babel-plugin-syntax-dynamic-import"插件并配置
            test: /\.js$/,
            loader: "babel-loader",
            include: path.resolve(root, 'src')
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            include: path.resolve(root, 'src')
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: './static/img/[name].[ext]'
                }
            }]
        }
        ]
    },
    // 构建优化
    optimization: {
        // 代码分离，将重复代码分割提取到一个单独文件中
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        // 将webpack的运行文件提取到一个单独的文件中
        runtimeChunk: 'single'
    },
    // 监听文件更改选项
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(root, 'index.html'),
            filename: 'index.html',
            favicon: path.resolve(root, 'favicon.ico')
        }),
        // copy文件
        new CopyWebpackPlugin([{
            from: path.resolve(root, 'static'),
            to: path.resolve(root, 'dist/static')
        }]),
        new VueLoaderPlugin()
    ]
})