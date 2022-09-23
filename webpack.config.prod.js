const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");







module.exports = {

    mode: "production",

    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, "./src/index.jsx")],
    },
    output: {
        filename: "[name].bundle--[fullhash:5].js",
        path: path.resolve(__dirname, "dist")
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./public/template.html"),
            filename: "index.html", // название выходного файла
            minify: true,
        }),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "[name].bundle--[fullhash:5].css",
        }),
    ],

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ]
    },
    devtool: false,

    module: {
        rules:
            [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                            ]
                        }
                    },
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    },
                },
                {
                    test: /\.(css)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(scss)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
                },
                {

                    test: /\.(png|jpeg|ttf|woff|woff2|eot)$/,
                    type: "asset",
                },
            ],
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
        },
        compress: true,
        port: 9000,
        open: true,
    },


}

