import stylelint from 'gulp-stylelint';
import eslint from 'gulp-eslint-new';
import gulpIf from 'gulp-if';

export default (gulp, config) => {
  gulp.task('lint:scss', () =>
    gulp.src(config.scss.all).pipe(stylelint(config.stylelint.options)),
  );

  gulp.task('lint:ts', () =>
    gulp
      .src(config.ts.source)
      .pipe(eslint())
      .pipe(gulpIf(process.env.CI === 'true', eslint.failOnError())),
  );

  gulp.task(
    'lint',
    gulp.series('prettier', gulp.parallel('lint:scss', 'lint:ts')),
  );
};
