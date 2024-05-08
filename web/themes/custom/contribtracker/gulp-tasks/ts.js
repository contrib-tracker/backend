import typescript from 'gulp-typescript';
const ts = typescript.createProject("tsconfig.json");

export default (gulp, config) => {
  gulp.task('ts', () =>
    gulp
      .src(config.ts.source)
      .pipe(ts())
      .pipe(gulp.dest(config.ts.destination)),
  );
};
