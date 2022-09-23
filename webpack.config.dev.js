const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");


module.exports = {

    mode: "development",

    entry: {
        main: [path.resolve(__dirname, "./src/index.jsx")],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./public/template.html"),
            filename: "index.html", // название выходного файла
            minify: false,
        }),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
     //   new ESLintPlugin(),
    ],

    devtool: "source-map",

    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },



    module: {
        rules:
            [
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-react",
                            ]
                        }
                    },
                },
                {
                    test: /\.(css)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(scss)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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

