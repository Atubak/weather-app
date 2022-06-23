const path = require('path');
// htmlplugin creates its own html file in the output folder with links to all js files.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode has to be development when building a page to use tools
  //   CHANGE IT TO PRODUCTION WHEN FINISHED
  mode: 'development',
  //   files processed from source
  entry: {
    index: './src/index.js',
  },
  //   tool to show the original src file in which an error originates on your page.
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'htmlpagetitle',
    }),
  ],
  output: {
    //   takes the src name and incorporates it in the distributed file
    filename: '[name].bundle.js',
    // 'docs' here, default is 'dist'. docs bc it works with github pages
    path: path.resolve(__dirname, 'docs'),
    // cleans the docs/dist folder of unused files
    clean: true,
  },
  //   optional things to let webpack process stuff other than js.
  //    make sure to npm install the loaders for these rules if necessary!
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // images dont need npm installs
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // fonts dont need them either
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

    ],
  },
};
