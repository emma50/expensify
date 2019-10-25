const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    console.log("env:", env)
    const isProduction = env === "production"
    const CSSExtract = new MiniCssExtractPlugin({
        filename: "styles.css"
    })

    return {
        // entry: "./src/app.js",
        entry: path.join(__dirname, 'src/app.js'),
        output: {
            path: path.join(__dirname, "public/dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/      
            }, {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, "public"),
                        }
                    },{
                       loader:  "css-loader",
                       options: {
                           sourceMap: true
                       }
                   },{
                       loader: "sass-loader",
                       options: {
                            sourceMap: true
                       }
                   }      
                ]
            }]
        },
        plugins: [
            CSSExtract
        ],
        "devtool": isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: "/dist/",
            historyApiFallback: true
          }
    }
}



 