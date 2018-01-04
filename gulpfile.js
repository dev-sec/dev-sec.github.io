const gulp = require('gulp')
const path = require('path')
const gutil = require('gulp-util');
const fs = require('fs')
const sass = require('gulp-sass');
var child_process = require('child_process')

function exec(cmd, fn) {
  gutil.log('Run:', gutil.colors.cyan(cmd));
  return child_process.exec(cmd, fn)
}

function execSync(cmd) {
  gutil.log('Run:', gutil.colors.cyan(cmd));
  return child_process.execSync(cmd)
}

const polymerCli = 'node node_modules/polymer-cli/bin/polymer.js '

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./themes/devsec/static/css'));
});

gulp.task('shared-styles', ['sass'], function() {
  gutil.log('Reading base.css into shared styles')
  base_css = fs.readFileSync('./themes/devsec/static/css/app.css')
  content = `<link rel="import" href="../node_modules/@bower_components/polymer/polymer-element.html">
<link rel="stylesheet" href="../node_modules/typeface-muli/index.css">
<dom-module id="shared-styles">
  <template>
    <style>

      `+base_css+`

    </style>
  </template>
</dom-module>`
  return fs.writeFileSync('./themes/devsec/static/elements/shared-styles.html', content)
})

gulp.task('watch', ()=>{
  gulp.watch('sass/**/*.scss', ['shared-styles'])
})

gulp.task('prepare', () => {
  dst = 'themes/devsec/static/node_modules'
  src = 'node_modules'
  src_rel = path.relative(path.dirname(dst), src)
  if(fs.existsSync(dst)) {
    if(!fs.lstatSync(dst).isSymbolicLink() ||
      fs.readlinkSync(dst) !== src_rel) {
      console.error("Path "+dst+" exists but is not the symlink we expect. Please remove it if this is by accident and try again.")
      process.exit(1)
    }
    console.log('    > symlink '+src+' -> '+dst)
  } else {
    fs.symlinkSync(src_rel, dst)
    console.log('[ok]  symlink '+src+' -> '+dst)
  }
})

gulp.task('serve', ['prepare', 'shared-styles'], () => {
  exec('hugo server --watch', (err, stdout, stderr) => {
    if(stdout != "") gutil.log('serve: ' + stdout);
    if(stderr != "") gutil.logError('serve: ' + stderr);
    if(err != null) gutil.logError('serve error: ' + err);
  })
  return gulp.start('watch')
})

gulp.task('default', ['serve'])
