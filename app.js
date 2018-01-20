var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var sassMiddleware = require( 'node-sass-middleware' );
var mongoose = require( 'mongoose' );

var dbUrl = 'mongodb://localhost:27017/answer-it';
mongoose.connect(dbUrl, function(err, res) {

	if (err) {

		console.log('DB CONNECTION FAILED: ' + err);
	} else {
		console.log('DB CONNECTION SUCCESS: ' + dbUrl);
	}
});

var home = require( './routes/home' );
var api = require( './routes/api' );
//var surveyEditor = require( './routes/survey-editor' );
//var surveyList = require( './routes/survey-list' );

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( sassMiddleware( {
	src: path.join( __dirname, 'public/scss' ), // Artur: this might be buggy ! https://github.com/sass/node-sass/issues/227
	dest: path.join( __dirname, 'public/css' ),
	indentedSyntax: false // true = .sass and false = .scss
	//sourceMap: true
} ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', home );
app.use( '/api', api );
//app.use( '/surveyEditor', surveyEditor );
//app.use( '/surveyList', surveyList );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handler
app.use( function ( err, req, res, next ) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( 'env' ) === 'development' ? err : { };

	// render the error page
	res.status( err.status || 500 );
	res.render( 'layout' );
} );

const port = process.env.PORT || 8080;
app.listen( port, err => {
	if ( err ) {
		return console.error( err );
	}
	console.info( `Server running on http://localhost:${port}` );
} );

module.exports = app;
