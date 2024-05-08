import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import sassGlob from 'gulp-sass-glob';

const postCSSOptions = [autoprefixer()];

export default (gulp, config) => {
  gulp.task('scss', () =>
    gulp
      .src(...config.scss.source)
      .pipe(sassGlob())
      .pipe(sass(config.scss.options).on('error', sass.logError))
      .pipe(postcss(postCSSOptions))
      .pipe(gulp.dest(config.scss.destination)),
  );
};
