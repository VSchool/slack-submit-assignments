//DEPENDENCIES
const path = require("path");

//PLUGINS
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//ENV MODE
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    output: {
        publicPath: '/'
    },
    devServer: {
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        proxy: {
            "/": {
                target: 'http://localhost:8282', secure: false,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
            }
        }
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    cache: true,
    devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
                include: path.join(__dirname, "src"),
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loaders: ["html-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000,
                        name: "images/[hash]-[name].[ext]"
                    }
                }]
            },
            {
                test: /\.ico$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: '/'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    ]
}