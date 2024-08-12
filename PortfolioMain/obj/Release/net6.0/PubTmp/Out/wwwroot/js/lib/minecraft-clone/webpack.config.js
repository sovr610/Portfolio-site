const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './MinecraftWorld.js',
  output: {
    filename: 'minecraft-world.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MinecraftWorld',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /ChunkWorker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  resolve: {
    extensions: ['.js']
  },
  externals: {
    'simplex-noise': {
      commonjs: 'simplex-noise',
      commonjs2: 'simplex-noise',
      amd: 'simplex-noise',
      root: 'SimplexNoise'
    }
  }
};