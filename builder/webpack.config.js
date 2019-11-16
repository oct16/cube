const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.module\.(styl|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]-[hash:base64:5]',
                                // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                context: path.resolve(__dirname, '../src'),
                                hashPrefix: 'my-custom-hash'
                            }
                        }
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff\d?|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[sha512:hash:base64:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.pug'),
            filename: 'index.html',
            title: 'Cube Demo',
            meta: {
                'UTF-8': { charset: 'UTF-8' },
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }
            },
            env: process.env
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
            '~': path.resolve(__dirname, '../node_modules/')
        },
        extensions: ['.tsx', '.ts', '.js', '.styl', '.stylus', '*']
    }
}
