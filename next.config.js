const path = require('path');
const withFonts = require('nextjs-fonts');

module.exports = withFonts({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, _) {
    return config;
  },
});
