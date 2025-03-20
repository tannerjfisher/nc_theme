'use strict';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpRename = require('gulp-rename');
const dartSass = require('sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const beep = require('beepbeep');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs').promises;
const path = require('path');

// Set the proxy and domain for Browsersync
// By default uses the domain defined in the projects `.env` file.
// Fallback is for those not using Lando.
const nonLandoProxy = 'http://boilerplate.localhost';
const proxy = process.env.BROWSERSYNC_PROXY || nonLandoProxy;
const domain = process.env.BROWSERSYNC_DOMAIN || 'http://localhost';
const port = process.env.BROWSERSYNC_PORT || 3000;

// Dynamically load ES Modules and cache them
let modulesPromise;
const loadESModules = () => {
  if (!modulesPromise) {
    modulesPromise = Promise.all([
      import('gulp-autoprefixer'),
      import('gulp-imagemin'),
      import('del'),
      import('gulp-noop'),
      import('gulp-filter'),
    ]).then(([autoprefixer, imagemin, del, noop, filter]) => ({
      autoprefixer: autoprefixer.default,
      imagemin: imagemin.default,
      del: del.deleteAsync,
      noop: noop.default,
      filter: filter.default
    }));
  }
  return modulesPromise;
};

// Error handler
const onError = function (err) {
  beep(); // Beep sound for error notification
  console.error('Sass Error:', err.messageFormatted || err.message || err); // Log the error message
  if (this && this.emit) this.emit('end'); // Prevent Gulp from crashing
};

// File paths
const paths = {
  settings: 'src/scss/00-base/**/*.scss',
  all: 'src/scss/**/*.scss',
  main: 'src/scss/nc_theme.scss',
  bootstrap: ['src/scss/bootstrap.scss', 'src/scss/_bootstrap-utilities.scss'],
  custom: [
    'src/scss/**/*.scss',
    '!src/scss/00-base/**/*.scss',
    '!src/scss/05-print/**/*.scss',
    '!src/scss/bootstrap.scss',
    '!src/scss/components/**/*.scss',
    '!src/scss/nc_editor.scss',
  ],
  editor: ['src/scss/nc_editor.scss'],
  print: ['src/scss/print.scss', 'src/scss/05-print/**/*.scss'],
  sass_components: 'src/scss/components/**/*.scss',
  components: 'components/**/*.scss',
  css: 'dist/css', // Destination for all compiled CSS
};

// Unified SCSS compile function
const sassBuild = async (srcPaths, production = false, destPath = paths.css) => {
  const { autoprefixer, noop, filter } = await loadESModules();
  const mainCSSFilter = filter(['dist/css/nc_theme.css', 'dist/css/bootstrap.css'], { restore: true });
  return gulp
    .src(srcPaths)
    .pipe(plumber(onError.bind(this)))
    .pipe(production ? noop() : sourcemaps.init({ largeFile: true }))
    .pipe(sassGlob())
    .pipe(
      gulpSass(dartSass)({
        outputStyle: production ? 'compressed' : 'expanded',
      })
    )
    .pipe(autoprefixer())
    .pipe(
      gulpRename((path) => {
        path.dirname = ''; // Flatten the directory structure
      })
    )
    .pipe(production ? noop() : sourcemaps.write('maps'))
    .pipe(gulp.dest(destPath)) // Use dynamic destination
    .pipe(mainCSSFilter)
    .pipe(production ? noop() : browserSync.stream())
    .pipe(mainCSSFilter.restore);
};

const sassBuildComponents = async (srcPaths, production = false) => {
  const { autoprefixer, noop, filter } = await loadESModules();
  return gulp
    .src(paths.components) // Get all component SCSS files
    .pipe(plumber(onError.bind(this)))
    .pipe(sassGlob())
    .pipe(
      gulpSass(dartSass)({
        outputStyle: production ? 'compressed' : 'expanded',
      })
    )
    .pipe(autoprefixer())
    .pipe(
      gulpRename((path) => {
        path.extname = '.css'; // Ensure correct file extension
      })
    )
    .pipe(gulp.dest((file) => file.base)) // Output to each file’s base directory
    .pipe(production ? noop() : browserSync.stream());
}

// Define named functions
function compileAllSass() {
  return sassBuild(paths.all); // Compile all SCSS into dist/css
}

function compileComponentSass() {
  return sassBuildComponents(paths.components, false, (file) => file.base); // Compile components SCSS into source directories
}

// SCSS tasks
gulp.task('sass', gulp.parallel(compileAllSass, compileComponentSass));
gulp.task('sass-bootstrap', () => sassBuild(paths.bootstrap));
gulp.task('sass-custom', () => sassBuild(paths.main));
gulp.task('sass-editor', () => sassBuild(paths.editor));
gulp.task('sass-print', () => sassBuild(paths.print));
gulp.task('sass-components', () => sassBuild(paths.sass_components, false, paths.css)); // Compile components to sass_componentsCss
gulp.task('components', () => sassBuildComponents(paths.components, false)); // Compile components to sass_componentsCss

// Webpack build task
const webpackBuild = async (production = false) => {
  const mode = production ? 'production' : 'development';
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(plumber(onError.bind(this)))
    .pipe(
      webpackStream(
        { ...webpackConfig({}, { mode }) },
        null,
        (err, stats) => {
          if (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
          } else {
            console.log(stats.toString({ colors: true }));
          }
        }
      )
    )
    .pipe(gulp.dest('dist/scripts'));
};

gulp.task('webpack-dev', () => webpackBuild(false)); // Development
gulp.task('webpack-prod', () => webpackBuild(true)); // Production

// Clean Task
gulp.task('clean', async () => {
  const { del } = await loadESModules();
  return del(['./dist/**/*']).then((paths) => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

// Assets
const imagesBuild = async () => {
  const { imagemin } = await loadESModules();
  return gulp.src('src/img/**/*').pipe(plumber(onError.bind(this))).pipe(imagemin()).pipe(gulp.dest('dist/img/'));
};

const fontsBuild = async () => {
  const srcDir = 'src/fonts';
  const destDir = 'dist/fonts';

  try {
    await fs.cp(srcDir, destDir, { recursive: true });
    console.log('Fonts copied successfully.');
  } catch (error) {
    console.error('Error copying fonts:', error);
    throw error;
  }
};

// Copy Bootstrap icons sprite
const copyBootstrapIconsSprite = async () => {
  const src = path.join('node_modules', 'bootstrap-icons', 'bootstrap-icons.svg');
  const dest = path.join('dist', 'img', 'icons');

  try {
    await fs.mkdir(dest, { recursive: true }); // Ensure the directory exists
    await fs.copyFile(src, path.join(dest, 'bootstrap-icons.svg')); // Copy the file
    console.log('Bootstrap Icons sprite copied successfully.');
  } catch (error) {
    console.error('Error copying Bootstrap Icons sprite:', error);
    throw error;
  }
};

// Copy package fonts
const copyFontsFromPackage = async (packageName) => {
  const srcDir = path.join('node_modules', packageName); // Source directory
  const destDir = path.join('dist', 'fonts', packageName); // Target directory

  try {
    await fs.mkdir(destDir, { recursive: true }); // Ensure the destination exists

    // Recursively find font files (.woff, .woff2, .eot, .ttf)
    const findFontFiles = async (dir) => {
      let results = [];
      const items = await fs.readdir(dir, { withFileTypes: true });

      for (const item of items) {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          results = results.concat(await findFontFiles(itemPath)); // Recurse into subdirectories
        } else if (item.name.match(/\.(woff2?|eot|ttf)$/)) {
          results.push(itemPath); // Collect font file path
        }
      }

      return results;
    };

    const fontFiles = await findFontFiles(srcDir);

    if (fontFiles.length === 0) {
      console.log(`No font files found in ${packageName}`);
      return;
    }

    // Copy only the font files directly into `dist/fonts/{packageName}/`
    await Promise.all(
      fontFiles.map(filePath => {
        const fileName = path.basename(filePath); // Extract only the file name
        const destPath = path.join(destDir, fileName); // Place it directly in the destination folder
        return fs.cp(filePath, destPath);
      })
    );

    console.log(`Fonts from ${packageName} copied successfully to ${destDir}`);
  } catch (error) {
    console.error(`Error copying fonts from ${packageName}:`, error);
    throw error;
  }
};

// Watch Task
gulp.task('watch', () => {

  // If BROWSERSYNC_DOMAIN variable set in lando .env file
  console.log('BROWSERSYNC_DOMAIN:' + domain);
  if (process.env.BROWSERSYNC_DOMAIN) {
    browserSync.init({
      proxy: proxy,
      socket: {
        domain: domain, // The node proxy domain you defined in .lando.yaml. Must be https?
        port: port // NOT the 3000 you might expect.
      },
      open: false,
      logLevel: 'debug',
      logConnections: true,
    });
  }
  else { // Else use the fallback.
    browserSync.init({
      proxy: proxy,
      host: '0.0.0.0',
      notify: false,
      port: 3000, // Must match Lando's exposed port
      ui: { port: 3001 }, // BrowserSync UI
    });
  }

  gulp.watch(paths.settings, gulp.series('sass'));
  gulp.watch(paths.custom, gulp.series('sass-custom', 'sass-editor'));
  gulp.watch(paths.bootstrap, gulp.series('sass-bootstrap'));
  gulp.watch(paths.editor, gulp.series('sass-editor'));
  gulp.watch(paths.print, gulp.series('sass-print'));
  gulp.watch(paths.sass_components, gulp.series('sass-components'));
  gulp.watch(paths.components, gulp.series('components')); // Watch and compile components to components CSS
  gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
  gulp.watch(['templates/**/*.twig', 'components/**/*.twig']).on('change', browserSync.reload);
  gulp.watch('src/img/**/*', gulp.series(imagesBuild)).on('unlink', (path) => console.log(`Deleted: ${path}`));
  gulp.watch('src/fonts/**/*', gulp.series(fontsBuild)).on('unlink', (path) => console.log(`Deleted: ${path}`));
});

// Default Task
gulp.task('default', gulp.series('watch'));

// Build Tasks
gulp.task(
  'build-all',
  gulp.series(
    'clean',
    imagesBuild,
    fontsBuild,
    copyBootstrapIconsSprite,
    function copyPackageFont() { return copyFontsFromPackage('bootstrap-icons'); },
    function buildSass() { return sassBuild(paths.all, true, paths.css); },
    function buildComponents() { return sassBuildComponents(paths.components, true); } // SDC
  )
);

gulp.task(
  'build-raw',
  gulp.series(
    'clean',
    imagesBuild,
    fontsBuild,
    copyBootstrapIconsSprite,
    function copyPackageFont() { return copyFontsFromPackage('bootstrap-icons'); },
    function buildSass() { return sassBuild(paths.all, false, paths.css); },
    function buildComponents() { return sassBuildComponents(paths.components, false); } // SDC
  )
);
