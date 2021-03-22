const withFonts = require("nextjs-fonts");
const path = require("path");

module.exports = withFonts({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config, _options) {
    return config;
  },
});
