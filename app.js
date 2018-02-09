var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var sassMiddleware = require( 'node-sass-middleware' );
var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Stratery;
var session = require('express-session');
var flash = require('express-flash');
var config = require('./config/index.json');

require('./server/models').connect(config.dbUri);

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
app.use( sassMiddleware( { // this shitty plugin wont work properly
	src: path.join( __dirname, 'public/scss' ), // Artur: this might be buggy, cannot target other dir that public https://github.com/sass/node-sass/issues/227
	dest: path.join( __dirname, 'public/css' ),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true,
	debug: true,
	force: true,
	log: function (severity, key, value) { 

		winston.log(severity, 'node-sass-middleware   %s : %s', key, value);
	}
} ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use(express.static('./server/static/'));
// app.use(express.static('./client/dist/'));

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

// load passport strategies
var localSignupStrategy = require('./server/passport/local-signup');
var localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
var authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Global Vars
app.use(function (req, res, next) {

	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;

	next();
});

// routes
var authRoutes = require('./server/routes/auth');
var apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

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
