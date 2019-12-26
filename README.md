## Get started
1. Install [node.js](https://nodejs.org/) and gulp globally

		npm install gulp -g

2. Install npm packages. If you have problems in browser-sync install on Windows look [here](http://www.browsersync.io/docs/#windows-users)

		npm i

	If you use link of global packages:

		npm install gulp rimraf gulp-pug gulp-sass gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-sequence gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace gulp-notify -g

		npm link gulp rimraf gulp-pug gulp-sass gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-sequence gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace gulp-notify

3. Let's code!

		gulp

4. Edit files in assets folder, see result in dist folder. If you want to build optimized version of project run :

		gulp build

5. Command for html validation

		gulp validation

6. Lint your styles

		gulp cssLint

## How to make svg-sprite
1. Install packages

		npm install gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -g
        
		npm link gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace
        
2. Put your icons into `/assets/i/icons` folder
3. Uncomment task `svgSpriteBuild`
4. Run task `svgSpriteBuild`
5. Now you have `sprite.svg` in `/assets/i/sprite` folder. By default you have `svg4everybody` script in your js. Also you have scss file `_sprite.scss` for styling sprite.
6. Add `svg4everybody` in your `main.js` file. For including icons use pug mixin "icon"

```
$(document).ready(function () {
	svg4everybody({});
});
```