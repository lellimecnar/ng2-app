import Gulp from 'gulp';
import GulpPlugins from 'gulp-load-plugins';
import Path from 'path';
import Nib from 'nib';
import {extend} from 'lodash';

var $ = GulpPlugins(),
	PATHS = {
		SRC: './src',
		DEST: './pub',
		JS: '**/*.js',
		HTML: '**/*.html',
		STYL: '**/*.styl',
		LIB: './src/lib'
	},
	CONFIG = {
		GLOB: {
			cwd: PATHS.SRC
		},
		USING: {
			prefix: '\t',
			color: 'yellow'
		},
		WATCH: {
			base: PATHS.SRC,
			read: false,
			readDelay: 5
		},
		BABEL: {
			moduleIds: true,
			modules: 'system',
			compact: true,
			stage: 0,
			plugins: [
				// 'angular2-annotations',
			    // 'type-assertion'
			]
		},
		STYLUS: {
			use: [new Nib()],
			import: [
				'nib'
			],
			compress: true
		}
	};

class Build {
	static lib() {
		return $.run('jspm install').exec()
			.on('end', function() {
				return Gulp.src('./jspm-config.js')
					.pipe($.rename('config.js'))
					.pipe($.uglify())
					.pipe(Gulp.dest(PATHS.DEST));
			});
	}

	static js() {
		return Gulp.src(PATHS.JS, CONFIG.GLOB)
			.pipe($.plumber())
			.pipe($.changed(PATHS.DEST))
			.pipe($.using(CONFIG.USING))
			.pipe($.babel(CONFIG.BABEL))
			.pipe($.uglify())
			.pipe(Gulp.dest(PATHS.DEST));
	}

	static html() {
		return Gulp.src(PATHS.HTML, CONFIG.GLOB)
			.pipe($.plumber())
			.pipe($.changed(PATHS.DEST))
			.pipe($.using(CONFIG.USING))
			.pipe(Gulp.dest(PATHS.DEST));
	}

	static css(arg) {
		return Gulp.src('index.styl', CONFIG.GLOB)
			.pipe($.plumber())
			.pipe($.using(CONFIG.USING))
			.pipe($.stylus(CONFIG.STYLUS))
			.pipe(Gulp.dest(PATHS.DEST));
	}
}

Gulp.task('build:lib', Build.lib);

Gulp.task('build:js', Build.js);

Gulp.task('build:html', Build.html);

Gulp.task('build:css', Build.css);

Gulp.task('build', ['build:lib', 'build:js', 'build:html', 'build:css']);

Gulp.task('serve', (done) => {
	$.run('babel-node ./server.js --dev').exec();
	return done();
});

Gulp.task('watch', ['serve'], (done) => {
	$.watch(PATHS.JS, CONFIG.WATCH, Build.js);
	$.watch(PATHS.HTML, CONFIG.WATCH, Build.html);
	$.watch(PATHS.STYL, CONFIG.WATCH, Build.css);

	return done();
});

Gulp.task('dev', ['build', 'watch']);
