module.exports = {
  "files": [
    "*.svg"
  ],
  "fontName": "Icon",
  "cssTemplate": require('webfonts-generator').templates.scss,
  "classPrefix": "icon-",
  "baseSelector": ".icon",
  "fixedWidth": true,
  "types": ["eot", "woff", "ttf", "svg"],
  "fileName": "font/[fontname].[hash].[ext]"
}