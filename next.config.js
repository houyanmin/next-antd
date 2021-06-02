// next.config.js
const withAntdLess = require('next-plugin-antd-less')
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8'),
);


module.exports = withAntdLess({
  // modifyVars: themeVariables,
  // optional
  lessLoaderOptions: {
    modifyVars: themeVariables,
    javascriptEnabled: true,
    // modules: false
  },
  // Other Config Here...
  webpack(config) {
    config.resolve.alias={
      ...config.resolve.alias,
      "@/*": path.resolve(__dirname, "./"),
    }
    return config
  }
})
