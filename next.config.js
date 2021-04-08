// next.config.js
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8'),
);

module.exports = withLess(
  {
    // cssModules: true,
    lessLoaderOptions:{
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
    },
    webpack: (config) => {
      config.resolve.alias={
        ...config.resolve.alias,
        "@/*": path.resolve(__dirname, "./"),
      }
      return config
    }
  }
)