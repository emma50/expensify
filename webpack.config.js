const path = require("path")

module.exports = {
    // entry: "./src/app.js",
    entry: path.join(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, "public/scripts"),
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
                "style-loader", 
                "css-loader", 
                "sass-loader"
            ]
        }]
    },
    "devtool": "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/scripts/",
        historyApiFallback: true
      }
}

 