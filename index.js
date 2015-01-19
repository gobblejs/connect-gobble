var path = require( 'path' );
var fs = require( 'fs' );
var mime = require( 'mime' );

module.exports = connectGobble;

function connectGobble ( node ) {
	var task;

	if ( typeof node === 'string' ) {
		node = require( path.resolve( node ) );
	}

	if ( !node || !node._gobble ) {
		throw new Error( 'You must supply a build definition to connect-gobble' );
	}

	task = node.watch({
		dest: '.connect-gobble'
	});

	task.on( 'error', function ( err ) {
		console.error( err ); // TODO how is middleware *supposed* to handle these sorts of errors?
	});

	return function ( req, res, next ) {
		var filepath = path.join( '.connect-gobble', req.url );

		fs.stat( filepath, function ( err, stats ) {
			var indexpath;

			if ( err ) return next();

			if ( stats.isDirectory() ) {
				// try to serve index.html file
				indexpath = path.join( filepath, 'index.html' );
				fs.stat( indexpath, function ( err, stats ) {
					if ( err ) return next();

					// ensure trailing '/'
					if ( req.url.slice( -1 ) !== '/' ) {
						res.redirect( req.url + '/' );
						return;
					}

					// set mime type
					res.setHeader( 'content-type', 'text/html' );

					// stream file contents
					fs.createReadStream( indexpath ).pipe( res );
				});
			}

			else {
				// set mime type
				res.setHeader( 'content-type', mime.lookup( filepath ) );

				// stream file contents
				fs.createReadStream( filepath ).pipe( res );
			}
		});
	};
}