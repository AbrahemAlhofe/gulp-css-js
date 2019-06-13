# gulp-css-js v1.0.0

gulp plugin to include css style in javascript file
## Installation

Use the package manager [npm](https://www.npmjs.com) to install plugin.

```bash
> node install --save-dev gulp-css-js
```

## Usage

```
var gulp = require('gulp');
var cssJs = require('gulp-css-js')

gulp.task('js', function () {
  return gulp.src('./app.js')
    .pipe(cssJs()) // plugin
    .pipe(gulp.dest('./public'))
});

gulp.task("default", function () {
  gulp.watch(['./app.js'], gulp.series(["js"]))
})
```

### app js

```

var obj = {}

<style src='./result/style.scss'>
  $color : #090;

  #navbar {
    background-color : #999;
    color : $color
  }
</style>

```
### =============== after run gulp ===============
```bash
> gulp
```

### app js

```
var obj = {}
```

### style.scss
```
body {
  color : #997
}

/* start style of app file */

  $color : #090;

  #navbar {
    background-color : #999;
    color : $color
  }

/* end style of app file */

```
NOTE : if not any html in the file plugin return file without any edit

You can read the [documantion](https://github.com/AbrahemAlhofe/gulp-css-js) to know more about plugin.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/https://github.com/AbrahemAlhofe/gulp-css-js/blob/master/LICENSE)
