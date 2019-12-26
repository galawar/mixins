// plugins for development
var gulp = require('gulp'),
	rimraf = require('rimraf'),
	pug = require('gulp-pug'),
	scss = require('gulp-sass'),
	gulpSequence = require('gulp-sequence'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	dirSync = require('gulp-directory-sync'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	sourcemaps = require('gulp-sourcemaps'),
	notify = require("gulp-notify");

var assetsDir = 'assets/',
		outputDir = 'dist/';

//----------------------------------------------------Compiling
gulp.task('pug', function () {
	return gulp.src([assetsDir + 'pug/*.pug', '!' + assetsDir + 'pug/_*.pug'])
	.pipe(plumber())
	.pipe(pug({pretty: true}))
	.on('error', notify.onError(
		{
			message: "<%= error.message %>",
			title: "PUG Error!"
		}))
	.pipe(gulp.dest(outputDir))
	.pipe(browserSync.stream({once: true}));
});

gulp.task('scss', function () {
	return gulp.src([assetsDir + 'scss/**/*.scss', '!' + assetsDir + 'scss/**/_*.scss'])
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(scss().on('error', notify.onError(
		{
			message: "<%= error.message %>",
			title: "scss Error!"
		}))
	)
	.pipe(prefix('last 3 versions'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(outputDir + 'styles/'))
	.pipe(browserSync.stream({match: "**/*.css"}));
});

//----------------------------------------------------Compiling###

//-------------------------------------------------Synchronization
gulp.task('imageSync', function () {
	return gulp.src(assetsDir + 'i/**/*')
	.pipe(plumber())
	.pipe(gulp.dest(outputDir + 'i/'))
	.pipe(browserSync.stream({once: true}));
});
//-------------------------------------------------Synchronization###


//watching files and run tasks
gulp.task('watch', function () {
	gulp.watch(assetsDir + 'pug/**/*.pug', gulp.series('pug'));
	gulp.watch(assetsDir + 'scss/**/*.scss', gulp.series('scss'));
	gulp.watch(assetsDir + 'i/**/*', gulp.series('imageSync'));
});

//livereload and open project in browser
var plugins = {
	browserSync: {
		options: {
			port: 1337,
			server: {
				baseDir: outputDir
			}
		}
	}
}

gulp.task('browser-sync', function () {
	return browserSync.init(plugins.browserSync.options);
});

gulp.task('bs-reload', function (cb) {
	browserSync.reload();
});

// --------------------------------------------If you need svg sprite
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

gulp.task('svgSpriteBuild', function () {
	return gulp.src(assetsDir + 'i/icons/*.svg')
	// minify svg
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	// remove all fill and style declarations in out shapes
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: {xmlMode: true}
	}))
	// cheerio plugin create unnecessary string '&gt;', so replace it.
	.pipe(replace('&gt;', '>'))
	// build svg sprite
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "../sprite.svg",
				render: {
					scss: {
						dest: '../../../scss/_sprite.scss',
						template: assetsDir + "scss/templates/_sprite_template.scss"
					}
				},
				example: true
			}
		}
	}))
	.pipe(gulp.dest(assetsDir + 'i/sprite/'));
});


gulp.task('default', gulp.series(gulp.parallel('pug', 'scss', 'imageSync', 'watch', 'browser-sync')));
