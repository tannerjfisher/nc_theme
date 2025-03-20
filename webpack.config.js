const path = require('path');
const glob = require('glob');

// Dynamically find all `.mjs` files in the components directory
const componentEntries = glob.sync('./components/**/*.mjs').reduce((entries, filePath) => {
  const outputPath = filePath.replace('./', '').replace(/\.mjs$/, '');
  entries[outputPath] = path.resolve(__dirname, filePath);
  return entries;
}, {});

module.exports = {
  entry: {
    // Manually specified scripts
    'chosen-accessibility': path.resolve(__dirname, 'src/js/chosen-accessibility.js'),
    'slider': path.resolve(__dirname, 'src/js/slider.js'),
    'dropdown-utils': path.resolve(__dirname, 'src/js/dropdown-utils.js'),
    'external-links': path.resolve(__dirname, 'src/js/external-links.js'),
    'facets': path.resolve(__dirname, 'src/js/facets.js'),
    'nc-simple-sidebar-menu': path.resolve(__dirname, 'src/js/nc-simple-sidebar-menu.js'),
    'ui-togglers': path.resolve(__dirname, 'src/js/ui-togglers.js'),
    'popper': path.resolve(__dirname, 'node_modules/@popperjs/core/dist/umd/popper.js'),
    'alert': path.resolve(__dirname, 'node_modules/bootstrap/js/dist/alert.js'),
    'offcanvas': path.resolve(__dirname, 'node_modules/bootstrap/js/dist/offcanvas.js'),
    'collapse': path.resolve(__dirname, 'node_modules/bootstrap/js/dist/collapse.js'),
    'dropdown': path.resolve(__dirname, 'node_modules/bootstrap/js/dist/dropdown.js'),
    // Dynamically discovered `.mjs` files
    ...componentEntries,
  },
  output: {
    // Output all files relative to the project root
    path: path.resolve(__dirname),
    filename: (pathData) => {
      const isComponent = pathData.chunk.name.startsWith('components/');
      if (isComponent) {
        // Output `.mjs` files in their original directory structure
        return `${pathData.chunk.name}.js`;
      }
      // Default output directory for other scripts
      return `dist/js/${pathData.chunk.name}.min.js`;
    },
  },
  resolve: {
    extensions: ['.js', '.mjs'],
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@js': path.resolve(__dirname, 'src/js'),
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto', // For `.mjs` files
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  devtool: 'source-map',
  target: ['web', 'es5'], // Ensure ES5 compatibility
};
