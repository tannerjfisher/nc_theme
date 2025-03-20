# Northern Boilerplate Theme

A default theme that integrates a configurable state of the Bootstrap framework via Sass to provide a thoughtful starting state for theme development.

## Requirements
- **Node version** `20.x`. Highly recommended to use [nvm](#node-version-requirements).

## Installation
run `npm install` to install dependencies

## Scripts
`npm run start`
- This will run the default gulp task which is **watch** to watches for changes to source files and re-compiles them to dist upon change.
- This also starts **Webpack** to watch for script changes and re-compile in development mode.
- This will also initialize a browsersync instance using the base url of your local site defined in **config.json** in the root of the theme. A new tab will open in your browser on port 3000 and updating your theme files will trigger a refresh/reload in this tab.

`npm run build-dev`
- This task removes all files in the **dist** directory, then re-compiles all assets.

`npm run build`
- This task removes all files in the **dist** directory, then re-compiles all assets for production (**.map** files are emitted and all compiled code is minified).

`npm run lint:sass`
- Lints sass files within the **/src/scss** directory of the theme. Uses the configuration at **.stylelintrc** which overrides some rules. Flags will output to the terminal.

`npm run fix:scss`
- Will fix some linting errors if it deems them fixable without manual review.

## Node Version Requirements
The theme build tools should be used with the current LTS (Long Term Support) version of Node.
It's recommended to use NVM for switching your node version with ease.

**NVM**
Ensure you are in the root of the theme directory in your terminal tab and run `nvm use`.
This will either switch you to the version required by the theme if you've already installed that version via nvm, or prompt you with a command to install the required version.
The `.nvmrc` file in the root of the theme allows for easy switching to the required version of node in your current terminal tab.

## Browsersync Configuration
This theme makes use of the Browsersync node module. Upon running `npm run start` the gulp tasks should instantiate an instance of Browsersync, utilizing the `nonLandoProxy` defined in `gulpfile.cjs`. The proxy should be the base URL of your local site (e.g. `http://yoursite.localhost`).

Our browsersync configuration injects CSS changes to most `SCSS` in the theme directly into the browser, so that you do not need to refresh the page each time a change is made.

Browsersync will also auto refresh the page when javascript or twig changes are made.

**Note:** Most browsers cache CSS, so you may need to have your browsers DevTools open while working that that CSS can be injected and your changes take immediately.
If the lines above do exist check your devtools settings in the browser and check the box *"Disable cache (while DevTools is Open)"* under *"Network"* to ensure the browser does not cache the css files that Browsersync is trying to update.

### Browsersync + Lando
By default, when gulp initializes Browsersync it sets the site `proxy`, `domain` and `port` from the following variables defined in the projects `.lando/.env` file:
```
BROWSERSYNC_PROXY=http://appserver
BROWSERSYNC_DOMAIN=https://bs.yoursite.lndo.site
BROWSERSYNC_PORT=80
```
If you're using Lando for local development it will just use this by default. If these variables are not defined, add them. You should just need to update the `BROWSERSYNC_DOMAIN` to match your site.

You will want to ensure that the project's node service proxy in `.lando.yml` and the `BROWSERSYNC_DOMAIN` environment variable match:
```YAML
proxy:
  node:
    - bs.yoursite.lndo.site:3000
```

### Starting Browsersync to watch for changes
After lando has finished building the app, run `lando npm start` from the **root of the theme** to start watching for changes and initialize Browsersync. If you're not using Lando, run `npm run start`.

Now visit the Browsersync URL in browser to utilize the functionality. Change a style at `src/scss/01-atoms/_text.scss` like adding `body { background-color: black !important; }` and save the file to test. You should see the style take effect via hot reload and the terminal output should look like this:
```shell
[24:24:56] Starting 'sass-custom'...
[24:24:56] Finished 'sass-custom' after 2.52 ms
[24:24:56] Starting 'sass-editor'...
[24:24:56] Finished 'sass-editor' after 1.78 ms
[Browsersync] 1 file changed (nc_theme.css)
```

For more information about this approach [see the source here](https://docs.lando.dev/plugins/node/v/v1.2.1/guides/using-browsersync.html).

## Twig Debug Configuration for Theme Development

The following configuration can be added to your `development.services.yml` file to enable Twig debugging in a Drupal environment:

```yaml
parameters:
  twig.config: {
    debug: true
  }
```

### What This Does

- **`debug: true`**
  - Enables debugging features in Twig, allowing you to see template suggestions and file paths in the rendered HTML.
  - **Automatically sets:**
    - `auto_reload: true` – Ensures templates are recompiled when they change.
    - `cache: false` – Disables Twig caching so changes are immediately reflected.

- **`cache: true`**
  - Keeps caching enabled, which can be useful for performance while still allowing debugging.

### More Information

- **[Debugging Twig Templates](https://www.drupal.org/docs/develop/theming-drupal/twig-in-drupal/debugging-twig-templates)**  
  Learn more about how to enable and use Twig debugging.

- **[Debugging Compiled Twig Templates](https://www.drupal.org/docs/develop/theming-drupal/twig-in-drupal/debugging-compiled-twig-templates)**  
  If you're working with precompiled templates, this guide provides deeper insights.


## Debugging Twig with XDebug

In order to debug using XDebug in Twig, you must ensure that the twig cache is enabled in `development.services.yml`, as the compiled templates are needed for debugging:
```yaml
parameters:
  twig.config: {
    debug: true,
    cache: true
  }
```
**Note:** If you leave this on during development, your twig templates may be cached to a degree that even a `drush cr` can not clear. It's advised to only set this if you're debugging twig templates with xdebug. 

## Additional Configuration

To ensure that your styling and script changes immediately take in browser, make sure your `settings.local.php` file has the following lines:

```PHP
/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```

For faster development and to avoid having to flush the drupal cache when you change files (you will still need to flush the cache when you add new files) ensure the following is uncommented in `settings.local.php`: 

```PHP
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null'; 
```

## Maintainers
Current maintainers:
* Tanner Fisher (tfisher@northern.co)
