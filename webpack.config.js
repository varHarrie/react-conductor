const path = require('path')
const webpack = require('webpack')

function resolve (p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    filename: 'index.js',
    path: resolve('dist'),
    publicPath: 'dist/',
    library: 'ReactConductor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: resolve('src'),
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }]
  },
  resolve: {
    extensions: ['.tsx','.ts', '.js', '.less']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  externals: {
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router'
    },
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
}
