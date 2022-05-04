const path = require('path');

module.exports = {
  devtool: 'eval-source-map',   // debug ts files
  entry: './src/index.ts',      // top order file (entry file)
  module: {
    rules: [                    // rules for which files to compile
      {
        test: /\.ts$/,          // regex for '.ts' files
        include: [path.resolve(__dirname, 'src')],  // relative path to 'src'
        use: 'ts-loader',       // which loader to use
      }
    ]
  },
  resolve: {                    // which files we can import from (to the entry file)
    extensions: ['.ts', '.js'],
  },
  output: {                     // output directory
    publicPath: 'dist',         // which directory
    filename: 'bundle.js',      // ooutput file name
    path: path.resolve(__dirname, 'dist'),  // absolute path to dist directory
  },
};