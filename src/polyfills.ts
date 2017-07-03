import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
const environment =  require('../config/environment');

if (environment.NODE_ENV === 'production') {
	//production
} else {
	Error['stackTraceLimit'] = Infinity;
	require ('zone.js/dist/long-stack-trace-zone');
}
