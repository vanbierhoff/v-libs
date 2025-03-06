const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (config) => {
  config.module.rules.push({
    test: /\.theme\.css$/i,
    use: [
      "raw-loader"
      ]
  })

  return config;
}

