const path = require('path')

function resolve (p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  target: 'web',
  entry: [resolve('src/index.js')],
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    library: 'ReactConductor',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: [resolve('src')]
    }]
  },
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
