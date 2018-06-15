var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
    rsync         = require('gulp-rsync'),
    imagemin      = require('gulp-imagemin'),
    spritesmith   = require('gulp.spritesmith'),
    pug           = require('gulp-pug'),

    config = {
      baseDir: 'app',
      src: {
        templateFiles: 'app/template/*.pug',
        templateFilesToWatch: 'app/template/**/*.pug',
        styleFiles: 'app/scss/**/*.scss',
        javascriptFiles: [
          'app/libs/jquery/dist/jquery.min.js',
          'app/libs/slick-carousel/slick/slick.js',
          'app/libs/bootstrap/js/dist/util.js',
          'app/libs/bootstrap/js/dist/modal.js',
          'app/js/common.js', // Always at the end
        ],
        images: 'app/img/**/*.*'
      },
      dist: {
        templateFiles: 'app',
        styleFiles: 'app/css',
        javascriptFiles: 'app/js',
        javascriptName: 'scripts.min.js',
        images: 'app/img'
      },
      icons: {
        cssClassPrefix: 'icons',
        spriteName: 'icons-sprite.png',
        inputFolder: 'app/img/icons',
        outputFolder:  'app/img',
        outputCssFolder: 'app/scss',
        outputCssName: '_sprite-icons.scss',
        cssPathBase: '../img/'
      }
    };

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: config.baseDir
		},
		notify: false,
		open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('pug', function() {
  return gulp.src(config.src.templateFiles)
  .pipe(pug())
  .pipe(gulp.dest(config.dist.templateFiles))
  .pipe(browserSync.stream());
});

gulp.task('styles', function() {
	return gulp.src(config.src.styleFiles)
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest(config.dist.styleFiles))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src(config.src.javascriptFiles)
	.pipe(concat(config.dist.javascriptName))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest(config.dist.javascriptFiles))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('sprites', function () {
  var iconsData =
    gulp.src(config.icons.inputFolder + '/*.*')
      .pipe(spritesmith({
        imgName: config.icons.spriteName,
        cssName: config.icons.outputCssName,
        imgPath: config.icons.cssPathBase + config.icons.spriteName,
        algorithm: 'binary-tree',
        padding: 10,
        cssSpritesheetName: config.icons.cssClassPrefix
  }));
  iconsData.css.pipe(gulp.dest(config.icons.outputCssFolder));
  iconsData.img.pipe(gulp.dest(config.icons.outputFolder));
});

gulp.task('imagemin', function() {
	gulp.src(config.src.images)
	.pipe(gulp.dest(config.dist.images)); 
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', ['styles', 'js', 'pug', 'sprites', 'browser-sync'], function() {
	gulp.watch(config.src.styleFiles, ['styles']);
  gulp.watch(config.src.javascriptFiles, ['js']);
  gulp.watch(config.src.templateFilesToWatch, ['pug']);
  gulp.watch(config.icons.inputFolder + '/*.*', ['sprites', 'styles']);
  // gulp.watch(config.src.images, ['imagemin']);
	gulp.watch(config.baseDir + '/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
