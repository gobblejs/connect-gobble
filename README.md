# connect-gobble

Connect middleware to serve files managed by [gobble](https://github.com/gobblejs/gobble).

**It is very basic and missing a load of features (decent error handling, any configuration whatsoever beyond the location of the build definition, etc etc), I just needed it in a hurry. Hopefully it will grow into something useful eventually - in the meantime, contributions welcome!**

## Installation

```bash
npm i connect-gobble
```

## Usage

```js
var express = require( 'express' );
var gobble = require( 'connect-gobble' );

var app = express();

app.use( gobble( 'path/to/gobblefile.js' ) );
```

## License

MIT. Copyright 2015 Rich Harris