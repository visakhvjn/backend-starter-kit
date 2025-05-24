import { src, dest } from 'gulp';
import uglify from 'gulp-uglify';

function minifyJS() {
	return src('build/**/*.js').pipe(uglify()).pipe(dest('dist'));
}

const _default = minifyJS;
export { _default as default };
