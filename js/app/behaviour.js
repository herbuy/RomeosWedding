
//+++++++++   js/body-modules.js    +++++++++++


//+++++++++   js/jquery.js    +++++++++++

/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.3",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Remove at next major release (1.9/2.0)
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	Token = String,
	document = window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [].pop,
	push = [].push,
	slice = [].slice,
	// Use a stripped-down indexOf if a native one is unavailable
	indexOf = [].indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value == null || value;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			// Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
			return (cache[ key + " " ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
		"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"POS": new RegExp( pos, "i" ),
		"CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var val,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( xml || assertAttributes ) {
		return elem.getAttribute( name );
	}
	val = elem.getAttributeNode( name );
	return val ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			val.specified ? val.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": assertUsableName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": assertUsableClassName && function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem, context ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				return function( elem ) {
					var node, diff,
						parent = elem.parentNode;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					if ( parent ) {
						diff = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								diff++;
								if ( elem === node ) {
									break;
								}
							}
						}
					}

					// Incorporate the offset (or cast to NaN), then check against cycle size
					diff -= last;
					return diff === first || ( diff % first === 0 && diff / first >= 0 );
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ expando ][ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			tokens.push( matched = new Token( match.shift() ) );
			soFar = soFar.slice( matched.length );

			// Cast descendant combinators to space
			matched.type = match[0].replace( rtrim, " " );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {

				tokens.push( matched = new Token( match.shift() ) );
				soFar = soFar.slice( matched.length );
				matched.type = type;
				matched.matches = match;
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( checkNonElements || elem.nodeType === 1  ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( !xml ) {
				var cache,
					dirkey = dirruns + " " + doneName + " ",
					cachedkey = dirkey + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem, context, xml ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( matcher( elem, context, xml ) ) {
							return elem;
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && tokens.join("")
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = superMatcher.el;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++superMatcher.el;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	superMatcher.el = 0;
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ expando ][ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed, xml ) {
	var i, tokens, token, type, find,
		match = tokenize( selector ),
		j = match.length;

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !xml &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( rbackslash, "" ),
						rsibling.test( tokens[0].type ) && context.parentNode || context,
						xml
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && tokens.join("");
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		xml,
		results,
		rsibling.test( selector )
	);
	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [ ":focus" ],

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
				var groups, i,
					old = true,
					nid = expando,
					newContext = context,
					newSelector = context.nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + groups[i].join("");
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( "!=", pseudos );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( e ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	return {
		top: box.top  + scrollTop  - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );


//+++++++++   controls/render.overlay-dialog.js    +++++++++++


var overlayDialog = (function ($) {


    function OverlayDialog($) {

        var dialogSelector = ".overlay-holder";
        var dialogObject = null;

        var defaultWidth = null;
        var defaultHeight = null;

        this.init = function () {

            defaultWidth = 960;
            defaultHeight = 400;

            dialogObject = $(dialogSelector).smartDialog({
                left:40, top:100, closeSelector:"#overlay-close-confirmation", modal:true, opacity:0.7,
                modalColor:"rgb(0,0,0)", autoOpen:false, speed:200,
                closeCallback:function (e) {

                },
                openCallback:function (e) {

                }

            });
        };

        this.loadUrl = function (url) {
            $('.overlay-content').load(url);
        };

        this.loadJQueryObject = function(jqueryObject){
            $('.overlay-content').html("");
            $('.overlay-content').append(jqueryObject);
        };

        this.hideUpdateDialog = function () {
            dialogObject.smartDialog("hide");
        };

        this.showUpdateDialog = function () {
            dialogObject.smartDialog("show");
        };
        return this;
    }

    return new OverlayDialog($);

})(jQuery);

//+++++++++   controls/render.authentication.js    +++++++++++

function AuthenticationDialog() {
    var $ = null;
    var myself = this;
    var onOk = null;

    var dialogSelector = "#authentication-dialog-wrapper";
    var inputSelector = dialogSelector + " input";
    var titleSelector = dialogSelector + " .authentication-dialog-title";
    var codeSelector = dialogSelector + ' input[name=acode]';
    var submitSelector = '#code-submit';
    var dialogObject = null;

    this.onEnterCode = function (callback) {
        if ('function' === typeof (callback)) {
            onOk = callback;

        }

    };

    this.promptText = function (text) {
        $(titleSelector).text(text);
    };

    this.hideAuthenticationDialog = function () {
        $(inputSelector).attr('disabled', "true");
        dialogObject.smartDialog("hide");
    };

    this.showAuthenticationDialog = function () {
        overlayDialog.hideUpdateDialog();
        $(codeSelector).val("");
        dialogObject.smartDialog("show");
        $(inputSelector).removeAttr("disabled");
    };

    this.init = function () {
        $ = jQuery;
        $(inputSelector).attr('disabled', "true");
        dialogObject = $(dialogSelector).smartDialog({
            closeSelector:"#close-authentication-dialog", autoOpen:false, speed:200,
            closeCallback:function (e) {
            },
            openCallback:function (e) {
                $(submitSelector).unbind("click");
                $(submitSelector).click(function (e) {
                    var code = $(codeSelector).val();
                    if (!(/^[\s]*$/).test(code)) {
                        if ("function" === typeof (onOk)) {
                            myself.hideAuthenticationDialog();
                            onOk(myself, code);
                        }
                    }

                    return false;
                });
            }

        });
    };

    return this;
}

var authenticationDialog = new AuthenticationDialog();

//+++++++++   controls/render.authorization.js    +++++++++++

var authorizationDialog = (function ($) {

    function AuthorizationDialog($) {

        var myself = this;

        var authorizationFormSelector = ".authorization-dialog-wrapper";

        var submitSelector = authorizationFormSelector + ' #withdraw-ok';

        var authorizationCodeSelector = authorizationFormSelector + ' input[name=authorizationCode]';

        var statuSelector = authorizationFormSelector + " .authorization-status";

        var onOk = null;
        var titleSelector = authorizationFormSelector + " .dialog-header";
        var dialogSelector = authorizationFormSelector;

        var inputSelector = authorizationFormSelector + " input";

        var dialogObject = null;

        this.init = function () {
            dialogObject = $(dialogSelector).smartDialog({
                closeSelector:authorizationFormSelector + " #dialog-close-button",
                autoOpen:false, speed:200,
                closeCallback:function (e) {

                },
                openCallback:function (e) {

                }

            });

            $(inputSelector).attr('disabled', "true");


            $(submitSelector).click(function (e) {

                var authorizationCode = $(authorizationCodeSelector).val();

                if (!(/^[\s]*$/).test(authorizationCode)) {
                    if ("function" === typeof (onOk)) {
                        myself.hideAuthorizationDialog();
                        onOk(myself, {authorizationCode:authorizationCode});
                    }
                }
                else {
                    $(statuSelector).slideDown();
                    $(statuSelector).text("Enter authorization code");
                    setTimeout(function(e){
                        $(statuSelector).slideUp();
                    },3000);
                }


                return false;
            });

            $("#authorization-close-confirmation").click(function (e) {
                myself.hide();
                return false;
            });


        };


        this.onEnterCode = function (callback) {
            if ('function' === typeof (callback)) {
                onOk = callback;
            }
        };

        this.promptAuthorizationText = function (text) {
            $(titleSelector).text(text);
        };

        this.hideAuthorizationDialog = function () {
            $(inputSelector).attr('disabled', "true");
            dialogObject.smartDialog("hide");
        };

        this.showAuthorizationDialog = function () {
            dialogObject.smartDialog("show");
            $(inputSelector).removeAttr("disabled");
        };

        return this;
    }

    return new AuthorizationDialog($);

})(jQuery);

//+++++++++   controls/render.message-box.js    +++++++++++

var messageBox = (function ($){

    function MessageBox($){

        this.show = function(message){
            $('#messageBox').slideUp();
            $('#messageBox .messageBoxText').text(message);
            $('#messageBox').slideDown();

            setTimeout(
                function(event){
                    $('#messageBox').slideUp();
                },5000);
        };

        this.init = function(){
            $("#messageBox .messageBox-ok").click(function(e){
                $('#messageBox').slideUp();
            });
        };

        return this;
    }

    return new MessageBox($);
})(jQuery);

//+++++++++   controls/render.wait-screen.js    +++++++++++

var waitScreen = (function ($){

    function WaitScreen($){

        this.show = function(){
            $('.waitScreen').show();
            $('.waitScreen').css({'visibility':'visible'});
        };

        this.hide = function(){
            $('.waitScreen').hide();
        };

        this.init = function(){
            this.hide();
        };

        return this;
    }

    return new WaitScreen($);
})(jQuery);

//+++++++++   controls/render.top-most-bar.js    +++++++++++


var topMostBar = (function(){

    function TopMostBar(){


        this.init =function(){

        };

        return this;
    }

    return new TopMostBar();
})();


//+++++++++   controls/render.top-tabs.js    +++++++++++

function TopNavigationTabs() {
    var self = this;

    var tabButtonSelector = ".h-tab-button";
    var selectedTabButtonClass = "h-tab-button-selected";

    var currentTab = "";

    var onSelectionChanged = new EventListeners();
    this.events = {
        onSelectionChanged: new EventListenersProxy(onSelectionChanged)
    };

    this.highlightTabIdentifier = function(identifier){
        self.unhighlightAllTabs();
        $(tabButtonSelector).find(".tab-title").filter("[page="+identifier+"]").addClass(selectedTabButtonClass);
    };

    this.unhighlightAllTabs = function(){
        $(tabButtonSelector).find(".tab-title").removeClass(selectedTabButtonClass);
    };

    this.hasIdentifier = function(identifier){
        var obj = $(tabButtonSelector).find(".tab-title").filter("[page="+identifier+"]");
        return obj.length > 0;
    };

    this.init = function(){
        $(tabButtonSelector).unbind("click");
        $(tabButtonSelector).click(function(e){
            //highlight
            var page = $(this).find(".tab-title").attr("page");
            var href = $(this).find(".tab-title").attr("href");
            self.highlightTabIdentifier(page);
            //fire event
            onSelectionChanged.fire({page:page,href:href});

            return false;
        });
    };

}

var topNavigationTabs = new TopNavigationTabs();


//+++++++++   controls/shoutbox.js    +++++++++++

function Shoutboxes() {

    var chatboxSelector = "#chatbox";//viewer

    var chatApp = null;

    this.init = function () {
        chatApp = new ChatApplication();
        chatApp.init();
    };

    this.switchToChatId = function (friendId, friendName) {
        chatApp.switchToChatId(friendId, friendName);
        chatApp.window.maximize();
    };
    //----------------  EVENT METHODS  -------------------------

    this.createFor = function (forCustomerNumber) {
        //check that we dont have one yet since
        //we can only have one for each recepient
        chatApp.createShoutboxFor(forCustomerNumber);
    };

    //#######################################################
    //............. PROVIDING A UNIFORM INTERFACE TO THE CHAT SYSTEM
    function ChatApplication() {
//        /++++++++++++ OLD CODE++++++++++++++++++++++

        var initialized = false;

        var self = this;
        var errorNotificationArea = $(chatboxSelector + " .error-notifcation-area");
        var lastUpdateTime = "";
        var latestActivityId = 0;
        var isGettingEvents = false;

        var currentPage = "";
        var timerId = null;

        //COLLECTIONS
        this.menu = null;
        this.notifications = null;
        this.chatCollections = null;
        this.window = null;
        var chatFriendsCollection = null;

        //E
        var events = {
            error:{
                fire:function (error) {
                    events.error.feedback.show(error);
                },
                feedback:{
                    show:function (error) {
                        errorNotificationArea.hide();
                        errorNotificationArea.text(error);
                        errorNotificationArea.slideDown();
                        errorNotificationArea.smartFlash();
                        setTimeout(function (e) {
                            errorNotificationArea.slideUp();
                        }, 3000);
                    }
                }

            }

        };

        var logInfo = function (strMessage) {
            __logger.log("CHAT INFO: " + strMessage);
        };

        var logError = function (strMessage) {
            __logger.log("CHAT ERROR: " + strMessage);
        };

        var processMessageUpdates = function (arrMessageUpdates) {
            for (var i in arrMessageUpdates) {
                var message_html = arrMessageUpdates[i]['message_html'];
                var notificaHTML = arrMessageUpdates[i]['notification_html'];
                var receivedFriendId = $(notificaHTML).attr('friend-id');

                if (self.chatCollections.exists(receivedFriendId)) {
                    logInfo("chat collection exists");
                    self.chatCollections.add(message_html, receivedFriendId);
                    self.chatCollections.scrollToMessageBottom();
                    if (!self.chatCollections.isActive(receivedFriendId)) {
                        logInfo("chat collection NOT active");
                        self.notifications.add(notificaHTML);
                    }
                    else {
                        logInfo("chat collection active");
                    }
                }
                else {
                    logInfo("chat collection NOT exists");
                    self.notifications.add(notificaHTML);
                }
            }
        };

        var afterGetEvents = function (text) {
            isGettingEvents = false;
            reschedule();

            var jsonResult = unsafeJSONParse(text);
            if (null !== jsonResult && "object" === typeof(jsonResult)) {

                if ("" === jsonResult.error) {

                    var metadata = jsonResult.metadata;
                    var count = metadata.count;
                    var updateTime = metadata.update_time;
                    lastUpdateTime = updateTime;

                    if (count > 0) {
                        var activityOrder = metadata.activity_order;
                        var firstActivityId = metadata.first;
                        var lastActivityId = metadata.last;
                        /*if (activityOrder === 'DESC') {
                         latestActivityId = firstActivityId;
                         }
                         else {
                         latestActivityId = lastActivityId;
                         }
                         */
                        var messageUpdates = jsonResult.message_updates;
                        processMessageUpdates(messageUpdates);
                    }
                    else {
                        __logger.log("no new messages, so latest activity id did not change");
                    }

                }
                else {
                    logInfo(jsonResult.error);
                }
            }
        };

        //D
        var doGetEvents = function () {
            return;
            if (true === isGettingEvents) {
                reschedule();
            }
            else {
                isGettingEvents = true;
                var options = {cmd:'getMessageUpdates'};
                __logger.log("last update time = "+lastUpdateTime);

                if (lastUpdateTime.length > 0) {
                    options.since = lastUpdateTime;
                    var dataString = smartParams.join(options);

                    options = {success:afterGetEvents};
                    smartLoader.loadFile("index.php?" + dataString, options);
                }

            }

        };

        function reschedule() {
            clearTimeout(timerId);
            timerId = setTimeout(function (e) {
                doGetEvents();
            }, 5000);
        }

        //D
        function startMessageLoop() {
            //simulate data inflow here, but ideally we just subscribe to the eventController
            reschedule();
        }

        //D
        function stopMessageLoop() {
            clearInterval(timerId);
        }

        this.switchToChatId = function (friendId, friendName) {
            openChat(friendId, friendName);
        };

        var openChat = function (friendId, friendName) {
            switchPage("current_chat");
            self.chatCollections.events.afterShowChatCollection.setListener(function(eventArgs){
                self.notifications.removeIfMatchFriendId(friendId);
                self.chatCollections.setChatTitle(friendName);
            });
            self.chatCollections.onlyShowChatsWithFriendId(friendId);
        };

        var startChatWithFriend = function (eventArgs) {
            var sender = eventArgs.sender;
            var customerId = eventArgs.itemId;
            var displayName = chatFriendsCollection.getDisplayName(customerId);
            self.switchToChatId(customerId, displayName);
        };

        function availableChats_load() {
            $(".shoutbox-available-chats").load("index.php?cmd=getAvailableChats", function (e) {

            });
        }

        //C
        var afterGetStartData = function (text) {
            var jsonResult = unsafeJSONParse(text);

            if (jsonResult === null || typeof(jsonResult) !== "object") {
                __logger.log("getStartData returned an invalid value of " + jsonResult);
                return;
            }

            if ("" === jsonResult.error) {
                $(".friend-list").html(jsonResult.html);

                var collectionId = jsonResult.friend_collection_id;
                chatFriendsCollection = customerCollections.get(collectionId);
                chatFriendsCollection.preventDefaultClickAction();
                chatFriendsCollection.events.onSelectionChanged.setListener(startChatWithFriend);
            }
            else {
                logError("friend list error: " + jsonResult.error);
            }

        }

        //C
        function getStartDataForChat() {
            availableChats_load();

            var options = {cmd:'getStartDataForChat'};
            var dataString = smartParams.join(options);
            options = {success:afterGetStartData};
            smartLoader.loadFile("index.php?" + dataString, options);
        }


        //C
        var switchPage = function (pageId) {
            $(".shoutbox-content-area").children().each(function (e) {
                $(this).hide();
            });

            var desiredPageSelector = "";
            switch (pageId) {
                case "online":
                    desiredPageSelector = ".online-users-page";
                    break;
                case "friends":
                    desiredPageSelector = ".friends-page";
                    break;
                case "current_chat":
                    desiredPageSelector = ".current-chat-area";
                    break;
                case "create_chat":
                    desiredPageSelector = ".shoutbox-create-chat-dialog";
                    break;
                case "available_chats":
                    desiredPageSelector = ".shoutbox-available-chats";
                    break;
                case "notifications":
                    desiredPageSelector = ".chat-notification-list";
                    break;
                default:
                    desiredPageSelector = "";
                    break;
            }
            currentPage = pageId;
            $(".shoutbox-content-area").find(desiredPageSelector).slideDown();


        };

        var onLoggedInAjax = function (loginResult) {
            lastUpdateTime = loginResult.login_time;
            onLoggedIn();
        };
        var onLoggedOutAjax = function (logoutResult) {
            onLoggedOut();
        };

        var onLoggedIn = function () {
            getStartDataForChat();
            startMessageLoop();
        };

        var onLoggedOut = function(){
          stopMessageLoop();
        };


        //METHODS

        this.init = function () {
            if (initialized === true) {
                return;
            }
            initialized = true;
            //initialize all sub-modules and register for events from them
            this.window = new ChatWindow();
            this.window.init();

            this.window.events.onClickFriends.addListener(function(e){
                switchPage("friends");
                self.window.maximize();

            });
            this.window.events.onClickNotifications.addListener(function(e){
                switchPage("notifications");
                self.window.maximize();
            });

            this.window.events.onClickHeaderText.addListener(function(e){
                switchPage("current_chat");
                self.window.maximize();
            });
            /*
            this.menu = new SmartCombo(".shoutbox-menu-wrapper");
            this.menu.onSelectionChanged.addListener(function (eventArgs) {
                var pageId = eventArgs.itemId;
                switchPage(pageId);
            });
*/
            this.notifications = new ChatNotifications();
            this.notifications.init();

            this.chatCollections = new ShoutboxChatMessageCollections();
            this.chatCollections.events.onError.addListener(function(eventArgs){
                logInfo("CHAT ERROR " + eventArgs.error);
            });
            this.chatCollections.init();



            this.notifications.events.onClickNotification.addListener(function (friendId, friendName) {
                openChat(friendId, friendName);
            });

            this.notifications.events.onClose.addListener(function () {
                switchPage("current_chat");
            });

            signinModule.events.onLogin.addListener(onLoggedInAjax);
            signinModule.events.onLogout.addListener(onLoggedOutAjax);

            lastUpdateTime = signinModule.loginTime();
            if(signinModule.isLoggedIn()){
                onLoggedIn();
            }
            else{
                onLoggedOut();
            }


        };


        return this;
    }

    return this;
}

var shoutboxes = new Shoutboxes();




//+++++++++   controls/shoutbox-notifications.js    +++++++++++

function ChatNotifications() {

    var self = this;
    var initialized = false;
    var itemFlasher = new ItemFlasher("#chat-notification-list-trigger", jQuery);

    //PRIVATE
    var updateCount = function () {
        var totalNotifications = 0;
        $(".chat-notification-list").find(".chat-notification").each(function (e) {
            totalNotifications += parseInt($(this).attr('count'));
        });
        $(".total-new-chat-messages").text(totalNotifications);
        if (totalNotifications > 0) {
            $(".total-new-chat-messages").css({visibility:"visible"});
            itemFlasher.startFlashing();
        }
        else {
            $(".total-new-chat-messages").css({visibility:"hidden"});
            itemFlasher.stopFlashing();
        }
    };

    //EVENTS
    var onClickNotification = new EventListeners();
    var onClose = new EventListeners();

    this.events = {
        onClickNotification:new EventListenersProxy(onClickNotification),
        onClose:new EventListenersProxy(onClose)
    };

    //METHODS
    this.init = function () {
        if (initialized === true) {
            return;
        }
        initialized = true;

        $('.close-notification-list').click(function (e) {
            onClose.fire();
            return false;
        });
    };

    this.add = function (html) {
        var newHtmlObject = $(html);
        var friendId = newHtmlObject.attr("friend-id");
        var itemsWithThisId = $(".chat-notification-list").find('.chat-notification').filter('[friend-id=' + friendId + ']');

        if (itemsWithThisId.length > 0) {
            var totalSimilarNotifications = itemsWithThisId.eq(0).attr("count");
            if (!isNaN(totalSimilarNotifications)) {
                totalSimilarNotifications = parseInt(totalSimilarNotifications) + 1;
                itemsWithThisId.eq(0).attr("count", totalSimilarNotifications);
                itemsWithThisId.eq(0).find(".count").text("+" + totalSimilarNotifications);
            }

        }
        else {
            $(".chat-notification-list").prepend(newHtmlObject);
            newHtmlObject.attr('count', 1);
            newHtmlObject.find('.count').text("+1");


            newHtmlObject.click(function (e) {
                var friendId = $(this).attr("friend-id");
                var friendName = $(this).attr("friend-name");
                onClickNotification.fire(friendId, friendName);
                return false;
            });
        }
        updateCount();
    };

    this.removeIfMatchFriendId = function (friendId) {
        friendId = parseFloat(friendId);
        var notifications = $(".chat-notification-list").find('.chat-notification');
        notifications.each(function (e) {
            var itemFriendId = parseFloat($(this).attr('friend-id'));
            if (itemFriendId === friendId) {
                $(this).remove();
            }
        });
        updateCount();

    };

}

function ItemFlasher(itemSelector, $) {

    var getItemVisibility = function () {
        return  $(itemSelector).css("visibility");
    };
    var alreadyFlashing = false;
    var timerId = null;
    var defaultVisibility = getItemVisibility();


    var switchVisibilityStatus = function () {

        if (getItemVisibility() == "hidden") {
            $(itemSelector).css({"visibility":"visible"});
        }
        else {
            $(itemSelector).css({"visibility":"hidden"});
        }

    };
    this.startFlashing = function () {
        if (alreadyFlashing === false) {
            alreadyFlashing = true;
            switchVisibilityStatus();
            timerId = setInterval(switchVisibilityStatus, 1000);
        }
    };

    this.stopFlashing = function () {
        timerId = clearInterval(timerId);
        $(itemSelector).css({"visibility":defaultVisibility});
        alreadyFlashing = false;
    };
}




//+++++++++   controls/shoutbox-chat-collections.js    +++++++++++

function ShoutboxChatMessageCollections() {
    var shoutBoxesSelector = ".shoutbox-widget";
    var messageContainerSelector = ".shoutbox-message-container";
    var submitButtonSelector = ".shoutbox-submit-button";
    var inputTextSelector = ".shoutbox-text-input";
    var chatMessageCollectionsSelector = ".chat-message-widget";
    var chatTitleSelector = ".current-chat-title";
    var chatCollection = this;
    var activityId = 0;
    var _curFriendId = 0;

    var setCurrentFriendId = function (newFriendId) {
        _curFriendId = newFriendId;
    };
    var getCurrentFriendId = function () {
        return _curFriendId;
    };

    var afterShowChatCollection = new EventListeners();
    var onError = new EventListeners();
    this.events = {
        afterShowChatCollection:new EventListenersProxy(afterShowChatCollection),
        onError:new EventListenersProxy(onError)
    };


    //------------ DEMO --------------------

    //done
    this.exists = function (friendId) {
        var collection = chatMessageCollection_withFriendId(friendId);
        if (0 < collection.length) {
            return true;
        }
        return false;
    };


    var logInfo = function (message) {
        __logger.log("CHAT COLLECTION: " + message);
    };

    //done
    var mySelfAsObject = function () {
        return $(shoutBoxesSelector);
    };

    //done
    var myMessageDisplayContainer = function () {
        return mySelfAsObject().find(messageContainerSelector);
    };

    //doen
    var mySendButton = function () {
        return mySelfAsObject().find(submitButtonSelector);
    };
    //done
    var myTextInput = function () {
        return mySelfAsObject().find(inputTextSelector);
    };

    var sendCurrentMessage = function () {
        var message = myTextInput().val();
        if(trim(message) === ''){
            return;
        }

        var friendId = getCurrentFriendId();
        var currentChatMessageCollection = chatMessageCollection_withFriendId(friendId);

        if (0 < currentChatMessageCollection.length) {
            var collectionId = currentChatMessageCollection.eq(0).attr('collection-id');
            var currentChatMessageCollectionAsJSObject = chatMessageCollections.get(collectionId);
            if ("object" === typeof(currentChatMessageCollectionAsJSObject)) {
                currentChatMessageCollectionAsJSObject.events.onItemsReturned.setListener(function (e) {
                    chatCollection.scrollToMessageBottom();
                });
                currentChatMessageCollectionAsJSObject.events.onInsertItem.setListener(function (eventArgs) {
                    chatCollection.scrollToMessageBottom();
                });
                currentChatMessageCollectionAsJSObject.events.onPostMessage.setListener(function (eventArgs) {
                    chatCollection.scrollToMessageBottom();
                });
                currentChatMessageCollectionAsJSObject.events.onPostMessageFailed.setListener(function (eventArgs) {
                    alert(eventArgs.error);
                });
                $(".shoutbox-text-input").val("");
                currentChatMessageCollectionAsJSObject.postMessage(message);

            }
            else {
                logInfo("DID NOT FIND chat-message collection id " + collectionId);
            }

        }
        else {
            logInfo("no current chat message collection");
        }
    };


    var attachEvents = function () {
        //send event

        var sendButton = $(submitButtonSelector);
        sendButton.unbind("click");
        sendButton.click(_.throttle(function (e) {
            //alert("attempting send message");
            sendCurrentMessage();
            return false;
        },3));
    };

    //done
    this.scrollToMessageBottom = function () {
        $(messageContainerSelector).scrollTop(3000);
        logInfo("Scrolling to message bottom");
    };

    //done
    this.init = function () {
        attachEvents();
        __logger.log("attaching events to shoutbox chat collections");
    };

    //done
    this.setChatTitle = function (newTitle) {
        $(".current-chat-title").text(newTitle);
    };


    //done
    this.isActive = function (friendId) {
        var curFriendId = getCurrentFriendId();
        var comparedFriendId = trimZerofill(friendId);
        logInfo("comparing friend ids " + curFriendId + " and " + comparedFriendId);
        return curFriendId === comparedFriendId && curFriendId > 0;
    };

    //done
    this.show = function (friendId) {
        var chatMessageCollectionToShow = chatMessageCollection_withFriendId(friendId);
        if (0 < chatMessageCollectionToShow.length) {
            chatMessageCollection_hideAll();
            chatMessageCollectionToShow.show();
            setCurrentFriendId(friendId);
            chatCollection.scrollToMessageBottom();
            chatCollection.markAsRead(friendId);
            afterShowChatCollection.fire({friendId:friendId});
        }
    };

    //done
    var afterMarkMessagesAsRead = function (jsonResult, statusJSON, additionalJSON) {
        return false;
    };

    //done
    this.markAsRead = function (friendId) {
        storeClient.markMessagesAsRead({friendId:friendId}, afterMarkMessagesAsRead, {friendId:friendId});
    };


    //done
    var chatMessageCollection_withFriendId = function (friendId) {
        var friendId1 = trimZerofill(friendId);
        return myMessageDisplayContainer().find(chatMessageCollectionsSelector).filter("[friend-id=" + friendId1 + "]");

    };

    //done
    var chatMessageCollection_hideAll = function () {
        myMessageDisplayContainer().find(chatMessageCollectionsSelector).hide();
    };

    this.add = function (messageHtml, friendId) {
        if (chatCollection.exists(friendId)) {
            var collectionId = chatMessageCollection_withFriendId(friendId).attr("collection-id");
            var chatMessageCollection = chatMessageCollections.get(collectionId);
            if (typeof(chatMessageCollection) === "object" && null !== chatMessageCollection) {
                chatMessageCollection.insertItem(messageHtml);
            }
        }
        chatCollection.scrollToMessageBottom();
    };

    //done
    //called whenever we have retrieved the chat collection for a new person we havent chatted with before
    var afterGetChatMessageCollection = function (jsonResult, statusJSON, additionalJSON) {
        isOpeningChatCollection = false;
        if ("" === jsonResult.error) {
            myMessageDisplayContainer().append(jsonResult.html);
            var friendId = additionalJSON.friendId;
            chatCollection.show(friendId);
        }
        else {
            onError.fire({error:jsonResult.error});

        }
    };

    //done
    var isOpeningChatCollection = false;
    this.onlyShowChatsWithFriendId = function (friendId) {
        if (isOpeningChatCollection === true) {
            return false;
        }
        isOpeningChatCollection = true;

        myMessageDisplayContainer().find(chatMessageCollectionsSelector).hide();
        if (chatCollection.exists(friendId)) {
            isOpeningChatCollection = false;
            chatCollection.show(friendId);
        }
        else {
            var options = {cmd:'getChatMessageCollection', friendIds:friendId};
            storeClient.queryUrl("index.php", options, afterGetChatMessageCollection, {friendId:friendId}, 'json');
        }

    };

}

//+++++++++   controls/shoutbox-chat-window.js    +++++++++++


function ChatWindow() {
    //------------private
    var self = this;
    var initialized = false;

    var isMinimized = false;//state
    var wrapperContentArea = ".shoutbox-wrapper-content";
    var shoutboxCloseSelector = ".shoutbox-closelink";
    var shoutboxCloseIconSelector = ".shoutbox-closelink-icon";
    var chatTabSelector = "#shoutbox-chat-tab";

    var friendsListTriggerSelector = "#chat-friends-list-trigger";
    var notificationListTriggerSelector = "#chat-notification-list-trigger";

    var onClickFriends = new EventListeners();
    var onClickNotifications = new EventListeners();
    var onClickHeaderText = new EventListeners();
    this.events = {
        onClickFriends : new EventListenersProxy(onClickFriends),
        onClickNotifications : new EventListenersProxy(onClickNotifications),
        onClickHeaderText : new EventListenersProxy(onClickHeaderText)
    };


    var shoutboxTemplateHolderSelector = "#shoutbox-template-holder";

    var getHTMLTemplateForShoutbox = function () {
        return $(shoutboxTemplateHolderSelector).html();
    };
    var jqueryObjectFromHTML = function (strHTML) {
        return $(strHTML);
    };

    var createShoutbox = function () {
        var newShoutboxHTML = getHTMLTemplateForShoutbox();
        var shoutboxObject = jqueryObjectFromHTML(newShoutboxHTML);
        $(chatTabSelector).html("");
        $(chatTabSelector).append(shoutboxObject);
        shoutboxObject.attr("for", 240);
    };


    //------------- methods
    this.init = function () {
        if(initialized === true){
            return;
        }
        initialized = true;

        createShoutbox();
        $(shoutboxCloseSelector).click(function (e) {
            if (isMinimized) {
                self.maximize();
            }
            else {
                self.minimize();
            }
            return false;
        });

        $(notificationListTriggerSelector).click(function(e){
            onClickNotifications.fire();
        });

        $(friendsListTriggerSelector).click(function(e){
            onClickFriends.fire();
        });

        $("#chat-header-text").click(function(e){
            onClickHeaderText.fire();
        });


        self.minimize();
    };

    /** expands the chat window */
    this.maximize = function () {
        $(wrapperContentArea).slideDown("fast", function (e) {
            isMinimized = false;
            $(shoutboxCloseIconSelector).css({backgroundPosition:"0px 0px"});
        });
    };
    this.minimize = function () {
        $(wrapperContentArea).slideUp("fast", function (e) {
            isMinimized = true;
            $(shoutboxCloseIconSelector).css({backgroundPosition:"0px -30px"});

        });

    };

}


//+++++++++   controls/render.signup.js    +++++++++++

function SignupModule(module_id) {
    var $ = jQuery;
    var myself = this;
    var moduleId = module_id;
    var moduleView = $("#".concat(moduleId));

    var signupFields = {
        fullname: moduleView.find('input[name=fullname]'),
        username:moduleView.find('input[name=username]'),
        email:moduleView.find('input[name=email]'),
        telephone:moduleView.find('input[name=telephone]'),
        vcode:moduleView.find('input[name=verfificationCode]'),
        password:moduleView.find('input[name=password]'),
        pin:moduleView.find('input[name=pin]')
    };

    var signupControls = {
      status:moduleView.find('.status_area'),
      submit:moduleView.find('input:submit'),
      sendvcode:moduleView.find('.sendvcode')
    };

    var onSignUPSuccess = new EventListeners();
    var onSignUpFailure = new EventListeners();
    this.events = {
        onSignUPSuccess: new EventListenersProxy(onSignUPSuccess),
        onSignUpFailure: new EventListenersProxy(onSignUpFailure)
    };

    var clearForm = function(){
        for(var key in signupFields){
            var field = signupFields[key];
            field.val("");
        }
    };

    var afterSignUpSuccess = function(){
        clearForm();
        signupControls.status.text("signed up successfully");
    };
    var afterSignUpFailure = function(error){
        signupControls.status.text(error);
    };

    onSignUPSuccess.addListener(afterSignUpSuccess);
    onSignUpFailure.addListener(afterSignUpFailure);

    var getSignupOptions = function(){
        return {
            fullname: signupFields.fullname.val(),
            username:signupFields.username.val(),
            email:signupFields.email.val(),
            telephone:signupFields.telephone.val(),
            vcode:signupFields.vcode.val(),
            password:signupFields.password.val(),
            pin:signupFields.pin.val()
        };
    };

    var onClickRegister = function (event) {
        var signupOptions = getSignupOptions();
        signup(signupOptions);
        return false;
    };

    var signup = function (signupOptions) {
        var signupResult = smartCash.signUp(signupOptions, afterSignup, {});
    };

    var afterSignup = function (signupResult, statusJSON, additionalJSON) {
        if ("success" === statusJSON.status && '' === signupResult['error']) {
            onSignUPSuccess.fire();
        }
        else {
            onSignUpFailure.fire(signupResult.error);
        }
    };

    var onClickSendVerificationCode = function (event) {

        var verificationOptions = {
            email:signupFields.email.val(),
            telephone:signupFields.telephone.val()
        };
        sendVerificationCode(verificationOptions);
        return false;
    };

    var afterSendVerificationCode = function (verificationResult, statusJSON, additionalJSON) {

        if ("" === verificationResult.error) {
            signupControls.status.text(verificationResult.message);
        }
        else {
            signupControls.status.text(verificationResult.error);
        }
    };

    var sendVerificationCode = function (verificationOptions) {
        smartCash.sendVerificationCode(verificationOptions, afterSendVerificationCode, {});
    };

    this.init = function () {
        $ = jQuery;
        signupControls.submit.click(onClickRegister);
        signupControls.sendvcode.click(onClickSendVerificationCode);
    };

    return myself;
}


//+++++++++   controls/render.login.js    +++++++++++

function LoginModule() {
    var isLoggedIn = false;
    var username = '';
    var login_time = '';

    var dialogSelector = "#loginDialog";

    var onLogin = new EventListeners();
    var onLogout = new EventListeners();
    var onError = new EventListeners();
    var onInitialize = new EventListeners();
    this.events = {
        onLogin: new EventListenersProxy(onLogin),
        onLogout: new EventListenersProxy(onLogout),
        onError: new EventListenersProxy(onError),
        onInitialize:new EventListenersProxy(onInitialize)
    };

    this.isLoggedIn = function () {
        return isLoggedIn;
    };

    this.currentUser = function () {
        return username;
    };

    this.loginTime = function(){
        return login_time;
    };

    var setLoggedInUser = function (text) {
        $("#loggedin-user").text(text);
    };

    var onClickLogIn = function (event) {

        var loginOptions = {
            username:$('.login-field-textbox-inner[name=username]').eq(0).val(),
            password:$('.login-field-textbox-inner[name=password]').eq(0).val()
        };

        var href = $(dialogSelector).attr("action");
        $.getJSON(href+"&json=true",loginOptions,function(loginResult){
            if ("" === loginResult.error) {
                isLoggedIn = true;
                indicateLoggedIn();
                username = loginResult.username;
                var isAgent = loginResult.isAgent;
                var userId = loginResult.userId;
                var loginTime = loginResult.login_time;
                setLoggedInUser(username);

                $.cookie('userLoggedIn', true);
                $.cookie('currentUser', username);
                $.cookie('isAgent', isAgent);
                $.cookie('userId', userId);
                onLogin.fire(loginResult);
            }
            else {
                onError.fire(loginResult.error);
            }
            return false;
        });


        return false;
    };

    var onClickLogOut = function (event) {
        smartCash.logout(afterLogout, {});
        return false;
    };

    var indicateLoggedIn = function () {
        $(dialogSelector).find('.username-area').hide();
        $(dialogSelector).find('.password-area').hide();
        $(dialogSelector).find('.actions-area').hide();
        $(dialogSelector).find('.myAccountLinks').show();
    };

    var indicateLoggedOut = function () {
        $(dialogSelector).find('.username-area').show();
        $(dialogSelector).find('.password-area').show();
        $(dialogSelector).find('.actions-area').show();
        $(dialogSelector).find('.myAccountLinks').hide();

        $.removeCookie('userLoggedIn');
        $.removeCookie('currentUser');
        $.removeCookie('isAgent');
        $.removeCookie('userId');

        setLoggedInUser('');
    };

    var afterLogin = function (loginResult, statusJSON, additionalJSON) {
        if ("" === loginResult.error) {
            isLoggedIn = true;
            indicateLoggedIn();
            username = loginResult.username;
            var isAgent = loginResult.isAgent;
            var userId = loginResult.userId;
            var loginTime = loginResult.login_time;
            setLoggedInUser(username);

            $.cookie('userLoggedIn', true);
            $.cookie('currentUser', username);
            $.cookie('isAgent', isAgent);
            $.cookie('userId', userId);
           onLogin.fire(loginResult);
        }
        else {
            onError.fire(loginResult.error);
        }
        return false;
    };

    var afterLogout = function (logoutResult, statusJSON, additionalJSON) {
        if ("" === logoutResult.error) {
            isLoggedIn = false;
            indicateLoggedOut();
            onLogout.fire(logoutResult);
        }
        else {
           onError.fire(logoutResult.error);
        }
    };


    this.init = function () {

        isLoggedIn = (1 === parseInt($('#loginDialog').attr('logged-in') ));
        username = $('#loginDialog').attr('usr');


        //$('#login-button').click(onClickLogIn);
        //$('#logout-button').click(onClickLogOut);
        if (true === isLoggedIn) {
            indicateLoggedIn();
            setLoggedInUser(this.currentUser());
        }
        else {
            indicateLoggedOut();
        }
        login_time = $('#loginDialog').attr('login-time');
        onPageLoad.addListener(function(e){
            onInitialize.fire({login_time:login_time,username:username,isLoggedIn:isLoggedIn});
        });

    };

}

var signinModule = new LoginModule();

//+++++++++   js/carousel.js    +++++++++++

function Carousel(selector) {

    //declarations
    this.items = $(selector);
    this.currentItemIndex = 0;
    this.previousItemIndex = 0;


    //we don't want to manipulate an empty array
    if (this.items === null) {
        return;
    }
    this.items.hide();

    this.showPage = function (pageIndex) {

        if (isNaN(pageIndex)) {
            return;
        }

        if (pageIndex >= 0 && pageIndex < this.items.length) {

            //we push out the current page

            if (this.previousItemIndex >= 0 && this.previousItemIndex < $(selector).length) {
                $(selector).eq(this.previousItemIndex).fadeOut(1000);
            }
            $(selector).eq(this.currentItemIndex).fadeIn(1500);
            this.previousItemIndex = this.currentItemIndex;

        }


    };


    this.showNext = function () {

        if (this.currentItemIndex < this.items.length - 1) {
            this.currentItemIndex += 1;
        }
        else {
            this.currentItemIndex = 0;
        }
        this.showPage(this.currentItemIndex);
    };

    this.showPrev = function () {

        if (this.currentItemIndex > 0) {
            this.currentItemIndex -= 1;
        }
        else {
            this.currentItemIndex = $(selector).length - 1;
        }
        this.showPage(this.currentItemIndex);
    };

    this.close = function () {
        this.items.hide();
    };

}

//+++++++++   js/front-controller.js    +++++++++++

function DownloadedPages() {
    var pagesAsKeys = {};
    this.add = function (key, viewerId) {
        pagesAsKeys[key] = viewerId;
    };

    this.has = function (key) {
        return "undefined" !== typeof(pagesAsKeys[key]);
    };

    this.getViewer = function (key) {
        return pagesAsKeys[key];
    };

    this.clear = function () {
        pagesAsKeys = {};
    };

    this.init = function () {
        this.clear();
    };
}


var downloadedPages = new DownloadedPages();

//---------------------------------------------------------------------------------------------------------
var frontController = {
    controller:null,

    cashWizardNavigator:null,
    autoContentNavigator:null,
    carousel:null,
    currentUser:"",

    firstTransactionOffset:0,
    maximumNumber:10,
    numberOfResults:0,
    totalResults:0,
    category:"all",
    toolTipX:0,
    tooltipY:0,

    isLoggedIn:function () {
        return true === signinModule.isLoggedIn();
    },

    setMessage:function (message) {

        messageBox.show(message);

    },

    setBalance:function (balance) {
        $('.account-balance').text('Your account balance is: UGX ' + balance);
    },

    clearBalance:function () {
        $('.account-balance').text('');

    },

    updateLoginStatus:function () {
        if (frontController.isLoggedIn()) {
            frontController.onLoggedIn();
        }
        else {
            frontController.onLoggedOut();
        }

    },

    main:function () {
        var scrollableAreaSelector = ".content-area-wrapper";
        var scrollableAreaHeight = smartBrowser.clientHeight() - $(scrollableAreaSelector).offset().top;
        $(scrollableAreaSelector).css({height:scrollableAreaHeight});
        $(window).resize(function(e){
            var scrollableAreaHeight = smartBrowser.clientHeight() - $(scrollableAreaSelector).offset().top;
            $(scrollableAreaSelector).css({height:scrollableAreaHeight});
        });

        //initialze objects

        //general objects

        overlayDialog.init();
        authorizationDialog.init();
        messageBox.init();
        waitScreen.init();
        topMostBar.init();
        shoutboxes.init();
        topNavigationTabs.init();
        smartLightbox.init(jQuery);

        downloadedPages.init();
        eventController.init();

        //======= register for events ============
        signinModule.events.onLogin.addListener(frontController.onLoggedInWithAjax);
        signinModule.events.onLogout.addListener(frontController.onLoggedOutWithAjax);
        signinModule.events.onError.addListener(function (errorMessage) {
            frontController.setMessage(errorMessage);
        });

        //============== events from top tabs ========

        topNavigationTabs.events.onSelectionChanged.addListener(function (eventArgs) {
            var page = eventArgs.page;
            var href = eventArgs.href;
            frontController.loadPage(page,href);
        });

        //============== events from dashboard ======================
        dashboard.events.onSelectionChanged.addListener(function (eventArgs) {
            var identifier = eventArgs.identifier;
            var linkId = eventArgs.linkId;

            if (topNavigationTabs.hasIdentifier(identifier)) {
                topNavigationTabs.highlightTabIdentifier(identifier);
            }
            else {
                topNavigationTabs.unhighlightAllTabs();
            }

            switch (linkId) {
                case 'dboard-feed':
                    frontController.showIdleScreen();
                    break;
                case 'dboard-store':
                    frontController.showOnlineStore();
                    break;
                case 'dboard-pending-offers':
                    frontController.showPendingOffers();
                    break;
                case 'dboard-send-cash':
                    frontController.showSendCashDialog();
                    break;
                case 'dboard-friends':
                    frontController.showFriends();
                    break;
                case 'dboard-profile':
                    frontController.showMyProfile();
                    break;
                case 'dboard-messages':
                    frontController.showMyMessages();
                    break;
                case 'dboard-my-products':
                    frontController.showMyProducts();
                    break;
                case 'dboard-load-cash':
                    frontController.showLoadCashDialog();
                    break;
                case 'dboard-post-product':
                    frontController.showPostProductDialog();
                    break;
                case 'dboard-transactions':
                    frontController.showMyTransactions();
                    break;
                case 'dboard-invite':
                    frontController.showInvitationDialog();
                    break;
                case 'dboard-withdraw-cash':
                    frontController.showWithdrawCashDialog();
                    break;
                default:
                    break;
            }


        });

        //============ events from global notification object
        globalNotification.events.onItemClick.addListener(function(eventArgs){
            var verb = eventArgs.verb;
            switch(verb){
                case globalNotification.constants.out_of_stock:
                    frontController.showMyProducts(globalNotification.constants.out_of_stock);

                    break;
                default:
                    alert(verb);
                    break;
            }

        });

        smarthomeLinks.events.onItemClick.addListener(function(eventArgs){
            var href = eventArgs.href;
            var page = eventArgs.page;
            frontController.loadPage(page,href);

        });

        //============= events from autoContentNavigator
        autoContentNavigator.events.onLoadPage.addListener(function(eventArgs){
            var page = eventArgs.page;
            var href = eventArgs.href;
            var data = eventArgs.data;

            commentViewers.removeAllListeners();
            //frontController.clearPages();
            $(".content-area-wrapper").scrollTop(0);

            //can fire event here, e.g to hide chat window, show login dialog, etc -- let us listen out for appropriate events

        });

        //=================================

        $(document).ajaxStart(function (event) {
            waitScreen.show();
            setTimeout(function(e){
                waitScreen.hide();
            },10000);
        });

        $(document).ajaxStop(function (event) {

            waitScreen.hide();
        });


        frontController.autoContentNavigator = autoContentNavigator;
        frontController.updateLoginStatus()
    },



    clearPages:function () {
        $(".clearable-content").each(function (e) {
            $(this).html("");
        });
    },


    showIdleScreen:function () {

        if (frontController.isLoggedIn()) {
            frontController.showMyAccountScreen();
        }
        else {
           frontController.loadPage("default","index.php?page=default");

        }
        return false;

    },

    showMyAccountScreen:function () {
        frontController.loadPage("default","index.php?page=default");
        return false;
    },

    showLoadCashDialog:function () {
        frontController.clearPages();

        var pageIdentifier = "cash_center";
        var viewerSelector = ".load-cash-area.clearable-content";

        $(viewerSelector).load('index.php?cmd=getLoadCash', function (e) {
            downloadedPages.add(pageIdentifier, viewerSelector);
        });
        //}
        frontController.autoContentNavigator.showPage(Pages.LOAD_CASH);
        return false;

    },

//events fired  from controller

    onLoggedIn:function () {
        $(".shoutbox-area").show();
    },

    showMyAccountScreen:function(){
        frontController.loadPage("events","index.php?page=default&ajax=true");
    },

    onLoggedInWithAjax:function () {
        globalNotification.showHeader();
        topNavigationTabs.highlightTabIdentifier("default");
        frontController.showMyAccountScreen();
    },

    onLoggedOut:function () {
        globalTimer.removeAllListeners();
        $(".shoutbox-area").hide();
    },

    onLoggedOutWithAjax:function () {
        globalNotification.hideHeader();
        topNavigationTabs.highlightTabIdentifier("default");
        frontController.onLoggedOut();
        frontController.showIdleScreen();
    },

    viewProductsInCart:function () {
        frontController.clearPages();

        frontController.autoContentNavigator.showPage(Pages.BASKET);
        $('.shopping-basket').load("index.php?cmd=getProductsInCart");
        return false;
    },

    showOnlineStore:function () {
        frontController.clearPages();
        frontController.autoContentNavigator.showPage(Pages.SMART_AIRTIME);

        var pageIdentifier = "web_shop";
        var viewerSelector = '.product-summary-display';


        $(viewerSelector).load("index.php?cmd=getProducts", function (e) {
            downloadedPages.add(pageIdentifier, viewerSelector);
        });
        //}

        return false;
    },

    getProductDetails:function (productId, optionalRecommenderNumber) {
        topNavigationTabs.unhighlightAllTabs();
        frontController.clearPages();

        var recommenderString = "";
        if (optionalRecommenderNumber > 0) {
            recommenderString = "&recommenderNumber=" + optionalRecommenderNumber;
        }
        frontController.clearPages();
        frontController.autoContentNavigator.showPage(Pages.PRODUCT_DETAILS);
        $('.product-details-page .clearable-content').load('index.php?cmd=getProductDetails&productId=' + productId + recommenderString);
    },

    showInvoicesForTransaction:function (transactionCode) {
        frontController.loadPage("order_receipt","index.php?page=order_receipt&transactionCode="+transactionCode);
    },

    showMyProfile:function () {
        frontController.clearPages();

        frontController.autoContentNavigator.showPage(Pages.PROFILE);
        $('#profile-area').load("index.php?cmd=getProfile");

        return false;
    },

    showProfile:function (customerNumber) {
        frontController.clearPages();

        frontController.autoContentNavigator.showPage(Pages.PROFILE);
        $('#profile-area').load("index.php?cmd=getProfile&customerNumber=" + customerNumber);

        return false;
    },

    loadPage:function(page,href){
        frontController.autoContentNavigator.loadPage(page,href);
    },

    showMyProducts:function (defaultTab) {

        frontController.clearPages();
        var pageConstant = Pages.MY_PRODUCTS;
        var pageIdentifier = "manage_products";
        var viewerSelector = ".my-products-page .clearable-content";

        var defaultTabString = "";
        if(typeof(defaultTab) === "string"){
            defaultTabString = "&defaultTab="+defaultTab;
        }
        var url = 'index.php?cmd=getMyProducts' + defaultTabString;

        $(viewerSelector).load(url, function (e) {
            downloadedPages.add(pageIdentifier, viewerSelector);
        });

        frontController.autoContentNavigator.showPage(pageConstant);

    },

    showInvitationDialog:function () {
        frontController.clearPages();

        frontController.autoContentNavigator.showPage(Pages.INVITATIONS);
        $('#invitation-area').load("index.php?cmd=getInvitations");
    },

    showPostProductDialog:function () {
        frontController.clearPages();

        frontController.autoContentNavigator.showPage(Pages.POST_PRODUCT);
        $('#post-product-area').load("index.php?cmd=getPostProduct", {}, function (e) {

            postProductModule.onUpload(function (json) {
                if ('' === json.error) {
                    var productId = json.product_id;
                    alert("product uploaded sucessfully");
                }
                else {
                    frontController.setMessage(json.error);
                }
            });

            postProductModule.onError(function (message) {
                frontController.setMessage(message);
            });
        });
    }

};


//+++++++++   js/smart-lightbox.js    +++++++++++

var smartLightbox = (function () {

    function SmartLightbox() {
        var $ = null;
        var lightboxSelector = ".smart-lightbox";
        var outerBorderSelector = ".smart-lightbox-content-border-outer";
        var lightboxContentSelector = ".smart-lightbox-content";
        var lightboxActualContentSelector = ".smart-lightbox-content-actual-area";
        var lightboxHeaderSelector = ".smart-lightbox-content-header";
        var closeSelector = ".smart-lightbox-close";
        var combinedLightboxSelector = lightboxSelector + "," + outerBorderSelector;

        var self = this;
        var isShown;

        var defaultOverflowX;
        var defaultOverflowY;


        var eventHandlers = {
            onShow:new EventListeners(),
            onHide:new EventListeners()
        };
        this.onShow = new EventListenersProxy(eventHandlers.onShow);
        this.onHide = new EventListenersProxy(eventHandlers.onHide);

        this.reformatContent = function(){
            //you can reposition the content here then show
            var marginLeft = 0;
            var marginTop = 0;

            var overflowx = defaultOverflowX;
            var overflowy = defaultOverflowY;

            var contentWidth = $(lightboxActualContentSelector).width();
            var contentHeight = $(lightboxActualContentSelector).height();

            var clientWidth = smartBrowser.clientWidth();
            var clientHeight = smartBrowser.clientHeight();

            var maxContentWidth =  clientWidth * 0.75;

            if (contentWidth > maxContentWidth) {
                $(lightboxActualContentSelector).width(maxContentWidth);
                $(lightboxActualContentSelector).css({overflowX:"scroll"});
            }
            else{
                $(lightboxActualContentSelector).css({overflowX:"hidden"});
            }

            marginLeft = -1 * $(outerBorderSelector).width() / 2;


            //var maxContentHeight = clientHeight * 0.75 - $(lightboxHeaderSelector).height();
            var maxContentHeight = clientHeight * 0.75;
            if (contentHeight > maxContentHeight) {
                $(lightboxActualContentSelector).height(maxContentHeight);
                $(lightboxActualContentSelector).css({overflowY:"scroll"});
            }
            else{
                $(lightboxActualContentSelector).css({overflowY:"hidden"});
            }

            marginTop = -1 * $(outerBorderSelector).height() / 2;

            $(outerBorderSelector).css({marginLeft:marginLeft, marginTop:marginTop});

        };


        this.show = function () {

            if (true === isShown) {
                return;
            }
            self.reformatContent();
            $(combinedLightboxSelector).show();
            isShown = true;
            eventHandlers.onShow.fire();
        };

        this.hide = function () {
            if (false === isShown) {
                return;
            }
            $(combinedLightboxSelector).hide();
            isShown = false;
            $(lightboxContentSelector).css({width:"auto", height:"auto"});
            eventHandlers.onHide.fire();
        };

        this.clientAreaSelector = function () {
            return lightboxActualContentSelector;
        };

        this.setOneTimeWidth = function (width) {
            $(lightboxContentSelector).width(width);
        };

        this.setOneTimeHeight = function (height) {
            $(lightboxContentSelector).height(height);
        };

        this.init = function (jQuery) {
            $ = jQuery;
            defaultOverflowX = $(lightboxContentSelector).css("overflowX");
            defaultOverflowY = $(lightboxContentSelector).css("overflowY");

            $(lightboxSelector).css({opacity:0.5});
            $(closeSelector).click(function (e) {
                self.hide();
            });
        };
        return this;
    }

    return new SmartLightbox();
})();


//+++++++++   dependencies/dependencies.js    +++++++++++


//++++++++++++++++++ js/heartbeat.js +++++++++++++++++++



function Heartbeat() {

    var activenessTimerId = null;
    var lastState = "active";

    var onTimeout = new EventListeners();
    var onActive = new EventListeners();
    this.events = {
        onTimeout : new EventListenersProxy(onTimeout),
        onActive:new EventListenersProxy(onActive)
    };

    var onIdle = function () {
        if(lastState === "active"){
            __logger.log("you've been idle for too long, disabling events");
            lastState = "idle";
            onTimeout.fire();
        }
    };

    var resetActivenessTimer = function () {
        clearTimeout(activenessTimerId);
        activenessTimerId = setTimeout(onIdle, 60000);
        if(lastState === "idle"){
            __logger.log("user active again");
            lastState = "active";
            onActive.fire();
        }

    };

    var monitorActiveness = function (e) {
        resetActivenessTimer();
        $("html").mousemove(function (e) {
            resetActivenessTimer();
        });
        $("html").mousedown(function (e) {
            resetActivenessTimer();
        });
        $("html").keydown(function (e) {
            resetActivenessTimer();
        });
    };

    this.init = function(){
        monitorActiveness();
    };
    return this;
}

var heartbeat = new Heartbeat();
onPageLoad.addListener(function(e){
    heartbeat.init();
});
//++++++++++++++++++ js/jquery.dimensions.js +++++++++++++++++++


/* Copyright (c) 2007 Paul Bakaus (paul.bakaus@googlemail.com) and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-06-22 04:38:37 +0200 (Fr, 22 Jun 2007) $
 * $Rev: 2141 $
 *
 * Version: 1.0b2
 */

(function($){

// store a copy of the core height and width methods
var height = $.fn.height,
    width  = $.fn.width;

$.fn.extend({
	/**
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").height()
	 * @result 200
	 *
	 * @example $(document).height()
	 * @result 800
	 *
	 * @example $(window).height()
	 * @result 400
	 *
	 * @name height
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	height: function() {
		if ( this[0] == window )
			return self.innerHeight ||
				$.boxModel && document.documentElement.clientHeight || 
				document.body.clientHeight;
		
		if ( this[0] == document )
			return Math.max( document.body.scrollHeight, document.body.offsetHeight );
		
		return height.apply(this, arguments);
	},
	
	/**
	 * If used on document, returns the document's width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").width()
	 * @result 200
	 *
	 * @example $(document).width()
	 * @result 800
	 *
	 * @example $(window).width()
	 * @result 400
	 *
	 * @name width
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	width: function() {
		if ( this[0] == window )
			return self.innerWidth ||
				$.boxModel && document.documentElement.clientWidth ||
				document.body.clientWidth;

		if ( this[0] == document )
			return Math.max( document.body.scrollWidth, document.body.offsetWidth );

		return width.apply(this, arguments);
	},
	
	/**
	 * Returns the inner height value (without border) for the first matched element.
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 *
	 * @example $("#testdiv").innerHeight()
	 * @result 800
	 *
	 * @name innerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight - num(this, 'borderTopWidth') - num(this, 'borderBottomWidth') :
				this.height() + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the inner width value (without border) for the first matched element.
	 * If used on document, returns the document's Width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 *
	 * @example $("#testdiv").innerWidth()
	 * @result 1000
	 *
	 * @name innerWidth
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth - num(this, 'borderLeftWidth') - num(this, 'borderRightWidth') :
				this.width() + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**
	 * Returns the outer height value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight :
				this.height() + num(this,'borderTopWidth') + num(this, 'borderBottomWidth') + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the outer width value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth :
				this.width() + num(this, 'borderLeftWidth') + num(this, 'borderRightWidth') + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**
	 * Returns how many pixels the user has scrolled to the right (scrollLeft).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft()
	 * @result 100
	 *
	 * @name scrollLeft
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollLeft property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft(10).scrollLeft()
	 * @result 10
	 *
	 * @name scrollLeft
	 * @param Number value A positive number representing the desired scrollLeft.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollLeft: function(val) {
		if ( val != undefined )
			// set the scroll left
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( val, $(window).scrollTop() );
				else
					this.scrollLeft = val;
			});
		
		// return the scroll left offest in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageXOffset ||
				$.boxModel && document.documentElement.scrollLeft ||
				document.body.scrollLeft;
				
		return this[0].scrollLeft;
	},
	
	/**
	 * Returns how many pixels the user has scrolled to the bottom (scrollTop).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop()
	 * @result 100
	 *
	 * @name scrollTop
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollTop property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop(10).scrollTop()
	 * @result 10
	 *
	 * @name scrollTop
	 * @param Number value A positive number representing the desired scrollTop.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollTop: function(val) {
		if ( val != undefined )
			// set the scroll top
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( $(window).scrollLeft(), val );
				else
					this.scrollTop = val;
			});
		
		// return the scroll top offset in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageYOffset ||
				$.boxModel && document.documentElement.scrollTop ||
				document.body.scrollTop;

		return this[0].scrollTop;
	},
	
	/** 
	 * Returns the top and left positioned offset in pixels.
	 * The positioned offset is the offset between a positioned
	 * parent and the element itself.
	 *
	 * @example $("#testdiv").position()
	 * @result { top: 100, left: 100 }
	 * 
	 * @name position
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? False by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	position: function(options, returnObject) {
		var elem = this[0], parent = elem.parentNode, op = elem.offsetParent,
		    options = $.extend({ margin: false, border: false, padding: false, scroll: false }, options || {}),
			x = elem.offsetLeft,
			y = elem.offsetTop, 
			sl = elem.scrollLeft, 
			st = elem.scrollTop;
			
		// Mozilla and IE do not add the border
		if ($.browser.mozilla || $.browser.msie) {
			// add borders to offset
			x += num(elem, 'borderLeftWidth');
			y += num(elem, 'borderTopWidth');
		}

		if ($.browser.mozilla) {
			do {
				// Mozilla does not add the border for a parent that has overflow set to anything but visible
				if ($.browser.mozilla && parent != elem && $.css(parent, 'overflow') != 'visible') {
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');
				}

				if (parent == op) break; // break if we are already at the offestParent
			} while ((parent = parent.parentNode) && (parent.tagName.toLowerCase() != 'body' || parent.tagName.toLowerCase() != 'html'));
		}
		
		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);
		
		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 *
	 * For accurate readings make sure to use pixel values for margins, borders and padding.
	 * 
	 * Known issues:
	 *  - Issue: A div positioned relative or static without any content before it and its parent will report an offsetTop of 0 in Safari
	 *    Workaround: Place content before the relative div ... and set height and width to 0 and overflow to hidden
	 *
	 * @example $("#testdiv").offset()
	 * @result { top: 100, left: 100, scrollTop: 10, scrollLeft: 10 }
	 *
	 * @example $("#testdiv").offset({ scroll: false })
	 * @result { top: 90, left: 90 }
	 *
	 * @example var offset = {}
	 * $("#testdiv").offset({ scroll: false }, offset)
	 * @result offset = { top: 90, left: 90 }
	 *
	 * @name offset
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @options Boolean lite Will use offsetLite instead of offset when set to true. False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offset: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0,
		    elem = this[0], parent = this[0], op, parPos, elemPos = $.css(elem, 'position'),
		    mo = $.browser.mozilla, ie = $.browser.msie, sf = $.browser.safari, oa = $.browser.opera,
		    absparent = false, relparent = false, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true, lite: false }, options || {});
		
		// Use offsetLite if lite option is true
		if (options.lite) return this.offsetLite(options, returnObject);
		
		if (elem.tagName.toLowerCase() == 'body') {
			// Safari is the only one to get offsetLeft and offsetTop properties of the body "correct"
			// Except they all mess up when the body is positioned absolute or relative
			x = elem.offsetLeft;
			y = elem.offsetTop;
			// Mozilla ignores margin and subtracts border from body element
			if (mo) {
				x += num(elem, 'marginLeft') + (num(elem, 'borderLeftWidth')*2);
				y += num(elem, 'marginTop')  + (num(elem, 'borderTopWidth') *2);
			} else
			// Opera ignores margin
			if (oa) {
				x += num(elem, 'marginLeft');
				y += num(elem, 'marginTop');
			} else
			// IE does not add the border in Standards Mode
			if (ie && jQuery.boxModel) {
				x += num(elem, 'borderLeftWidth');
				y += num(elem, 'borderTopWidth');
			}
		} else {
			do {
				parPos = $.css(parent, 'position');
			
				x += parent.offsetLeft;
				y += parent.offsetTop;

				// Mozilla and IE do not add the border
				if (mo || ie) {
					// add borders to offset
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');

					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					if (mo && parPos == 'absolute') absparent = true;
					// IE does not include the border on the body if an element is position static and without an absolute or relative parent
					if (ie && parPos == 'relative') relparent = true;
				}

				op = parent.offsetParent;
				if (options.scroll || mo) {
					do {
						if (options.scroll) {
							// get scroll offsets
							sl += parent.scrollLeft;
							st += parent.scrollTop;
						}
				
						// Mozilla does not add the border for a parent that has overflow set to anything but visible
						if (mo && parent != elem && $.css(parent, 'overflow') != 'visible') {
							x += num(parent, 'borderLeftWidth');
							y += num(parent, 'borderTopWidth');
						}
				
						parent = parent.parentNode;
					} while (parent != op);
				}
				parent = op;

				if (parent.tagName.toLowerCase() == 'body' || parent.tagName.toLowerCase() == 'html') {
					// Safari and IE Standards Mode doesn't add the body margin for elments positioned with static or relative
					if ((sf || (ie && $.boxModel)) && elemPos != 'absolute' && elemPos != 'fixed') {
						x += num(parent, 'marginLeft');
						y += num(parent, 'marginTop');
					}
					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					// IE does not include the border on the body if an element is positioned static and without an absolute or relative parent
					if ( (mo && !absparent && elemPos != 'fixed') || 
					     (ie && elemPos == 'static' && !relparent) ) {
						x += num(parent, 'borderLeftWidth');
						y += num(parent, 'borderTopWidth');
					}
					break; // Exit the loop
				}
			} while (parent);
		}

		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 * This method is much faster than offset but not as accurate. This method can be invoked
	 * by setting the lite option to true in the offset method.
	 *
	 * @name offsetLite
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offsetLite: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0, parent = this[0], op, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true }, options || {});
				
		do {
			x += parent.offsetLeft;
			y += parent.offsetTop;

			op = parent.offsetParent;
			if (options.scroll) {
				// get scroll offsets
				do {
					sl += parent.scrollLeft;
					st += parent.scrollTop;
					parent = parent.parentNode;
				} while(parent != op);
			}
			parent = op;
		} while (parent && parent.tagName.toLowerCase() != 'body' && parent.tagName.toLowerCase() != 'html');

		var returnValue = handleOffsetReturn(this[0], options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	}
});

/**
 * Handles converting a CSS Style into an Integer.
 * @private
 */
var num = function(el, prop) {
	return parseInt($.css(el.jquery?el[0]:el,prop))||0;
};

/**
 * Handles the return value of the offset and offsetLite methods.
 * @private
 */
var handleOffsetReturn = function(elem, options, x, y, sl, st) {
	if ( !options.margin ) {
		x -= num(elem, 'marginLeft');
		y -= num(elem, 'marginTop');
	}

	// Safari and Opera do not add the border for the element
	if ( options.border && ($.browser.safari || $.browser.opera) ) {
		x += num(elem, 'borderLeftWidth');
		y += num(elem, 'borderTopWidth');
	} else if ( !options.border && !($.browser.safari || $.browser.opera) ) {
		x -= num(elem, 'borderLeftWidth');
		y -= num(elem, 'borderTopWidth');
	}

	if ( options.padding ) {
		x += num(elem, 'paddingLeft');
		y += num(elem, 'paddingTop');
	}
	
	// do not include scroll offset on the element
	if ( options.scroll ) {
		sl -= elem.scrollLeft;
		st -= elem.scrollTop;
	}

	return options.scroll ? { top: y - st, left: x - sl, scrollTop:  st, scrollLeft: sl }
	                      : { top: y, left: x };
};

})(jQuery);
//++++++++++++++++++ js/jquery.form.js +++++++++++++++++++


/*!
 * jQuery Form Plugin
 * version: 3.37.0-2013.07.11
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
;(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp )
        return this.attr.apply(this, arguments);
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' )
        return val;
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }
    else if ( options === undefined ) {
        options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || 'GET',
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled[value!=""]', this);

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++)
        elements[k] = null;

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++)
                if (serializedData[i])
                    formdata.append(serializedData[i][0], serializedData[i][1]);
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                o.data = formdata;
                if(beforeSend)
                    beforeSend.call(this, xhr, o);
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp )
                    el.prop('disabled', false);
                else
                    el.removeAttr('disabled');
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n)
                 $io.attr2('name', id);
            else
                id = n;
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error)
                    s.error.call(s.context, xhr, e, status);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, e]);
                if (s.complete)
                    s.complete.call(s.context, xhr, e);
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), a = $form.attr2('action');

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized')
                        setTimeout(checkState,50);
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle)
                        clearTimeout(timeoutHandle);
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                    if (io.attachEvent)
                        io.attachEvent('onload', cb);
                    else
                        io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut)
                    return;
            }
            if (io.detachEvent)
                io.detachEvent('onload', cb);
            else
                io.removeEventListener('load', cb, false);

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml)
                    s.dataType = 'xml';
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success)
                    s.success.call(s.context, data, 'success', xhr);
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g)
                    $.event.trigger("ajaxSuccess", [xhr, s]);
            }
            else if (status) {
                if (errMsg === undefined)
                    errMsg = xhr.statusText;
                if (s.error)
                    s.error.call(s.context, xhr, status, errMsg);
                deferred.reject(xhr, 'error', errMsg);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
            }

            if (g)
                $.event.trigger("ajaxComplete", [xhr, s]);

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete)
                s.complete.call(s.context, xhr, status);

            callbackProcessed = true;
            if (s.timeout)
                clearTimeout(timeoutHandle);

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget)
                    $io.remove();
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error)
                    $.error('parsererror');
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(this).ajaxSubmit(options);
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements)
                elements.push(el);
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements)
                elements.push(el);
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements)
                elements.push(el);
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array)
            $.merge(val, v);
        else
            val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
		else if (t == "file") {
			if (/MSIE/.test(navigator.userAgent)) {
				$(this).replaceWith($(this).clone(true));
			} else {
				$(this).val('');
			}
		}
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
                this.value = '';
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug)
        return;
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

})(jQuery);

//++++++++++++++++++ js/jquery.cookie.js +++++++++++++++++++


/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

//++++++++++++++++++ js/underscore-min.js +++++++++++++++++++


//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.2';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, target, fromIndex) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, 'length').length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = list && list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    var i = 0, length = array && array.length;
    if (typeof isSorted == 'number') {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else if (isSorted && length) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (item !== item) {
      return _.findIndex(slice.call(array, i), _.isNaN);
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    var idx = array ? array.length : 0;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    if (item !== item) {
      return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array != null && array.length;
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createIndexFinder(1);

  _.findLastIndex = createIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of 
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  
  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

//++++++++++++++++++ js/jquery.timeago.js +++++++++++++++++++


/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.3.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      $(this).data('timeago', { datetime: $t.parse(time) });
      refresh.apply(this);
    },
    updateFromDOM: function(){
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var data = prepareData(this);
    var $s = $t.settings;

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || distance(data.datetime) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));

//++++++++++++++++++ js/utils.js +++++++++++++++++++


var smartUtils = (function(){
    function SmartUtils(){
        this.inspection = {
            isSmartDateTimeString:function(dateTimeString){
                return reSmartDateTimeString.test(dateTimeString);
            }
        };
    }
    return new SmartUtils();
})();

function trimZerofill(string) {
    return ("" + string).replace(/^[0]+/, "");
}

function ltrim(string) {
    return ("" + string).replace(/^[\s]+/, "");
}
function rtrim(string) {
    return ("" + string).replace(/[\s]+$/, "");
}
function trim(string) {
    return rtrim(ltrim(string));
}

var smartBrowser = {
    clientWidth:function () {
        var body = document.getElementsByTagName("html")[0];
        var clientWidth = body.clientWidth;
        return clientWidth;
    },
    clientHeight:function () {
        var body = document.getElementsByTagName("html")[0];
        var clientHeight = body.clientHeight;
        return clientHeight;
    }
}

var smartParams = (function(){

    function SmartParams(){

        this.join = function(parametersObject){
            var options = parametersObject;
            var dataString = "";

            if("object" === typeof(options) && null !== options){
                //combine the paramters into a string
                var separator = "&";
                var keyPosition = -1;

                for(var key in options){
                    var value = options[key];
                    if(null !== value){
                        keyPosition += 1;
                        if(keyPosition !== 0){
                            separator = "&";
                        }
                        else{
                            separator = "";
                        }
                        dataString += separator + key + "=" + value;
                    }
                }

            }
            else{
                __logger.log("smartParams error: invalid parameter for join, with type as "+_typeof(options));
            }
            return dataString;
        };

        return this;
    }
    return new SmartParams();
})();

function unsafeJSONParse(text){
    var jsonResult = null;
    try {
        jsonResult = eval("(" + text + ")");
    }
    catch (e) {
        jsonResult = null;
    }
    return jsonResult;
}

var smartSettings = {
    events:{
        interval:10000
    }
};

function ClickToShow(targetElementsSelector, sourceElementSelector){
    $(sourceElementSelector).click(function(){
        $(targetElementsSelector).slideDown();
    });

    return this;
}

function ClickToHide(targetElementsSelector, sourceElementSelector){
    $(sourceElementSelector).click(function(){
        $(targetElementsSelector).slideUp();
    });
    return this;
}

function ClickToToggle(targetElementsSelector, sourceElementSelector){
    var isVisible = false;
    var sourceElement = $(sourceElementSelector);
    var targetElements = $(targetElementsSelector);

    var _alternateText = "";
    var defaultText = sourceElement.text();

    this.setAlternateText = function(alternateText){
        _alternateText = alternateText;
    };

    sourceElement.click(function(){
        if(isVisible === true){
            targetElements.slideUp();
            isVisible = false;
        }
        else{
            targetElements.slideDown();
            isVisible = true;
        }

        var currentText = sourceElement.text();
        if(currentText === defaultText){
            if(! (/^(\s*)$/.test(_alternateText))){
                sourceElement.text(_alternateText);
            }
        }
        else{
            sourceElement.text(defaultText);
        }


    });
    return this;
}

/* **************** THESE FUNCTIONS HELP EMULATE OOP PRINCIPLES OF INHERITANCE AND INTERFACES */
function extend(object, arrayOfOtherObjects) {

    for (var i = 0; i < arrayOfOtherObjects.length; i++) {
        var anotherObject = arrayOfOtherObjects[i];

        //what happens if we have already copied a base class??

        //what happens if the base class/object is sealed
        if (anotherObject.sealed === true) {
            throw new Error("object is sealed, can not be inherited from");
        }
        else {

        }

        for (var key in anotherObject) {
            //what happens if we already have the key
            if (typeof(object[key]) !== 'undefined') {
                throw new Error("property already exists in target object");
            }
            else {
                object[key] = anotherObject[key];
            }

        }
//set the base class
//object.base = anotherObject; bae
    }


}

function implements(object, interface) {

    //check that all functions and variables in interface are implemented
    for (var key in interface) {

        var notExist = typeof(object[key]) !== typeof(interface[key]);
        //var notExist = !(key in object);
        if (notExist) {
            throw new Error("interface method not implemented");
        }
//some items like array, null are all treated as objects


//what if the signature is not the same??
    }
}

var preg_replace = function (arr_patterns, arr_replacements, string) {
    /*
     FOREACH pattern
     PREVENT ERRORS LIKE empty pattern
     DO TRIGGER search ON pattern IN string
     IF FEEDBACK says found THEN
     READ the replacement value FROM array of replacements
     DO replace pattern WITH replacement value

     ONCE DONE, return new string where replacements were done

     if found
     */
    var str_result = string;
    for(var i = 0; i < arr_patterns.length;i++){
        var pattern = arr_patterns[i];
        var replacement = arr_replacements[i];
        str_result = str_result.replace(new RegExp(pattern,"gim"),replacement);
    }

    return str_result;
};

function smartRandom(min,max){
    if(typeof(min) !== "number"){
        min = 0;
    }
    if(typeof(max) !== "number"){
        max = 1000000000000000000;
    }
    return (Math.random() * (max - min) + min ) % max;
}

function preg_replace(arr_patterns, arr_replacements, string) {

    var str_result = string;
    for(var i = 0; i < arr_patterns.length;i++){
        var pattern = arr_patterns[i];
        var replacement = arr_replacements[i];
        str_result = str_result.replace(new RegExp(pattern,"gim"),replacement);
    }
    return str_result;
}
//++++++++++++++++++ js/functions.utility.js +++++++++++++++++++


//THIS MODULE DEPENDS ON JQUERY AND UNDERSCORE

function connectElementValues(sourceSelector, destSelector, emptyText) {
    var emptyPattern = /^[\s]*$/;

    function setTextIf(jqueryObject, condtion, trueText, falseText) {
        if (condtion) {
            jqueryObject.html(trueText);
        }
        else {
            jqueryObject.html(falseText);
        }
    }


    if (sourceSelector && destSelector) {
        var jqueryObject = $(sourceSelector);
        var jqueryObject2 = $(destSelector);

        if (jqueryObject.is('input') && 'text' === jqueryObject.attr('type')) {
            //if text-box || text area
            var sourceValue = $(sourceSelector).val();
            setTextIf(jqueryObject2, !emptyPattern.test(sourceValue), sourceValue, emptyText);

            $(sourceSelector).keyup(function (event) {
                sourceValue = $(sourceSelector).val();
                setTextIf(jqueryObject2, !emptyPattern.test(sourceValue), sourceValue, emptyText);
            });


        }

        else if (jqueryObject.is('select')) {
            //if select box
            sourceValue = $(sourceSelector).children(':selected').eq(0).text();
            setTextIf(jqueryObject2, !emptyPattern.test(sourceValue), sourceValue, emptyText);

            $(sourceSelector).change(function (event) {
                sourceValue = $(sourceSelector).children(':selected').eq(0).text();
                setTextIf(jqueryObject2, !emptyPattern.test(sourceValue), sourceValue, emptyText);
            });
        }

    }
    else {
        return;
    }


}


function connectElementValueToFunction(selector, functionName, callNow) {

    if (true === callNow) {
        functionName();
    }


    var jqueryObject = $(selector);
    jqueryObject.change(functionName);

    if (jqueryObject.is('input') && 'text' === jqueryObject.attr('type')) {
        jqueryObject.keyup(functionName);
    }
    else {
        jqueryObject.change(functionName);
    }

}


function SmartQueue() {
    var arrayOfObjects = [];

    this.enque = function (object) {
        arrayOfObjects.push(object);
    };

    this.deque = function () {
        if (arrayOfObjects.length < 1) {
            return null;
        }
        var nextObject = arrayOfObjects[0];
        arrayOfObjects = _.last(arrayOfObjects, arrayOfObjects.length - 1);
        return nextObject;
    };

    this.peek = function () {
        if (arrayOfObjects.length < 1) {
            return null;
        }
        return arrayOfObjects[0];
    };

    this.length = function () {
        return arrayOfObjects.length;
    };
}


function SmartLogger() {
    var self = this;
    var allowLogging = true;

    this.log = function (message) {
        if (allowLogging) {
            if ($.browser.mozilla) {
                console.log(message);
            }
        }
    };

    this.assert = function(condition,message){
      if(condition !== true){
          this.log("BUG: "+message);
      }
    };

    this.jsonEncode = function (object) {
        if ("number" === typeof(object)) {
            return object;
        }
        else {
            if (true === object || false === object || "string" === typeof(object)) {
                return '"' + object + '"';
            }
            else {

                if ("object" === typeof(object) && null !== object) {
                    var openingDelimiter = "[";
                    var closingDelimiter = "]";
                    var isObject = false;

                    for(var j in object){
                        if (isNaN(j)) {
                            isObject = true;
                            openingDelimiter = "{";
                            closingDelimiter = "}";
                        }
                    }

                    var separator = "";
                    var key = "";
                    var objectAsJSON = "";

                    for (var j in object) {
                        var key = "";
                        if(isObject){
                            key = '"'+j+'":';
                        }
                        objectAsJSON += separator + key + self.jsonEncode(object[j]);
                        separator = ",";
                    }
                    return openingDelimiter + objectAsJSON + closingDelimiter;

                }
                else {
                    return '"null"';
                }

            }
        }

    };


}
var __logger = new SmartLogger();



//++++++++++++++++++ js/type-checker.js +++++++++++++++++++


//


var reEmpty = /^[\s]*$/;
var reInt = /^[-+]?[\d]+$/;
var reFloat = /^[-+]?[\d]+[\.][\d]+$/;
var reSqlSpecialChar = /^['"\\;]$/;
var reHtmlSpecialChar = /^[<>'"&]$/;
var reEmail = /^([\w._-]+)(@[\w_-]+)(\.[\w_-]+)+$/;
var reSqlSpecialChars = /['"\\;]/;
var reHtmlSpecialChars = /[<>'"&]/;

function isEmpty(string) {
    return reEmpty.test(string);
}

function isInt(string) {
    return reInt.test(string);
}

function isFloat(string) {
    return reFloat.test(string);
}

function isNumber(string) {
    return (isInt(string) || isFloat(string));
}

function addSlashes(string) {
    var strValue = string;
    var strOutput = "";
    var index = 0;
    var slash = "";
    while (index < strValue.length) {

        if (reSqlSpecialChar.test(strValue.charAt(index))) {
            slash = "\\";
        }
        else {
            slash = "";
        }

        strOutput = strOutput + slash + strValue.charAt(index);
        index++;
    }

    return strOutput;
}

function getNewText(string) {
    switch (string) {
        case "<":
            return "lt";
        case ">":
            return "gt";
        case "'":
            return "quot";
        case '"':
            return "quot";
        case "&":
            return "amp";
        default:
            return "";
    }
}

function htmlSpecialChars(string) {
    var strValue = string;
    var strOutput = "";
    var index = 0;
    var amp = "&";
    var semicolon = ";";
    var newText = "";

    while (index < strValue.length) {

        if (reHtmlSpecialChar.test(strValue.charAt(index))) {
            amp = "&";
            semicolon = ";";
            newText = getNewText(strValue.charAt(index));
        }
        else {
            amp = "";
            semicolon = "";
            newText = strValue.charAt(index);
        }

        strOutput = strOutput + amp + newText + semicolon;
        index++;

    }

    return strOutput;
}

function hasHtmlSpecialChars(string) {
    return reHtmlSpecialChars.test(string);
}

function hasSqlSpecialChars(string) {
    return reSqlSpecialChars.test(string);
}

function isEmailAddress(string) {
    return reEmail.test(string);
}
//++++++++++++++++++ js/jquery.smartTypeAhead.js +++++++++++++++++++


(function ($) {


    $.fn.smartTypeAhead = function (options) {

        var selectedObject = this;
        //it is possible the function has already been called on this object

        var settings = {
            caseSensitive:false,
            childSelector:""
        };

        //FIRST TIME
        if (typeof (options) === 'object') {
            $.extend(settings, options);
        }


        //---
        var wrapper = $("<div style='border:1px solid gray;padding: 5px'></div>");
        selectedObject.wrap(wrapper);

        var inputBox = $("<input style='width: 100%;border: 1px solid #aaaaaa;padding:3px;margin-bottom: 0px' type='text'/>");
        inputBox.insertBefore(selectedObject);
        inputBox.before($("<span>Search for:</span><br/>"));


        var contentContainer = $("<div style='border: 0px solid black;'></div>");
        selectedObject.wrap(contentContainer);

        //filter when we type
        inputBox.keyup(function (e) {
            var searchText = inputBox.val();

            var children = $(selectedObject).children();
            if ("" !== settings.childSelector) {
                children = $(selectedObject).children(settings.childSelector);
            }

            children.each(function (i) {
                var html = $(this).html();

                if (!settings.caseSensitive) {
                    html = html.toLowerCase();
                    searchText = searchText.toLowerCase();

                }

                var indexOfSearchText = html.indexOf(searchText);

                if (indexOfSearchText >= 0) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }

            });

        });


        return this;
    };

})(jQuery);

//++++++++++++++++++ js/jquery.smartSelectableItems.js +++++++++++++++++++


(function ($) {

    var visitedSelectors = {};

    $.fn.smartSelectableItems = function (options) {

        var selector = this.selector;

        var highlightObject = function (object) {
            var hoverBackgroundColor = "rgb(0,127,200)";
            var hoverColor = "white";
            object.css({backgroundColor:hoverBackgroundColor, color:hoverColor});
        };

        var unHighlightObject = function (object) {
            var defaultBackgroundColor = object.attr("defaultBackgroundColor");
            var defaultColor = object.attr("defaultColor");
            object.css({backgroundColor:defaultBackgroundColor, color:defaultColor});
        };

        var selectObject = function (object) {
            object.attr("smart-selected", true);
            highlightObject(object);
            if ("function" === typeof(visitedSelectors[selector].settings.onSelectCallback)) {
                visitedSelectors[selector].settings.onSelectCallback(object);
            }
        };

        var unselectObject = function (object) {
            object.attr("smart-selected", "false");
            unHighlightObject(object);

        };


        if (typeof(visitedSelectors[selector]) === 'object') {
            //run commands
            if (options.cmd === "unselectObject") {
                var objectToUnSelect = options.object;
                unselectObject(objectToUnSelect);
            }

            return this;

        }

        //IF THE FIRST TIME WE ARE RUNNING THE FUNCTION
        visitedSelectors[selector] = {};

        //settings
        visitedSelectors[selector].settings = {
            multiSelect:true,
            onSelectCallback:null,
            childSelector:""
        };
        $.extend(visitedSelectors[selector].settings, options);


        var selectedObject = this;
        var children = selectedObject.children();
        if ("" !== visitedSelectors[selector].settings.childSelector) {
            children = selectedObject.children(visitedSelectors[selector].settings.childSelector);
        }


        children.each(function (i) {

            $(this).css({cursor:"pointer"});
            var defaultBackgroundColor = $(this).css("backgroundColor");
            var defaultColor = $(this).css("color");
            $(this).attr("defaultBackgroundColor", defaultBackgroundColor);
            $(this).attr("defaultColor", defaultColor);

            $(this).hover(function () {
                highlightObject($(this));
            });
            $(this).mouseout(function () {
                if ("true" !== $(this).attr("smart-selected")) {
                    unHighlightObject($(this));
                }
            });
            $(this).click(function (e) {
                if ("true" === $(this).attr("smart-selected")) {
                    unselectObject($(this));
                }
                else {
                    selectObject($(this));
                }

                if (true !== visitedSelectors[selector].settings.multiSelect) {
                    children.not($(this)).attr("smart-selected", "false");
                    children.not($(this)).css({backgroundColor:defaultBackgroundColor, color:defaultColor});
                }

            });
        });

        return this;
    };
})(jQuery);

//++++++++++++++++++ js/jquery.smartFlash.js +++++++++++++++++++


(function ($){
    $.fn.smartFlash = function(options){

        var settings = {
            count:3,
            speed:"fast"
        };

        settings = $.extend(settings, options);

        for(var i = 0; i < settings.count;i++){
            this.fadeOut(settings.speed);
            this.fadeIn(settings.speed);
        }

        return this;
    };
})(jQuery);

//++++++++++++++++++ js/jquery.smartStatus.js +++++++++++++++++++


(function ($) {

    var selectorInfo = {
        //the keys are the selectors, the values are objects containing info specific to each
    };

    var presenter = (function ($) {

        this.showStatus = function(object){
            object.slideDown("fast");
            setTimeout(function(e){
                object.slideUp("fast");
            },3000);
        };

        this.flashStatus = function (object) {
            object.fadeOut("fast", function (e) {
                object.fadeIn("fast", function (e) {
                    object.fadeOut("fast", function (e) {
                        object.fadeIn("fast", function (e) {
                            object.fadeOut("fast", function (e) {
                                object.fadeIn("fast", function (e) {
                                    object.fadeOut("fast", function (e) {
                                        object.fadeIn("fast", function (e) {
                                            object.fadeOut("fast", function (e) {
                                                object.fadeIn("fast", function (e) {

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };

        return this;
    })(jQuery);

    var logic = (function Logic($) {

        var selectorExists = function (selector) {
            return "object" === typeof (selectorInfo[selector]);
        };

        this.createSmartStatus = function (selector,options) {
            if (typeof(selectorInfo[selector]) === 'object') {
                return;
            }
            else {
                var settings = {
                  autoShow:false,
                  defaultHeader:"Notification",
                  defaultText:"no notification",

                  successHeader:"Success",
                  errorHeader:"Error"
                };

                settings = $.extend(settings, options);

                //==========create the object
                var statusObjectHTML = '<span class="smart-status-wrapper"><span class="float-wrapper"><span class="status-icon-wrapper"><img class="status-icon" src="../img/x.png"></span><span class="status-text-wrapper"><span class="status-heading">Help improve JetBrains PhpStorm</span><br/><span class="status-text">Please Tick I agree if you want to help</span></span></span></span>';
                var statusObject = $(statusObjectHTML);

                var statusTextObject = statusObject.find(".status-text");
                var statusHeadingObject = statusObject.find(".status-heading");

                statusHeadingObject.text(settings.defaultHeader);


                if(true !== settings.autoShow){
                    statusObject.hide();
                }
                else{
                    statusObject.show();
                }


                $(selector).after(statusObject);
                statusTextObject.html($(selector));
                $(selector).html(settings.defaultText);


                //=========register the selector and its object
                selectorInfo[selector] = {selector:selector, object:statusObject, settings:settings};

                //===============



            }

        };

        this.setError = function (selector, options) {
            if (selectorExists(selector)) {
                var selectorAsObject = selectorInfo[selector];
                var statusObject = selectorAsObject.object;
                var settings = selectorAsObject.settings;

                var statusTextObject = statusObject.find(".status-text");
                statusTextObject.children().eq(0).html(options);
                var statusHeadingObject = statusObject.find(".status-heading");
                statusHeadingObject.text(settings.errorHeader);

                presenter.showStatus(statusObject);
                presenter.flashStatus(statusObject);
            }
            else {
                return;
            }
        };

        this.setSuccess = function (selector, options) {

            if (selectorExists(selector)) {


                var selectorAsObject = selectorInfo[selector];
                var statusObject = selectorAsObject.object;
                var settings = selectorAsObject.settings;



                var statusTextObject = statusObject.find(".status-text");
                statusTextObject.children().eq(0).html(options);
                var statusHeadingObject = statusObject.find(".status-heading");
                statusHeadingObject.text(settings.successHeader);


                presenter.showStatus(statusObject);
                presenter.flashStatus(statusObject);
            }
            else {
                return;
            }
        };

        //must return this to create the object
        return this;
    })(jQuery);

    $.fn.smartStatus = function (commandString, options) {

        var selector = this.selector;

        if (commandString === "create") {
            logic.createSmartStatus(selector,options);
        }
        else {
            if (commandString === "setError") {
                logic.setError(selector, options);
            }
            else {
                if (commandString === "setSuccess") {
                    logic.setSuccess(selector, options);
                }
                else {
                    if (commandString === "show") {
                        return;
                    }
                    else {
                        if (commandString === "hide") {
                            return;
                        }
                        else {
                            return;
                        }
                    }
                }
            }
        }

    };
})(jQuery);


//++++++++++++++++++ js/jquery.smartAccountBalance.js +++++++++++++++++++


(function ($) {
    var balance = 0;
    var selectorInfo = {};

    var isFirstTime = true;

    var logic = (function Logic() {


        this.createBalanceWidget = function (selector) {
            if (typeof(selectorInfo[selector]) === "object") {
                return;
            }
            else{

                selectorInfo[selector] = {
                    selector:selector,
                    object:$(selector)
                };

                if(isFirstTime){
                    //it is the first object created, so we update balance
                    logic.update();

                }
                else{
                    $(selector).text(balance);
                }
            }

        };

        var afterGetBalance = function (jsonResult, statusJSON, additionalJSON) {
            if ("" === jsonResult.error) {
                isFirstTime = false;
                balance = jsonResult.balance;
                for (var key in selectorInfo) {
                    var object = selectorInfo[key];
                    object.object.text(balance);
                }
            }
            else {
                for (var key in selectorInfo) {
                    var object = selectorInfo[key];
                    object.object.text(jsonResult.error);
                }
            }
        };


        this.update = function () {
            smartCash.getBalance(afterGetBalance, {});
        };

        return this;
    })(jQuery);

    //allows you to declare an element as a container for account balance
    //which means it is updated everytime the balance is updated
    $.fn.smartAccountBalance = function (commandString, options) {
        selector = this.selector;

        if (commandString === "create") {
            logic.createBalanceWidget(selector);
        }
        else {
            if (commandString === "update") {
                logic.update();
            }
            else {
                return;
            }
        }
    };

})(jQuery);


//++++++++++++++++++ js/jquery.smartChangeHandler.js +++++++++++++++++++


(function ($){
    $.fn.smartChangeHandler = function(callback){

        if("function" !== typeof (callback)){return;}

        var selector = this.selector;
        var busy = false;


        $(selector).change(function(e){
            if(!busy){
                busy = true;
                callback();
                busy = false;
            }

        });
        $(selector).keyup(function(e){
            if(!busy){
                busy = true;
                if(!isNaN(e.which) && e.which > 0 && e.keyCode !== 13){
                    //first condition caters for IE, second for other browsers, third for return key
                    callback();
                }


                busy = false;
            }
        });
        $(selector).bind("copy paste", function(e){
            if(!busy){
                busy = true;
                callback();
                busy = false;
            }

        });
    };
})(jQuery);


//++++++++++++++++++ js/jquery.smartDialog.js +++++++++++++++++++


(function ($) {

    /*
     we call this function once to:
     a) extend the jquery plugin functions to include a function called smartDialog()
     b) set up an area where we store data relevant to the plugin function
     */


    //var selector = null;

    var dialogData = {};

    $.fn.smartDialog = function (options) {
        /**
         * for options, we expect either an object with options, or commands e.g opne, close, etc
         * @type {*}
         */

        var afterOpenDialog = function (objectOfInterest) {
            dialogData[objectOfInterest.selector].isOpen = true;
            if ('function' === typeof(dialogData[objectOfInterest.selector].settings.openCallback)) {
                dialogData[objectOfInterest.selector].settings.openCallback();
            }
        };

        var afterCloseDialog = function (objectOfInterest) {
            dialogData[objectOfInterest.selector].isOpen = false;
            if ('object' === typeof(dialogData[objectOfInterest.selector].containerElement) && null !== dialogData[objectOfInterest.selector].containerElement) {
                dialogData[objectOfInterest.selector].containerElement.remove();
                $("body").css("overflow", null);
            }

            if ('function' === typeof(dialogData[objectOfInterest.selector].settings.closeCallback)) {
                dialogData[objectOfInterest.selector].settings.closeCallback();
            }
        };

        var showDialog = function (objectOfInterest) {
            if (dialogData[objectOfInterest.selector].isOpen) {
                return objectOfInterest;
            }

            if ('object' === typeof (dialogData[objectOfInterest.selector].containerElement)) {
                $("body").css("overflow", "hidden");
                dialogData[objectOfInterest.selector].containerElement.css({
                    zIndex:dialogData[objectOfInterest.selector].settings.zIndex
                });
                dialogData[objectOfInterest.selector].containerElement.prependTo($('body'));
                dialogData[objectOfInterest.selector].containerElement.fadeTo(
                    dialogData[objectOfInterest.selector].settings.speed,
                    dialogData[objectOfInterest.selector].settings.opacity
                );
            }

            var windowScrollTop = $(document).scrollTop();
            var windowScrollLeft = $(document).scrollLeft();


            var body = document.getElementsByTagName("html")[0];
            var clientWidth = body.clientWidth;
            var clientHeight = body.clientHeight;

            var dlgWidth = objectOfInterest.width();
            var dlgHeight = objectOfInterest.height();


            var leftCoordinates = windowScrollLeft;
            if (dlgWidth < clientWidth) {
                leftCoordinates = 0.5 * clientWidth - 0.5 * dlgWidth + windowScrollLeft;
            }

            var topCoordinates = windowScrollTop;


            if (dlgHeight < clientHeight) {
                topCoordinates = 0.5 * clientHeight - 0.5 * dlgHeight + windowScrollTop;

            }


            objectOfInterest.css({top:topCoordinates, left:leftCoordinates});

            objectOfInterest.css({
                zIndex:dialogData[objectOfInterest.selector].settings.zIndex + 1,
                display:"block",
                position:"absolute"
            });
            objectOfInterest.fadeTo(dialogData[objectOfInterest.selector].settings.speed, 1.0, function (e) {
                afterOpenDialog(objectOfInterest);
            });

            $(dialogData[objectOfInterest.selector].settings.closeSelector).unbind("click");
            $(dialogData[objectOfInterest.selector].settings.closeSelector).click(function (e) {
                hideDialog(objectOfInterest);
            });

            //attach event
            $(dialogData[objectOfInterest.selector].settings.closeSelector).css({cursor:"pointer"});


        };

        var hideDialog = function (objectOfInterest) {
            if (!dialogData[objectOfInterest.selector].isOpen) {
                return objectOfInterest;
            }

            if ('object' === typeof ( dialogData[objectOfInterest.selector].containerElement) && null !== dialogData[objectOfInterest.selector].containerElement) {
                dialogData[objectOfInterest.selector].containerElement.fadeTo(dialogData[objectOfInterest.selector].settings.speed, 0.0, function (e) {
                    dialogData[objectOfInterest.selector].containerElement.css({zIndex:-1});
                });
            }
            objectOfInterest.fadeTo(dialogData[objectOfInterest.selector].settings.speed, 0.0, function (e) {
                objectOfInterest.css({display:"none"});
                objectOfInterest.css({zIndex:-1});
                afterCloseDialog(objectOfInterest);
            });

        };


        var createDialog = function (objectOfInterest, options) {

            dialogData[objectOfInterest.selector] = {};
            dialogData[objectOfInterest.selector].settings = {};

            dialogData[objectOfInterest.selector].settings.modal = true;
            dialogData[objectOfInterest.selector].settings.modalColor = "black";
            dialogData[objectOfInterest.selector].settings.left = 0;
            dialogData[objectOfInterest.selector].settings.top = 0;
            dialogData[objectOfInterest.selector].settings.opacity = 0.6;
            dialogData[objectOfInterest.selector].settings.autoOpen = true;
            dialogData[objectOfInterest.selector].settings.speed = "fast";
            dialogData[objectOfInterest.selector].settings.closeSelector = "";
            dialogData[objectOfInterest.selector].settings.closeCallback = null;
            dialogData[objectOfInterest.selector].settings.openCallback = null;
            dialogData[objectOfInterest.selector].settings.zIndex = 99998;


            dialogData[objectOfInterest.selector].settings = $.extend(dialogData[objectOfInterest.selector].settings, options);


            if (true === dialogData[objectOfInterest.selector].settings.modal) {
                dialogData[objectOfInterest.selector].containerElement = $("<div></div>");
                dialogData[objectOfInterest.selector].containerElement.css({
                    backgroundColor:dialogData[objectOfInterest.selector].settings.modalColor,
                    width:4000,
                    opacity:0,
                    position:"absolute", left:"-20px", top:"-20px",
                    zIndex:-1,
                    height:4000,
                    visibity:"hidden"
                });

            }

            objectOfInterest.css({
                display:"block",
                zIndex:-1,
                position:"absolute",
                left:dialogData[objectOfInterest.selector].settings.left,
                top:dialogData[objectOfInterest.selector].settings.top,
                opacity:0,
                visibity:"hidden"

            });

            objectOfInterest.prependTo($('body'));


            if (true === dialogData[objectOfInterest.selector].settings.autoOpen) {
                showDialog(objectOfInterest);
            }
            else {
                hideDialog(objectOfInterest);
            }
        };



        var typeofobject = typeof(dialogData[this.selector]);


        if ('string' === typeof(options)) {

            if("undefined" === typeofobject){
                __logger.log("undefined object for "+this.selector);
            }
            else{
                //run command
                if ("show" === options) {
                    showDialog(this);
                }
                else {
                    if ("hide" === options) {
                        hideDialog(this);
                    }
                    else {
                        return this;
                    }
                }
            }


        }
        else {


            //__logger.log(this.selector + " was => " + typeofobject);

            if (typeofobject === "undefined") {
                createDialog(this, options);
                //__logger.log(this.selector + " is now => " + dialogData[this.selector]);
            }
            else{
                //console.long(this.selector + "already exists");
            }


        }

        //we return this [$.fn] to allow chaining with other functions like .css(), etc
        return this;
    };

})(jQuery);
//++++++++++++++++++ js/jquery.smartTabs.js +++++++++++++++++++


(function ($) {

    var smartTabWidgetDictionary = {};


    var unhiglightTab = function (tabObject) {
        tabObject.find(".tab-title").removeClass("h-tab-button-selected");
    };


    var higlightTab = function (tabObject) {
        tabObject.find(".tab-title").addClass("h-tab-button-selected");
    };


    var selectTab = function (tabObject, selector) {
        var tabEnabled = tabObject.attr("enabled");
        if (tabEnabled !== "false") {

            for (var i = 0; i < smartTabWidgetDictionary[selector].tabCollection.length; i++) {
                unhiglightTab(smartTabWidgetDictionary[selector].tabCollection[i]);
                smartTabWidgetDictionary[selector].childCollection[i].slideUp();

                if (smartTabWidgetDictionary[selector].tabCollection[i] === tabObject) {
                    higlightTab(tabObject);
                    smartTabWidgetDictionary[selector].childCollection[i].slideDown();

                }

            }

        }
        //notify event handlers of tabs
        var tabTitle = tabObject.text();
        var onSelectionChangedCallback = smartTabWidgetDictionary[selector].onSelectionChanged;
        var onSelectionChangedAdditionalInfo = smartTabWidgetDictionary[selector].onSelectionChangedAdditionalInfo;
        if("function" === typeof(onSelectionChangedCallback)){
            var eventArgs = {
                title:tabTitle,
                additionalInfo:onSelectionChangedAdditionalInfo
            };
            onSelectionChangedCallback(eventArgs);
        }
    };

    var createSmartTabWidgetForSelector = function (selector) {


        smartTabWidgetDictionary[selector] = {
            selector:this.selector,
            tabCollection:[],
            childCollection:[],
            tabIndicator:null
        };

        //create container
        var smartTabsWidget = $('<div class="h-tab-wrapper2"></div>');
        var contentToBeTabified = $(selector);
        contentToBeTabified.after(smartTabsWidget);




        //create tab list
        var tabsList = $('<div class="h-tab-list"></div>');
        smartTabsWidget.append(tabsList);

        //create tab indicator
        smartTabWidgetDictionary[selector].tabIndicator = $('<div class="h-tab-indicator"></div>');
        smartTabsWidget.append(smartTabWidgetDictionary[selector].tabIndicator);


        var tabContentWrapper = $('<div class="h-tab-content-wrapper"></div>');
        smartTabsWidget.append(tabContentWrapper);
        tabContentWrapper.html(contentToBeTabified);

        //fill tab list with tabs
        contentToBeTabified.children().each(function (i) {
            var title = $(this).attr("title");
            var index = i;

            if (typeof(title) !== "string") {
                title = "Tab " + index;
            }


            $(this).hide();

            var tabButton = $('<span smart-tab-index='+index+' class="h-tab-button" text="'+title+'"><span class="tab-title">'+title+'</span></span>');
            tabsList.append(tabButton);

            smartTabWidgetDictionary[selector].tabCollection.push(tabButton);
            smartTabWidgetDictionary[selector].childCollection.push($(this));

            tabButton.click(function (e) {
                var tabIndex = tabButton.attr("smart-tab-index");

                for (var i = 0; i < smartTabWidgetDictionary[selector].tabCollection.length; i++) {

                    if (tabButton === smartTabWidgetDictionary[selector].tabCollection[i]) {
                        selectTab(tabButton, selector);

                    }
                }

            });


        });


        selectTab(smartTabWidgetDictionary[selector].tabCollection[0], selector);
    };

    $.fn.smartTabs = function (options) {
        var widgetSelector = this.selector;

        var shouldOverride = true;

        if(typeof (smartTabWidgetDictionary[widgetSelector]) === "undefined" || shouldOverride === true){
            createSmartTabWidgetForSelector(widgetSelector);
        }
        //otherwise execute commands
        if(typeof(options.currentTab) === "string"){
            for(var i in smartTabWidgetDictionary[widgetSelector].tabCollection){
                var tabButton = smartTabWidgetDictionary[widgetSelector].tabCollection[i];
                if(tabButton.attr("text") === options.currentTab){
                    selectTab(tabButton,widgetSelector);
                    break;
                }
            }

        }

        if(typeof(options.indicatorStyles) === "object"){
            smartTabWidgetDictionary[widgetSelector].tabIndicator.css(options.indicatorStyles);
        }

        if(typeof(options.onSelectionChanged) === "function"){
            smartTabWidgetDictionary[widgetSelector].onSelectionChanged = options.onSelectionChanged;
        }
        if(typeof(options.onSelectionChangedAdditionalInfo) !== "undefined"){
            smartTabWidgetDictionary[widgetSelector].onSelectionChangedAdditionalInfo = options.onSelectionChangedAdditionalInfo;
        }


    };
})(jQuery);
//++++++++++++++++++ js/jquery.smart_click_to_act.js +++++++++++++++++++


(function($){


    $.fn.smartClickToShow = function(targetSelector){
        var selector = this.selector;
        $(selector).click(function(e){
            $(targetSelector).slideDown();
            return false;
        });
    };

    $.fn.smartClickToHide = function(targetSelector){
        var selector = this.selector;
        $(selector).click(function(e){
            $(targetSelector).slideUp();
            return false;
        });
    };

    $.fn.smartClickToToggle = function(targetSelector){
        var selector = this.selector;
        $(selector).click(function(e){
            $(targetSelector).slideToggle();
            return false;
        });
    };

    $.fn.smartClickToAddClass = function(options){
        var selector = this.selector;
        var settings = {to:null,className:null};
        settings = $.extend(settings,options);
        var targetSelector = settings.to, className = settings.className;

        $(selector).click(function(e){
            $(targetSelector).addClass(className);
            return false;
        });
    };

    $.fn.smartClickToRemoveClass = function(options){
        var selector = this.selector;
        var settings = {from:null,className:null};
        settings = $.extend(settings,options);
        var targetSelector = settings.from, className = settings.className;

        $(selector).click(function(e){
            $(targetSelector).removeClass(className);
            return false;
        });
    };

    $.fn.smartClickToAct = function(options){
        var selector = this.selector;
        var settings = {
          show:null,hide:null,addClass:null,removeClass:null
        };

        settings = $.extend(settings,options);

        if(typeof(settings.show) == "string" ){
            $(selector).smartClickToShow(settings.show);
        }
        if(typeof(settings.hide) == "string" ){
            $(selector).smartClickToHide(settings.hide);
        }
        if(typeof(settings.addClass) === "object" && null !== settings.addClass ){
            $(selector).smartClickToAddClass(settings.addClass);
        }

        if(typeof(settings.removeClass) === "object" && null !== settings.removeClass ){
            $(selector).smartClickToRemoveClass(settings.removeClass);
        }

    };

})(jQuery);
//++++++++++++++++++ js/content-navigator.js +++++++++++++++++++



       //the code
       function ContentNavigator(selector){
           
           //declarations
           this.items = $(selector);
           this.firstItem = null;
           this.currentItemIndex = 0;
           
           var myself = this;
           
           
           if(this.items === null){return;}
           
           this.buttonNext = $("<input type='button' class='nav-button' value='Next&nbsp;&#9658;' class='navigationButton-buttonNext' />");
           this.buttonPrev = $("<input type='button' class='nav-button' value='&#9668;&nbsp;Back' class='navigationButton-buttonPrev' />");
           this.itemsWrapper = $("<div style='border:1px solid red' class='itemsWrapper'></div>");
           
           this.items.hide();  
                        
           
           this.items.parent().after(this.buttonNext);
           this.items.parent().after(this.buttonPrev);
           this.buttonNext.click(function(event){myself.showNext();}); 
           this.buttonPrev.click(function(event){myself.showPrev();});
          
           
           //this.buttonNext.after(this.itemsWrapper); 
           
           for(var i = 0; i < this.items.length; i++){
               //this.items.eq(i).append(this.buttonNext);
               //this.items.eq(i).css({'border':'2px solid red'});
           }
           
                          
           this.showPage = function(pageIndex){
               
               if(isNaN(pageIndex)){return;}                  
               if(pageIndex >=0 && pageIndex < this.items.length){
                   this.items.hide('slow');
                   this.items.eq(pageIndex).show('slow');
                   
                   
                    this.buttonPrev.hide();
                    this.buttonNext.hide();

                   
                   if(pageIndex > 0){
                        this.buttonPrev.show();
                   }
                   if(pageIndex < this.items.length - 1){
                        this.buttonNext.show();
                   }                                      
                   
               }               
               
           
           }
           
           this.showNext = function(){
               
               if(this.currentItemIndex < this.items.length - 1){
                        this.currentItemIndex += 1;
                        this.showPage(this.currentItemIndex);
                    }
           }
           
            this.showPrev = function(){
               
               if(this.currentItemIndex > 0){
                        this.currentItemIndex -= 1;
                        this.showPage(this.currentItemIndex);
                    }
           }
           
           
           this.showPage(this.currentItemIndex);
                              
       }
       
//</script>
//++++++++++++++++++ js/globalTimer.js +++++++++++++++++++


function GlobalTimer() {

    var self = this;

    var listeners = [];
    var namedListenerDictionary = {};

    var interval = 5000;
    var timerId = null;
    var timerRunning = false;


    var invokeListeners = function () {

        _.each(listeners, function (value, index, list) {
            var callback = value;
            if ("function" === typeof(callback)) {
                callback();
            }
            else {
//                __logger.log(callback + " is not a callback");
            }
        });
        removeInvalidListeners();
    };

    this.exists = function (callback) {
        return _.contains(listeners, callback);
    };

    var addUnnamedListener = function (callback) {
        if ("function" !== typeof (callback)) {
            return false;
        }

        if (self.exists(callback)) {
            return false;
        }

        listeners.push(callback);
        return true;
    };

    this.addListener = function (callback) {
//        __logger.log("before add-unnamed: " + getListeners());
        addUnnamedListener(callback);
//        __logger.log("after add-unnamed: " + getListeners());
    };

    this.addNamedListener = function (callback, uniqueStringIdentifier) {
//        __logger.log("before add-Named: " + getListeners());
        var result = false;
        if (addUnnamedListener(callback)) {
            namedListenerDictionary[uniqueStringIdentifier] = callback;
            result = true;
        }
//        __logger.log("after add-Named: " + getListeners());
        return result;
    };

    var getUnnamedListeners = function () {
        var result = _.reduce(listeners, function (initialValue, value, key, object) {
            return initialValue + value.name + ";";
        }, "");

        return result;
    };

    var getListeners = function () {

        return "unmaned: {" + getUnnamedListeners() + "} --- named: {" + getNamedListeners() + "}";
    };

    var getNamedListeners = function () {
        var result = _.reduce(namedListenerDictionary, function (initialValue, value, key, object) {
            return initialValue + key + "=" + value.name + ";";
        }, "");

        return result;
    };

    var doRemoveListener = function (callback) {
        listeners = _.without(listeners, callback);

        var temporaryDictionary = namedListenerDictionary;
        namedListenerDictionary = {};
        for (var key in temporaryDictionary) {
            if (temporaryDictionary[key] !== callback) {
                namedListenerDictionary[key] = temporaryDictionary[key];
            }
        }

    };


    this.removeListener = function (callback) {
//        __logger.log("before remove listener " + callback.name + ": " + getListeners());
        doRemoveListener(callback);
//        __logger.log("after remove listener: " + getListeners());
        //__logger.log(namedListenerDictionary);
    };


    this.removeNamedListener = function (uniqueStringIdentifier) {
//        __logger.log("before remove named callback " + uniqueStringIdentifier + ": " + getListeners());
        doRemoveListener(namedListenerDictionary[uniqueStringIdentifier]);
//        __logger.log("after remove named callback " + uniqueStringIdentifier + ": " + getListeners());
        // __logger.log(namedListenerDictionary);

    };

    this.removeAllListeners = function () {
        listeners = [];
        namedListenerDictionary = {};
    };

    this.removeAllNamedListenersInList = function (arrayOfUniqueStringIdentifiers) {
//        __logger.log("before removing those in list:: " + getListeners());
        _.each(arrayOfUniqueStringIdentifiers, function (value) {
            self.removeNamedListener(value);
        });
//        __logger.log("after removing those in list:: " + getListeners());
    };

    this.removeAllListenersExceptNamed = function (arrayOfUniqueStringIdentifiers) {

        listeners = [];

        var temporaryDictionary = namedListenerDictionary;
        namedListenerDictionary = {};

        for (var key in temporaryDictionary) {
            for (var index in arrayOfUniqueStringIdentifiers) {
                if (arrayOfUniqueStringIdentifiers[index] === key) {
                    namedListenerDictionary[key] = temporaryDictionary[key];
                    listeners.push(temporaryDictionary[key]);
                }
            }
        }

//        __logger.log("after except: " + getListeners());

    };

    var removeInvalidListeners = function () {
        listeners = _.filter(listeners, function (value) {
            return "function" === typeof(value);
        });

        var temporaryDictionary = namedListenerDictionary;
        namedListenerDictionary = {};
        for (var key in temporaryDictionary) {
            if (self.exists(temporaryDictionary[key])) {
                namedListenerDictionary[key] = temporaryDictionary[key];
            }
        }
    };

    var doSetInterval = function (newInterval) {
        if (!isNaN(newInterval)) {
            interval = newInterval;
            if (true === timerRunning) {
                stop();
                self.start();
            }
            return this;
        }
        throw new Error("Number expected as value for newInterval, but found " + typeof(newInterval));
    };

    var getInterval = function () {
        return interval;
    };


    this.start = function () {
        timerRunning = true;
        timerId = setInterval(invokeListeners, interval);
        return this;
    };

    var stop = function () {
        timerRunning = false;
        clearInterval(timerId);
        return this;
    };

    (function initialize() {
        self.start();
    })();

}

var globalTimer = new GlobalTimer();

//++++++++++++++++++ js/application-states.js +++++++++++++++++++


var applicationStates = {
    IDLE:0,
    LOADING_CASH:1,
    SENDING_CASH:2,
    BUYING_AIRTIME:3,
    PAYING_BILLS:4,
    DONATING:5,
    PURCHASING_ITEM:6
};

var namedListeners = {
    updateCommentViewers:"update_comment_viewers",
    getEvents:"get_events"
};
//++++++++++++++++++ js/smartcash-client.js +++++++++++++++++++


function SmartCash() {
    var smartCash = this;
    this.result = null;
    var resultText = "";

    //login status codes
    SmartCash.loginStatus = {NOT_LOGGED_IN:0, LOGGED_IN:1};

    var querySmartCash = function (dataToServerAsJSON, callback, additionalDataForCallbackAsJSON) {
        $.ajax({
            async:true,
            cache:false,
            url:"/smartcash/api/core",
            data:dataToServerAsJSON,
            dataType:"json",
            processData:true,
            success:function (text) {
                resultText = text;
                smartCash.result = text;

                //TODO: include option to report the bug of non valid json; passing the dataToServerAsJSON as the parameters for the report
                //we add some metadata - where initiator is the function that initiated the ajax request

                if ("function" === typeof(callback)) {
                    callback(smartCash.result, {status:"success"}, additionalDataForCallbackAsJSON);
                }
                else {
                    alert("no callback function to receive the response for " + dataToServerAsJSON.cmd + " or mismatch between expected and observed function signature");
                }

            },
            error:function (text) {
                callback({"error":"can not connect to the server"}, {status:"error"}, additionalDataForCallbackAsJSON);

            }


        });
    };

    var getTimezoneOffsetFromGMTInMinutes = function () {
        return (new Date().getTimezoneOffset() * -1);
    };

    function evaluate(daCode){
        var code_evaled;
        function eval_global(codetoeval) {
            if (window.execScript)
                window.execScript('code_evaled = ' + '(' + codetoeval + ')',''); // execScript doesn’t return anything
            else
                code_evaled = eval(codetoeval);
            return code_evaled;
        }

        return eval_global(daCode);
    }

    this.checkLoginStatus = function (callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'getLoginStatus'}, callback, additionalDataForCallbackAsJSON);
    };

    this.login = function (loginOptions, callback, additionalDataForCallbackAsJSON) {
        loginOptions.cmd = 'login';
        return querySmartCash(loginOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.signUp = function (signupOptions, callback, additionalDataForCallbackAsJSON) {
        signupOptions.cmd = 'signup';
        return querySmartCash(signupOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.sendVerificationCode = function (verificationOptions, callback, additionalDataForCallbackAsJSON) {
        verificationOptions.cmd = 'sendVerificationCode';
        return querySmartCash(verificationOptions, callback, additionalDataForCallbackAsJSON);
    };


    this.sendCash = function (sendCashOptions, callback, additionalDataForCallbackAsJSON) {
        sendCashOptions.cmd = 'sendCash';
        return querySmartCash(sendCashOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.loadCash = function (loadCashOptions, callback, additionalDataForCallbackAsJSON) {
        loadCashOptions.cmd = 'loadCash';
        return querySmartCash(loadCashOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.loadVoucher = function (loadVoucherOptions, callback, additionalDataForCallbackAsJSON) {
        loadVoucherOptions.cmd = 'loadVoucher';
        return querySmartCash(loadVoucherOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.logout = function (callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'logout'}, callback, additionalDataForCallbackAsJSON);
    };

    this.getTransactions = function (transactionOptions, callback, additionalDataForCallbackAsJSON) {
        transactionOptions.cmd = 'getTransactions';
        transactionOptions.timezoneOffset = getTimezoneOffsetFromGMTInMinutes();
        return querySmartCash(transactionOptions, callback, additionalDataForCallbackAsJSON);
    };

    this.getBalance = function (callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'getBalance'}, callback, additionalDataForCallbackAsJSON);
    };

    this.getTransactionDetails = function (href, callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'getTransactionDetails', id:href}, callback, additionalDataForCallbackAsJSON);
    };

    this.sendAuthenticationCode = function (callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'sendAuthenticationCode'}, callback, additionalDataForCallbackAsJSON);
    };

    this.getForexRate = function (sourceCurrency, destinationCurrency, callback, additionalDataForCallbackAsJSON) {
        return querySmartCash({cmd:'getForexRate', from:sourceCurrency, to:destinationCurrency}, callback, additionalDataForCallbackAsJSON);
    };


    this.createVoucher = function (createVoucherOptions, callback, additionalDataForCallbackAsJSON) {
        createVoucherOptions.cmd = 'createVoucher';
        return querySmartCash(createVoucherOptions, callback, additionalDataForCallbackAsJSON);
    };
}

var smartCash = new SmartCash();
//++++++++++++++++++ js/store-client.js +++++++++++++++++++


var StoreClient = function () {
    var myself = this;
    var theUrl = "/smartcash/api/store";

    var queryUrl = function (url, dataAsJSONObject, callback, additionalDataAsJSON, dataType) {

        var ajaxOptions = {
            async:true,
            cache:false,
            url:url,
            data:dataAsJSONObject,
            processData:true,
            success:function (text) {
                jsonResult = text;
                callback(jsonResult, {status:"success"}, additionalDataAsJSON);
            },
            error:function () {
                var text = "{'error':'can not connect to the server'}";
                var jsonResult = text;
                callback(jsonResult, {status:"error"}, additionalDataAsJSON);
            }

        };

        if (typeof (dataType) !== "undefined" && null !== dataType) {
            ajaxOptions.dataType = dataType;
        }

        $.ajax(ajaxOptions);

    };

    var queryStore = function (dataAsJSONObject, callback, additionalDataAsJSON) {
        var dataType = "json";
        queryUrl(theUrl, dataAsJSONObject, callback, additionalDataAsJSON, dataType);
    };

    this.queryUrl = function (url, dataAsJSONObject, callback, additionalDataAsJSON, dataType) {
        queryUrl(url, dataAsJSONObject, callback, additionalDataAsJSON, dataType);
    };

    this.getProducts = function (productOptions, callback, additionalDataAsJSON) {
        productOptions.cmd = 'getProducts';
        queryStore(productOptions, callback, additionalDataAsJSON);

    };

    this.getCategories = function (categoryOptions, callback, additionalDataAsJSON) {
        categoryOptions.cmd = 'getCategories';
        queryStore(categoryOptions, callback, additionalDataAsJSON);
    };

    this.getProductsInCart = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'getProductsInCart';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.addProductsToCart = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'addProductsToCart';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.removeProductsFromCart = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'removeProductsFromCart';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.getProductsInCart = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'getProductsInCart';
        queryStore(options, callback);
    };

    this.search = function (searchOptions, callback, additionalDataAsJSON) {
        searchOptions.cmd = 'search';
        queryStore(searchOptions, callback, additionalDataAsJSON);

    };

    this.makeOffer = function (offerOptions, callback, additionalDataAsJSON) {
        offerOptions.cmd = 'makeOffer';
        queryStore(offerOptions, callback, additionalDataAsJSON);
    };

    this.setOfferStatus = function (offerStatusOptions, callback, additionalDataAsJSON) {
        offerStatusOptions.cmd = 'setOfferStatus';
        queryStore(offerStatusOptions, callback, additionalDataAsJSON);
    };

    this.getOffers = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'getOffers';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.buyProducts = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'buyProducts';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.sendFriendRequest = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'sendFriendRequest';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.setFriendRequestStatus = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'setFriendRequestStatus';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.getReceivedFriendRequests = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'getReceivedFriendRequests';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.postProductComment = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'postProductComment';
        queryStore(options, callback, additionalDataAsJSON);
    };


    this.postComplaintOnInvoice = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'postComplaintOnInvoice';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.honourOffers = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'honourOffers';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.inviteFriendsByPhone = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'inviteFriendsByPhone';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.inviteFriendsByEmail = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'inviteFriendsByEmail';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.refundCashForInvoice = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'refundCashForInvoice';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.sendOrderConfirmationCode = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'sendOrderConfirmationCode';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.sendDeliveryPaymentCode = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'sendDeliveryPaymentCode';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.payForDelivery = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'payForDelivery';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.recommendProduct = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'recommendProduct';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.postToWall = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'postToWall';
        queryStore(options, callback, additionalDataAsJSON);
    };

    this.markMessagesAsRead = function (options, callback, additionalDataAsJSON) {
        options.cmd = 'markMessagesAsRead';
        queryStore(options, callback, additionalDataAsJSON);
    };

};
var storeClient = new StoreClient();
//++++++++++++++++++ js/smartEvents.js +++++++++++++++++++


//======================================================================================
var smartEventType = {
    postedProduct:"uploaded_product",
    updatedProduct:"updated_product",
    viewedProduct:"viewed_product",
    commentedOnProduct:"commented_on"
};

var smartViewerType = {
    activityStreamItem:"activity_stream_item",
    commentWidgetItem:"comment_widget_item"
};

function EventController() {

    var listenerObjects = [];
    var canGetEvents = false;
    var _this = this;
    var busy = false;
    var latestActivityId = null;
    var lastUpdateTime = null;

    var rateLimiter = null;


    function ListenerObject(func, smartEventType, smartViewerType) {
        this.callback = func;
        this.eventType = smartEventType;
        this.viewerType = smartViewerType;
    }

    this.setLatestActivityId = function (activityId) {
        latestActivityId = activityId;
    };

    this.setLastUpdateTime = function (updateTime) {
        lastUpdateTime = updateTime;
    };

    var logError = function (message) {
        __logger.log("events error: " + message);
    };

    var logInfo = function (message) {
        __logger.log("EVENTS INFO: " + message);
    };

    var isPossibleEvent = function (eventType) {
        var possibleEvents = _.values(smartEventType);
        return _.contains(possibleEvents, eventType);
    };

    var isPossibleViewerType = function (viewerType) {
        var possibleViewerTypes = _.values(smartViewerType);
        return _.contains(possibleViewerTypes, viewerType);
    };

    var doRegisterListener = function (func, smartEventType, smartViewerType) {
        listenerObjects.push(new ListenerObject(func, smartEventType, smartViewerType));
    };

    this.addListener = function (func, smartEventType, smartViewerType) {
        if (_.isFunction(func)) {
            if (isPossibleEvent(smartEventType)) {
                if (isPossibleViewerType(smartViewerType)) {
                    doRegisterListener(func, smartEventType, smartViewerType);
                }
                else {
                    logError("invalid smartViewerType passed to addLisetener");
                }
            }
            else {
                logError("invalid smartEventType passed to addListener");
            }
        }
        else {
            logError("expected fuction for addLisetener, found " + typeof(func));
        }
    };

    this.removeListener = function (func) {
    };

    this.removeAllListener = function () {
        listenerObjects = [];
    };

    var enable = function () {
        canGetEvents = true;
    };

    var disable = function () {
        canGetEvents = false;
    };

    /* called for each server event in events list */
    var notifyEventListeners = function (event, eventIndexInList, listOfEvents) {
        var targetViewerType = event.viewer_type;
        var html = event.html;
        if(targetViewerType === 'event_collection'){
            smartBaloon.notifyUpdates();
            eventCollections.notifyAll(html);
        }

    };

    var processEvents = function (html_array) {
        var isArray = _.isArray(html_array);
        if (isArray) {
            _.each(html_array, notifyEventListeners);
        }
        else {
            __logger.assert("expected array of events, but found type " + typeof (html_array));
        }
    };


    var afterGetEvents = function (text) {
        busy = false;

        var jsonResult = unsafeJSONParse(text);
        var isAcceptableReturnResult = null !== jsonResult && "object" === typeof(jsonResult);
        if (isAcceptableReturnResult) {
            if ("" === jsonResult.error) {

                var metadata = jsonResult.metadata;
                var count = metadata.count;
                var updateTime = metadata.update_time;
                var prevUpdateTime = lastUpdateTime;
                lastUpdateTime = updateTime;
                logInfo("last update time changed from " + prevUpdateTime + " to " + lastUpdateTime);

                var html_array = jsonResult.html_array;

                if (html_array.length > 0) {
                    rateLimiter.resetDelay();

                    logInfo("NEW activities detected, so reseting delay from "+rateLimiter.lastDelay()+" to "+rateLimiter.currentDelay());
                    var order = metadata.order;
                    var newLatestActivityId = metadata.first;
                    if(order === 'asc'){
                        newLatestActivityId = metadata.last;
                    }
                    var prevLatestActivityId = latestActivityId;
                    latestActivityId = newLatestActivityId;
                    logInfo("changed latest activity id from: " + prevLatestActivityId + " to " + latestActivityId);
                    processEvents(html_array);
                }
                else {
                    rateLimiter.increaseDelay();
                    logInfo("no new activities, so latest activity id did not change - AND also increasing delay from "+rateLimiter.lastDelay()+" to "+rateLimiter.currentDelay());
                }

            }
            else {
                rateLimiter.reschedule();
                logError(jsonResult.error);
            }
        }
        else {
            rateLimiter.reschedule();
            __logger.assert(isAcceptableReturnResult,"expected json object as return value for doGetEvents, found "+typeof(jsonResult));
        }


    };

    var doGetEvents = function () {

        var options = {cmd:"getEvents", maximumNumber:10,order:'asc'};

        var haSinceTime = smartUtils.inspection.isSmartDateTimeString(lastUpdateTime);
        if (haSinceTime) {
            options.since = lastUpdateTime;
        }
        else {
            if (latestActivityId !== null) {
                options.afterActivityId = latestActivityId;
            }
            else{
                __logger.assert(haSinceTime,"neither since nor latestActivityId variable set for event controller. quiting event fetching since it might cause malfunctioning");
                return;
            }
        }

        var dataString = smartParams.join(options);
        options = {success:afterGetEvents};
        smartLoader.loadFile("index.php?" + dataString, options);
    };

    var getNewEvents = function () {
        return;
        if (!canGetEvents) {
            rateLimiter.reschedule();
        }
        else{
            if (busy) {
                rateLimiter.reschedule();
            }
            else {
                doGetEvents();
            }
        }
    };

    var updateEventFetchingState= function(){
        var userLoggedIn = $.cookie('userLoggedIn');
        if (userLoggedIn) {
            enable();
        }
        else {
            disable();
        }
    };

    this.init = function(){
        updateEventFetchingState();
        rateLimiter = new RateLimiter(getNewEvents,smartSettings.events.interval,60000,5000);

        heartbeat.events.onActive.addListener(function(e){
            updateEventFetchingState();
            getNewEvents();
        });
        heartbeat.events.onTimeout.addListener(disable);

        signinModule.events.onLogin.addListener(function(loginResult){
            lastUpdateTime = loginResult.login_time;
            enable();
        });
        signinModule.events.onLogout.addListener(disable);
    };
}
//=========================================================================================
var eventController = new EventController();



//++++++++++++++++++ js/smart-timers2.js +++++++++++++++++++


var SmartTimers = {};
SmartTimers.timers = new Array();
SmartTimers.currentTimer = null;

SmartTimers.Timer = function () {
    var interval = 1000;
    var callback = null;
    var timerId = null;

    var timerRunning = false;

    var myself = this;
    //stop all the other timers
    if(SmartTimers.timers.length > 0){
        for(var i = SmartTimers.timers.length - 1; i >= 0;i--){
            SmartTimers.timers[i].stop();
        }
        SmartTimers.timers = new Array();
    }
    SmartTimers.timers.push(myself);
    SmartTimers.currentTimer = myself;

    SmartTimers.Timer.prototype.setInterval = function (newInterval) {
        if (!isNaN(newInterval)) {
            interval = newInterval;
            if(true === timerRunning){
                this.stop();
                this.start();
            }
            return this;
        }
        throw new Error("Number expected as value for newInterval, but found " + typeof(newInterval));
    };

    SmartTimers.Timer.prototype.getInterval = function () {
        return interval;
    };

    SmartTimers.Timer.prototype.onTick = function (timerCallback) {
        callback = timerCallback;
        if(true === timerRunning){
            this.stop();
            this.start();
        }
        return this;

    };

    SmartTimers.Timer.prototype.start = function () {
        timerRunning = true;
        timerId = setInterval(callback, interval);
        return this;
    };

    SmartTimers.Timer.prototype.stop = function () {
        timerRunning = false;
        clearInterval(timerId);
        return this;
    };

};


SmartTimers.Timeout = function () {
    var timeout = 1000;
    var callback = null;
    var timerId = null;

    var timerRunning = false;

    SmartTimers.Timeout.prototype.setTimeout = function (newTimeout) {
        if (!isNaN(newTimeout)) {
            timeout = newTimeout;
            if(true === timerRunning){
                this.stop();
                this.start();
            }
            return this;
        }
        throw new Error("Number expected as value for newTimeout, but found " + typeof(newTimeout));
    };

    SmartTimers.Timeout.prototype.getTimeout = function () {
        return timeout;
    };

    SmartTimers.Timeout.prototype.onTimeout = function (timeoutCallback) {
        callback = timeoutCallback;
        if(true === timerRunning){
            this.stop();
            this.start();
        }
        return this;

    };

    SmartTimers.Timeout.prototype.start = function () {
        timerRunning = true;
        timerId = setTimeout(callback, timeout);
        return this;
    };

    SmartTimers.Timeout.prototype.stop = function () {
        timerRunning = false;
        clearTimeout(timerId);
        return this;
    };

};

//++++++++++++++++++ js/smart-mvc.js +++++++++++++++++++



SmartMVC = new Object();

SmartMVC.newObject = function (objectToClone) {
    var obj = {};

    for (var key in objectToClone) {
        obj[key] = objectToClone[key];
    }
    return obj;
};

SmartMVC.Model = function () {
    if(!(this instanceof SmartMVC.Model)){return new SmartMVC.Model();}


    var modelId;
    var data = "";
    var subscribers = [];

    var notify = function () {
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].update();
        }
    };

    SmartMVC.Model.prototype.notifyDelete = function(){
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].onDeleteModel();
        }
    };

    SmartMVC.Model.prototype.id = function () {
        return modelId;
    };

    SmartMVC.Model.prototype.setId = function (newId) {
        modelId = newId;
    };

    SmartMVC.Model.prototype.data = function () {
        return data;
    };

    SmartMVC.Model.prototype.subscribe = function (view) {
        subscribers.push(view);
    };

    SmartMVC.Model.prototype.unsubscribe = function(view){
        var newSubscribers = new Array();
        for(var a = 0; a < subscribers.length;a++){
            if(subscribers[a] !== view){
                newSubscribers.push(subscribers[a]);
            }
        }
        subscribers = newSubscribers;
    };

    SmartMVC.Model.prototype.set = function (newData, updateView) {
        data = newData;
        if (true !== updateView) {
            return;
        }
        notify();


    };

    var obj = {};
    for(var key in this){
        obj[key] = this[key];
    }
    obj.constructor = SmartMVC.Model;
    return obj;

};


SmartMVC.View = function () {
    if(!(this instanceof SmartMVC.View)){return new SmartMVC.View();}

    var viewId = "";
    var sourceModel = null;

    SmartMVC.View.prototype.setId = function (id) {
        viewId = id;
    };

    SmartMVC.View.prototype.attach = function (model) {
        this.detach();
        sourceModel = model;
        model.subscribe(this);
    };

    SmartMVC.View.prototype.detach = function (){
        if(sourceModel !== null){
            sourceModel.unsubscribe(this);
        }
    };

    SmartMVC.View.prototype.update = function () {
        //this is where the implementation changes
        //for now, let us just set the content of the id
        //to be the data we have received
    };

    SmartMVC.View.prototype.onDeleteModel = function(){
        //what to do in case the model says it is being deleted
        //you could for instance detacb yourself and delete the
        //corresponding view from the user interface
    };

    SmartMVC.View.prototype.data = function () {
        return sourceModel.data();
    };

    SmartMVC.View.prototype.id = function () {
        return viewId;
    };

    var obj = {};
    for(var key in this){
        obj[key] = this[key];
    }
    obj.constructor = SmartMVC.View;
    return obj;

};


SmartMVC.ModelCollection = function() {
    if(!(this instanceof SmartMVC.ModelCollection)){return new SmartMVC.ModelCollection();}


    var models = [];

    SmartMVC.ModelCollection.prototype.add = function (model) {
        models.push(model);
        length = models.length;

    };

    SmartMVC.ModelCollection.prototype.remove = function(model){
        var newModels = new Array();
        for(var b = 0; b < models.length; b++){
            if(models[b] !== model){
                newModels.push(models[b]);
            }
        }
        models = newModels;
    };

    SmartMVC.ModelCollection.prototype.ids = function () {
        var ids = new Array();
        for (var x = 0; x < models.length; x++) {
            ids.push(models[x].id());
        }
        return ids;
    };

    SmartMVC.ModelCollection.prototype.findById = function (modelId) {

        var length = models.length;
        var targetModel = null;

        for (var i = 0; i < length; i++) {

            if (models[i].id() === modelId) {
                return models[i];
            }
        }
        return null;
    };



    var obj = {};
    for(var key in this){
        obj[key] = this[key];
    }
    obj.constructor = SmartMVC.ModelCollection;
    return obj;

};
//++++++++++++++++++ js/comment-viewers.js +++++++++++++++++++


function CommentViewers($) {
    var commentCallbacks = [];
    var self = this;

    this.removeAllListeners = function(){
        commentCallbacks = [];
    };

    this.addListener = function(func){
        if(_.has(commentCallbacks, func)){
            return;
        }
        commentCallbacks.push(func);
    };

    this.invokeReceivedUpdate = function(sender, eventArgs){

        _.each(commentCallbacks, function(callback, index, list){
            callback(sender, eventArgs);
        });
    };


    var onReceivedUpdate = function (eventArgs) {
        _.each(commentCallbacks, function(callback, index, list){
            callback(self, eventArgs);
        });
    };


    (function initialize(){
        eventController.addListener(onReceivedUpdate, smartEventType.commentedOnProduct, smartViewerType.commentWidgetItem);
    })();



    return this;
}



function CommentViewer(theWrapperId,$) {
    var wrapperId = theWrapperId;
    var wrapperSelector = ".product-comments-overall-wrapper" + "#" + wrapperId;

    var commentItemWrapperSelector = ".comment-wrapper";


    var notificationSelector = wrapperSelector + " .product-comment-notification";
    var productCommentInputSelector = wrapperSelector + " #product-comment-input";
    var containerId = wrapperSelector + ' .product-comments-container';
    var commentSubmitSelector = wrapperSelector + " [action=submit-product-comment]";
    __logger.log("comment-submitter-selector: "+commentSubmitSelector);

    var myself = this;
    var timer = null;

    var defaultNotificationText = $(notificationSelector).text();
    var defaultSubmitText = $(commentSubmitSelector).children(".text").text();
    //======================================

    var callbacks = {
        onPostComment:new Array()
    };

    var onPostComment = {
        add:function (callback) {
            if ("function" !== typeof (callback)) {
                return;
            }
            callbacks.onPostComment.push(callback);

        }
    };

    this.addListener = function(callback){
        onPostComment.add(callback);
    };

    //=====================================
    var objectId = $(containerId).attr('product-id');
    var url = $(containerId).attr('url');

    //=========================================
    var fireCallbacks = function (callbackKey, eventArgs) {
        var callbacksToFire = callbacks[callbackKey];
        for (var i = 0; i < callbacksToFire.length; i++) {
            var callback = callbacksToFire[i];
            if ("function" === typeof (callback)) {
                callback(myself, eventArgs);
            }
        }
    };

    //===========================================
    var submitComment = function () {
        var comment = $(productCommentInputSelector).text();
        var productId = $(containerId).attr('product-id');

        var options = {comment:comment, productId:productId, cmd:"postProductComment"};

        $(commentSubmitSelector).find(".text").text("commenting...");
        storeClient.queryUrl("../pages/index.php",options, afterPostProductComment, {},"json");

    };

    var invokeReceivedUpdate = function(sender, eventArgs){
        if(sender === this){return;}
        onReceivedUpdate(eventArgs);
    };

    var onReceivedUpdate = function (eventArgs) {

        var receivedItemId = trimZerofill(eventArgs.eventId);
        var receivedItemAsJQueryObject = $(eventArgs.html);

        var items = $(containerId).find(commentItemWrapperSelector);

        var additionalJSON = eventArgs.additionalJSON;

        var jsonToString = objToString(additionalJSON);

        var objectIdToWhichCommentBelongs = trimZerofill(additionalJSON.object_id);
        var myObjectId = trimZerofill(objectId);

        __logger.log("my id: "+myObjectId+"; comment belongs to id: "+objectIdToWhichCommentBelongs);


        if(myObjectId !== objectIdToWhichCommentBelongs){
            __logger.log("comment does not belong to me");
            return;
        }

        __logger.log("comment is mine and total comments = "+items.length);


        var itemAlreadyExists = false;

        $(items).each(function(e){
            var currentItem = $(this);
            var itemId = trimZerofill(currentItem.attr('comment-id'));
            if(itemId === receivedItemId){
                __logger.log("comment already exists with id"+receivedItemId);
                itemAlreadyExists = true;
            }


        });

        if(itemAlreadyExists){
            return;
        }
        else{
            receivedItemAsJQueryObject.hide();
            receivedItemAsJQueryObject.insertAfter( items[items.length - 1] );
            receivedItemAsJQueryObject.slideDown();

            //fireCallbacks("onPostComment", eventArgs);

        }

    };

    var objToString = function(object){
        var substring = "";
        if(_.isArray(object)){
            substring = "[";
            var sep = "";var count = 0;
            _.each(object, function(element,index, list){
                count+=1;
                if(count === 1){
                    sep = "";
                }
                else{
                    sep = ", ";
                }
                if(_.isArray(element)){
                    substring += sep+ objToString(element);
                }
                else{
                    if(_.isObject(element)){
                        substring += sep+ objToString(element);
                    }
                    else{
                        substring += sep+ element;
                    }
                }
            });
            substring += "]";


        }
        else{
            if(_.isObject(object)){
                substring = "{";
                var sep = "";var count = 0;
                _.each(object, function(element,key, obj){
                    count+=1;
                    if(count === 1){
                        sep = "";
                    }
                    else{
                        sep = ", ";
                    }

                    if(_.isArray(element)){
                        substring += sep+  key +" : "+ objToString(element);
                    }
                    else{
                        if(_.isObject(element)){
                            substring += sep+  key +" : "+ objToString(element);
                        }
                        else{
                            substring += sep+   key +" : "+  element;
                        }
                    }
                });
                substring += "}";

            }
            else{
                substring += object;
            }

        }
        return substring;
    };

    var afterPostProductComment = function (jsonResult, statusJSON, additionalJSON) {

        if ("" === jsonResult.error) {

            $(commentSubmitSelector).find(".text").text("Done!");
            setTimeout(function (e) {
                $(commentSubmitSelector).find(".text").text(defaultSubmitText);
            }, 3000);

            $(productCommentInputSelector).val("");
            var eventArgs = jsonResult.event;
            eventArgs.eventId = eventArgs.id;

            //var daJSON = objToString(eventArgs.additionalJSON);
            //__logger.log("eventArgs json = "+ daJSON);return;
            onReceivedUpdate(eventArgs);
            fireCallbacks('onPostComment', eventArgs);
        }
        else {
            $(commentSubmitSelector).children(".text").text("Failed!");
            setTimeout(function (e) {
                $(commentSubmitSelector).children(".text").text(defaultSubmitText);
            }, 3000);


            $(notificationSelector).addClass("product-comment-error");
            $(notificationSelector).html(jsonResult.error);
            setTimeout(function (e) {
                $(notificationSelector).html(defaultNotificationText);
                $(notificationSelector).removeClass("product-comment-error");

            }, 5000);

            if ('object' === typeof(frontController)) {
                frontController.setMessage(jsonResult.error);
            }


        }
    };

    this.append = function (html) {
        $(containerId).append(html);
    };

    this.getLastUpdateTime = function () {
        return $(containerId).attr('update-time');
    };
    this.setLastUpdateTime = function (newUpdateTime) {
        $(containerId).attr('update-time', newUpdateTime);
    };

    this.setStatus = function(message){
        $(containerId).find('.comment-status').text(message);
        $(containerId).find('.comment-status').slideDown();
        setTimeout(function(e){
            $(containerId).find('.comment-status').slideUp("fast",function(e){
                $(containerId).find('.comment-status').text('');
            });

        },5000);
    };

    (function initialize(){
        commentViewers.addListener(invokeReceivedUpdate);
        myself.addListener(commentViewers.invokeReceivedUpdate);

        $(commentSubmitSelector).click(function (event) {
            submitComment();
            return false;
        });
    })();

}



var commentViewers = new CommentViewers(jQuery);

//++++++++++++++++++ js/stream-tabs.js +++++++++++++++++++


/*
 this is a utility file to support tabs in activity stream.


 */

var streamTabs = (function () {

    var callbacks = {
        onSelectionChanged:[]
    };

    function StreamTabs() {

        this.invokeSelectionChanged = function (eventArgs) {
            for (var i in callbacks.onSelectionChanged) {
                if ("function" === typeof(callbacks.onSelectionChanged[i])) {
                    callbacks.onSelectionChanged[i](eventArgs);
                }
            }
        };
        this.invokeRecommendProduct = function (productId, sellerNumber) {
            onPageLoad.addListener(function () {
                updateStream.showRecommendDialogForProduct(productId,sellerNumber);
                return false;
            });
            return false;
        };

        this.invokePlaceOffer = function (productId) {
            onPageLoad.addListener(function () {
                updateStream.showPlaceOfferDialogForProduct(productId);
                return false;
            });
        };

        this.onSelectionChanged = {
            addListener:function (callback) {
                if ("function" === typeof(callback)) {
                    callbacks.onSelectionChanged.push(callback);
                }
            }
        };

        this.init = function () {

        };

        return this;
    }


    return new StreamTabs();
})();
//++++++++++++++++++ js/smartOnlineStatusTracker.js +++++++++++++++++++


var onlineStatusTrackers = (function () {
    function OnlineStatusTrackers(){

        var trackers = {};

        this.add = function (onlineStatusTracker) {
            var trackerId = onlineStatusTracker.trackerId();
            trackers[trackerId] = onlineStatusTracker;
        };

        this.collectGarbage = function () {
            var newTrackerList = {};
            for (var key in trackers) {
                if (!trackers[key].viewer().empty()) {
                    newTrackerList[key] = trackers[key];
                }
            }
            trackers = newTrackerList;
        };

        this.updateStatus = function(customerNumberStatusDictionary){

            //we expect object with {customerNumber:newStatus [,customerNumber:newStatus]...}
            for(var key in trackers){
                var customerNum = trackers[key].customerNumber();
                var newStatus = customerNumberStatusDictionary[customerNum];
                if(typeof(newStatus) != 'undefined'){
                    trackers[key].updateStatus(newStatus)
                }
            }
        };

        this.randomStatus = function(){
            return false;
            for(var key in trackers){
                trackers[key].updateStatus('idle');
            }
        }

        return this;
    }

    return new OnlineStatusTrackers();

}());


function OnlineStatusTracker(__trackerId, customerNumber) {
    var self = this;

    var customerNum = customerNumber;
    var _trackerId = __trackerId;

    this.customerNumber = function(){
        return customerNum;
    };

    this.viewer = function () {
        return  $("#" + _trackerId);
    };

    this.trackerId = function(){
      return _trackerId;
    };

    this.updateStatus = function(newStatusString){
        var color = 'red';
        if('active' === newStatusString){
            color = 'green';
        }
        else{
            if('idle' === newStatusString){
                color = 'gray';
            }
            else{
                color = 'red';
            }
        }

        this.viewer().css({'color':color});
    };

    (function init(){
        onlineStatusTrackers.add(self);
    })();
    return self;
}

//test chaning of status
setInterval(function(){
    onlineStatusTrackers.randomStatus();
},5000);

//++++++++++++++++++ js/base_class.smart-collections.js +++++++++++++++++++


//===================================================
function CollectionSettings() {
    this.itemSelector = '.collection-item';
    this.containerSelector = '.item-container';
    this.nextLink = '.next-link';
    this.previousLink = '.previous-link';
    this.resetLink = '.reset-link';
    this.countSelector = '.count';
    this.totalCount = '.total-count';
    this.title = '.title';

    this.itemIdAttribute = 'item-id';//attribute that identifies a collection item
    this.highlightedItemClass = '';

    //this map tells us which variables will be relayed to server and how their names are transformed.
    this.metadataToOptionsMap = {
        product_id:"productId",
        first_index:'firstIndex',
        firstIndex:'firstIndex',
        maximum_number:'maximumNumber',
        maximumNumber:'maximumNumber',
        output:'output',
        search_query:'searchQuery',
        seller_numbers:'sellerNumbers',
        category_ids:'categoryIds',
        category_id:'categoryId',
        category:'category',
        friend_ids:'friendIds',
        excluded_types:'excludedTypes',
        product_id_to_recommend:'productIdToRecommend',
        friend_of_customer_no:'friendOfCustomerNumber'
    };

    this.itemWithOnclick = '';
    this.shouldPrevent = false;

    this.displayNameAttribute = '';
    this.collectionsObject = null;
    this.autoShowInsertedItems = true;
    this.displayOrder = 'desc';
    this.flashBackgroundColor = "#fff";

    this.mustClearOnNavigation = false;

    this.complete = function () {
        //ensures all have been set
        return true;
    };

    return this;
}

function SmartCollection($, theCollectionId, theOptions, collectionSettings) {
    //ARGUMENT CHECKING
    if (!(collectionSettings instanceof CollectionSettings)) {
        throw new Error("expected instance of CollectionSettings");
    }

    //-----------------------------------------------------
    //INVARIANTS -references and values that dont change throught the life of the object
    var sender = this;
    var self = this;
    var collectionsObject = collectionSettings.collectionsObject;
    __logger.assert(typeof(collectionsObject) === "object" && null !== collectionsObject,"expected an object for collectionsObject, but found "+collectionsObject);
    var collectionId = theCollectionId;
    var wrapperSelector = "#" + collectionId;
    var collectionViewObject = $(wrapperSelector);

    var itemSelector = wrapperSelector.concat(" ", collectionSettings.itemSelector);
    var containerSelector = wrapperSelector.concat(" ", collectionSettings.containerSelector);
    var widgetUrl = $(containerSelector).attr('url');

    var nextLink = wrapperSelector.concat(" ", collectionSettings.nextLink);
    var previousLink = wrapperSelector.concat(" ", collectionSettings.previousLink);
    var resetLink = wrapperSelector.concat(" ", collectionSettings.resetLink);
    var countSelector = wrapperSelector.concat(" ", collectionSettings.countSelector);
    var totalCountSelector = wrapperSelector.concat(" ", collectionSettings.totalCount);
    var titleSelector = wrapperSelector.concat(" ", collectionSettings.title);
    
    var itemIdAttribute = collectionSettings.itemIdAttribute;
    var displayOrder = collectionSettings.displayOrder;



    //=+++++++++++++++++++++++++++++++++++++++++++++++++++
    var options = theOptions;
    options.output = "json";


    var mapMetadataToOptions = function (metadata) {
        //nulls are meant to be removed, those not is list remain as is
        var metadataToOptionsDictionary = collectionSettings.metadataToOptionsMap;

        var getNewKey = function (oldKey) {
            var newKey;
            for (var i in metadataToOptionsDictionary) {
                if (i === oldKey) {
                    newKey = metadataToOptionsDictionary[i];
                    return newKey;
                }

            }
            return newKey;
        };

        var result = {};
        for (var oldKey in metadata) {
            var newKey = getNewKey(oldKey);
            if (typeof(newKey) !== "undefined") {
                if(metadata[oldKey] !== null && typeof(metadata[oldKey] !== "undefined")){
                    result[newKey] = metadata[oldKey];
                }
            }
        }
        return result;
    };

    //same
    var preventIfUndesired = function () {
        if (collectionSettings.shouldPrevent) {
            $(collectionViewObject).find(collectionSettings.itemWithOnclick).removeAttr("onclick");
        }
    };

    //same------- for all routines in this object
    var item = {
        itemSelector:collectionSettings.itemSelector,
        hiddenItems:[],

        updateCount:function () {
            var newCount = $(itemSelector).length;
            __logger.log("updating "+countSelector+" with "+newCount);
            $(countSelector).text(newCount);
            if(parseFloat(newCount) < 1){
                self.setTitle("There are no items to display");
            }
        },

        clearAll:function () {
            $(containerSelector).html("");
        },

        //done
        insertMultipleItems:function (html_array,reason) {
            if("search" == reason){
                item.clearAll();
            }
            else{
                __logger.assert(reason === "next" || reason === "previous","expected next or previous for reason in collection.insertMultipleItems, but found "+reason);
                if (collectionSettings.mustClearOnNavigation === true) {
                    item.clearAll();
                }
            }


            for (var i in html_array) {
                var itemHTML = html_array[i];
                item.insert(itemHTML);
            }
            onItemsReturned.fire(jsonResult);

        },

        highestId:function () {
            var highestId = 0;
            var items = $(itemSelector);
            var numItems = items.length;
            if(numItems > 0){

                highestId = parseFloat(items.eq(0).attr(itemIdAttribute));
                for(var i = 1; i < numItems;i++ ){
                    var itemId = parseFloat(items.eq(i).attr(itemIdAttribute));
                    if (itemId > highestId) {
                        highestId = itemId;
                    }
                }

            }
            highestId = parseFloat(highestId);
            if(isNaN(highestId)){
                return 0;
            }
            else{
                return highestId;
            }
        },

        lowestId:function (){
            var lowestId = 0;
            var items = $(itemSelector);
            var numItems = items.length;
            if(numItems > 1){
                lowestId = parseFloat(items.eq(0).attr(itemIdAttribute));
                for(var i = 1; i < numItems;i++ ){
                    var itemId = parseFloat(items.eq(i).attr(itemIdAttribute));
                    var isLess = itemId < lowestId;
                    if (itemId < lowestId) {
                        lowestId = itemId;
                    }
                }

            }
            lowestId = parseFloat(lowestId);
            if(isNaN(lowestId)){
                return 0;
            }
            return lowestId;
        },
        highlight:function (itemId) {
            var targetObject = $(itemSelector.concat("[",itemIdAttribute, "=", itemId, "]"));
            $(itemSelector).not(targetObject).removeClass(collectionSettings.highlightedItemClass);
            targetObject.addClass(collectionSettings.highlightedItemClass);
        },
        hide:function (itemId) {
            $(itemSelector).filter("[".concat(itemIdAttribute, "=", itemId, "]")).hide("fast");
            item.hiddenItems.push(itemId);
        },
        remove:function (itemId) {
            $(itemSelector).filter("[".concat(itemIdAttribute, "=", itemId, "]")).remove();
            item.removeFromHiddenList(itemId);
        },
        removeFromHiddenList:function(itemId){
            var newHiddenItems = [];
            for (var i in item.hiddenItems) {
                if (item.hiddenItems[i] !== itemId) {
                    newHiddenItems.push(item.hiddenItems[i]);
                }
            }
            item.hiddenItems = newHiddenItems;
        },
        show:function (itemId) {
            $(itemSelector).filter("[".concat(itemIdAttribute, "=", itemId, "]")).show("fast");
            item.removeFromHiddenList(itemId);
        },
        getDisplayName:function (itemId) {
            return $(itemSelector).filter("[".concat(itemIdAttribute, "=", itemId, "]")).attr(collectionSettings.displayNameAttribute);
        },
        hideThoseInHiddenList:function () {
            for (var i in item.hiddenItems) {
                var itemId = item.hiddenItems[i];
                $(itemSelector).filter("[".concat(itemIdAttribute, "=", itemId, "]")).hide();
            }
        },
        getById:function (itemId) {
            return $(itemSelector).filter("["+itemIdAttribute+"=" + itemId + "]");
        },

        doInsert:function(streamItemHTML,comparisonSymbol){
            if(comparisonSymbol !== ">" && comparisonSymbol !== "<"){
                reportBug("Invalid Comparison symbol","expected > or <, but found "+comparisonSymbol);
                return false;
            }

            var receivedItemAsJQueryObject = $(streamItemHTML);
            var newlyReceivedItemId = receivedItemAsJQueryObject.attr(itemIdAttribute);

            var items = $(itemSelector);
            //we handle both empty and non-empty scenarios
            if (items.length <= 0) {
                $(containerSelector).append(receivedItemAsJQueryObject);
                if (collectionSettings.autoShowInsertedItems === true) {
                    receivedItemAsJQueryObject.show();
                }
                attachClickEvent();
                preventIfUndesired();
                item.hideThoseInHiddenList();
                onInsertItem.fire({itemHtml:streamItemHTML});
            }
            else {
                var itemToInsertAfter = null;
                var itemAlreadyExists = false;

                $(items).each(function (e) {
                    var currentStreamItem = $(this);
                    var currentStreamItemId = currentStreamItem.attr(itemIdAttribute);
                    if (currentStreamItemId === newlyReceivedItemId) {
                        itemAlreadyExists = true;
                    }
                    else {
                        var shouldInsertAfterThisItem = false;
                        if(comparisonSymbol === ">"){
                            shouldInsertAfterThisItem = currentStreamItemId > newlyReceivedItemId
                        }
                        else{
                            if(comparisonSymbol === "<"){
                                shouldInsertAfterThisItem = currentStreamItemId < newlyReceivedItemId
                            }
                        }
                       if(shouldInsertAfterThisItem === true){
                           itemToInsertAfter = currentStreamItem;
                       }

                    }

                });

                if (itemAlreadyExists) {
                    __logger.log("item already exists");
                    return;
                }
                else {
                    __logger.log("item NOT exists");

                    receivedItemAsJQueryObject.hide();
                    if (itemToInsertAfter === null) {
                        //it means the item is newer than all items in stream at the moment
                        __logger.log("placing item on top");
                        receivedItemAsJQueryObject.insertBefore(items.eq(0));
                    }
                    else {
                        __logger.log("placing item after another item");
                        receivedItemAsJQueryObject.insertAfter(itemToInsertAfter);
                    }

                    if (collectionSettings.autoShowInsertedItems === true) {
                        receivedItemAsJQueryObject.show();
                    }

                    attachClickEvent();
                    preventIfUndesired();
                    item.hideThoseInHiddenList();
                    onInsertItem.fire({itemHtml:streamItemHTML});

                }
            }
        },

        insertDescending:function (streamItemHTML) {
           item.doInsert(streamItemHTML,">");
        },
        insertAscending:function (streamItemHTML) {
            item.doInsert(streamItemHTML,"<");
        },
        insert:function (streamItemHTML) {
            __logger.log("display order = "+displayOrder);
            if (displayOrder === "asc") {
                item.insertAscending(streamItemHTML);
            }
            else {
                if (displayOrder === "desc") {
                    item.insertDescending(streamItemHTML);
                }
                else {
                    reportBug("invalid display order specified for item.insert");
                }
            }
        },

        append:function (streamItemHTML) {
            var receivedItemAsJQueryObject = $(streamItemHTML);
            var newlyReceivedItemId = receivedItemAsJQueryObject.attr(itemIdAttribute);
            $(containerSelector).append(receivedItemAsJQueryObject);

            attachClickEvent();
            preventIfUndesired();
            item.hideThoseInHiddenList();
            onInsertItem.fire({itemHtml:streamItemHTML});
        },

        appendTemporarily:function (streamItemHTML) {
            var receivedItemAsJQueryObject = $(streamItemHTML);
            var newlyReceivedItemId = receivedItemAsJQueryObject.attr(itemIdAttribute);

            //generate a temporary identifier for the item
            var temporary_id = Math.round(Math.random() * 10000000000000000000);
            receivedItemAsJQueryObject.attr("temporary-id",temporary_id);
            $(containerSelector).append(receivedItemAsJQueryObject);

            attachClickEvent();
            preventIfUndesired();
            item.hideThoseInHiddenList();
            onInsertItem.fire({itemHtml:streamItemHTML});
            //.......................
            return temporary_id;
        },

        removeTemporary : function(temporaryItemId){
            $(containerSelector).find("".concat("[temporary-id=",temporaryItemId,"]")).remove();
        }

    };

    //same
    var attachClickEvent = function () {
        $(itemSelector).unbind("click");
        $(itemSelector).click(function (i) {
            var itemId = $(this).attr(itemIdAttribute);
            item.highlight(itemId);
            onSelectionChanged.fire({sender:sender, itemId:itemId});
            return false;
        });
    };

    //same
    var attachNavigationEvents = function () {
        $(nextLink).unbind("click");
        $(nextLink).click(function (e) {
            fetchData("next");
            return false;
        });

        $(previousLink).unbind("click");
        $(previousLink).click(function (e) {
            fetchData("previous");
            return false;
        });

        $(resetLink).unbind("click");
        $(resetLink).click(function (e) {
            self.reset();
            return false;
        });
    };
    //same
    var afterGetItems = function (jsonResult, statusJSON, additionalJSON) {
        self.brightenView();
        var reasonForFetchData = additionalJSON.reason;

        var error = jsonResult.error;
        if ("" === error) {
            var html_array = jsonResult.html_array;
            var metadata = jsonResult['metadata'];

            var totalCount = metadata.total_count;

            if (reasonForFetchData === "search") {
                $(totalCountSelector).text(totalCount);
                self.setTitle("Found "+totalCount+' results for <i>'+options.search_query+"</i>");
                item.clearAll();
            }
            else{
                if(reasonForFetchData === "reset"){
                    self.setTitle("");
                    item.clearAll();
                }
            }

            if (html_array.length > 0) {
                //metadata could have changed, so we modfy it.
                $.extend(options,metadata);

                $(totalCountSelector).text(totalCount);
                //insert items into container using collection algo
                item.insertMultipleItems(html_array,reasonForFetchData);

            }
            else {
                //we didnt return any items
                if(reasonForFetchData === "next" || reasonForFetchData === "previous"){
                    self.setTitle("No more items");
                }
                else{
                    if (reasonForFetchData === "search") {
                        self.setTitle("No results for <i>"+options.search_query+"</i>");
                    }
                }
                onNoItemsReturned.fire(jsonResult);
            }
            item.updateCount();
        }
        else {
            onError.fire({error:jsonResult.error});
        }
    };

//@@@@@@@@@@@@@@@@      EVENTS      @@@@@@@@@@@@@@@
    var onItemsReturned = new EventListeners();
    var onNoItemsReturned = new EventListeners();
    var onInsertItem = new EventListeners();
    var onSelectionChanged = new EventListeners();
    var onError = new EventListeners();
    var beforeInsertItem = new EventListeners();

    //same
    this.events = {
        onItemsReturned:new EventListenersProxy(onItemsReturned),
        onNoItemsReturned:new EventListenersProxy(onNoItemsReturned),
        onInsertItem:new EventListenersProxy(onInsertItem),
        onSelectionChanged:new EventListenersProxy(onSelectionChanged),
        onError:new EventListenersProxy(onError),
        beforeInsertItem: new EventListenersProxy(beforeInsertItem)
    };


//@@@@@@@@@@@@@@@@@ PUBLIC METHODS      @@@@@@@@@@@@@@@@@@@

    //same
    this.getWidgetUrl = function () {
        return widgetUrl;
    };

    //same
    this.getOptions = function (allOptionsInOriginalForm) {
        if(true !== allOptionsInOriginalForm){
            return mapMetadataToOptions(options);
        }
        return options;

    };

    //same
    this.preventDefaultClickAction = function () {
        collectionSettings.shouldPrevent = true;
        preventIfUndesired();
    };

    //same
    this.hideItem = function (itemId) {
        item.hide(itemId);
    };

    this.removeItem = function (itemId) {
        item.remove(itemId);
    };

    //same
    this.showItem = function (itemId) {
        item.show(itemId);
    };

    //same
    this.getDisplayName = function (itemId) {
        return item.getDisplayName(itemId);
    };

    //same
    this.insertItem = function (streamItemHTML) {
        beforeInsertItem.fire({itemHtml:streamItemHTML, sender:self});
        item.insert(streamItemHTML);
    };

    this.appendItem = function (streamItemHTML) {
        item.append(streamItemHTML);
    };

    this.appendItemTemporarily = function (streamItemHTML) {
        return item.appendTemporarily(streamItemHTML);
    };

    this.removeTemporaryItem = function (temporaryId){
      item.removeTemporary(temporaryId);
    };


    //same
    this.getItemById = function (itemId) {
        return item.getById(itemId);
    };


    //same
    this.dimView = function () {
        collectionViewObject.css({opacity:0.3});
    };

    //same
    this.brightenView = function () {
        collectionViewObject.css({opacity:1.0});
    };

    //same
    this.reset = function () {
        options.search_query = '';
        fetchData("reset");
    };

    this.loadData = function(){
      fetchData("reset");
    };

    this.setOptions = function(keyValuePairs){
        $.extend(options,keyValuePairs);
    };

    //same
    this.searchFor = function (searchQuery) {
        options.search_query = searchQuery;
        fetchData("search");
    };

    this.highestId = function () {
        return item.highestId();
    };

    this.lowestId = function () {
        return item.lowestId();
    };

    //same
    var reportBug = function (bugType, strMessage) {
        __logger.log("BUG: " + bugType + " - " + strMessage);
    };

    var parametersMinusEmptyOnes = function(dataParams){
        var result = {};
        for(var key in dataParams){
            var value = trim(dataParams[key]);
            if(!isNumber(value)){
                if(value.length > 0){
                    result[key] = value;
                }
            }
            else{
                result[key] = value;
            }
        }
        return result;
    };

    //same
    var fetchData = function (strNextOrPrevious) {


        var dataParams = mapMetadataToOptions(options);

        dataParams.action = "get";
        __logger.assert(0 < String(dataParams.action).length, "command not specified for fetching data in collection");

        if (strNextOrPrevious === "next") {
            //dataParams.afterActivityId = item.highestId();
            //dataParams.order = "asc";
            dataParams.seek = "next";
        }
        else {
            if (strNextOrPrevious === "previous") {
                //dataParams.beforeActivityId = item.lowestId();
                //dataParams.order = "desc";
                dataParams.seek = "previous";
            }
            else {
                if (strNextOrPrevious === "search") {

                }
                else {
                    if (strNextOrPrevious === "reset") {

                    }
                    else{
                        reportBug("invalid parameter for collection.fetchData", "expected next or previous, but found " + strNextOrPrevious);
                    }

                }

            }
        }
        self.dimView();
        //remove empty parameters before passing them to server
        dataParams = parametersMinusEmptyOnes(dataParams);

        //before fetching data, let's attach the collection role
        var collectionRole = $(wrapperSelector).attr("collection-role");
        if(typeof(collectionRole) === "string"){
            dataParams.collectionRole = collectionRole;
        }
        storeClient.queryUrl(widgetUrl, dataParams, afterGetItems, {reason:strNextOrPrevious}, options.output);


    };

    //same
    this.setContent = function (html) {
        $(containerSelector).html(html);
    };

    //same
    this.setTitle = function (newTitle) {
        $(titleSelector).html(newTitle);
    };

    //same
    this.init = function () {
        $(titleSelector).css({fontSize:"9pt",fontWeight:"bold"});
        attachClickEvent();
        attachNavigationEvents();
        collectionsObject.set(collectionId, this);
        onInsertItem.setDefaultListener(function (eventArgs) {
            item.updateCount();
            var itemId = $(eventArgs.itemHtml).attr(itemIdAttribute);
            __logger.assert(isNumber(itemId), "expected a number for item id in comment collection, found " + itemId);
            flashItem(itemId);
        });

    };

    var flashItem = function (itemId) {
        __logger.log("called flashItem on item " + itemId);

        var itemAsJQueryObject = $(itemSelector).filter("["+itemIdAttribute+"=" + itemId + "]");
        var itemBackgroundColor = itemAsJQueryObject.css("backgroundColor");

        itemAsJQueryObject.css({"backgroundColor":collectionSettings.flashBackgroundColor});

        itemAsJQueryObject.fadeOut("fast", function (e) {
            itemAsJQueryObject.fadeIn("fast", function (e) {
                itemAsJQueryObject.fadeOut("fast", function (e) {
                    itemAsJQueryObject.fadeIn("fast", function (e) {
                        itemAsJQueryObject.css({"backgroundColor":itemBackgroundColor});
                    });
                });
            });
        });
    };

    //-----------------------------
    this.itemSelector = itemSelector;

    //the last thing we do is initialize, which includes registration and attaching events
    this.init();

    return this;
}

//++++++++++++++++++ js/smart-selected-items.js +++++++++++++++++++




function SmartSelectedItems(containerObject){
    var self = this;
    var selectedPeopleSelector = "<span></span>";

    this.viewer = $(selectedPeopleSelector);
    containerObject.append(self.viewer);
    self.viewer.css({padding:"3px"});
    var uniqueId = "smart-selected-items-"+Math.round(10000*Math.random());

    self.viewer.attr("id",uniqueId);


    var afterAddItem = new EventListeners();
    var afterRemoveItem = new EventListeners();
    this.events = {
        afterAddItem:new EventListenersProxy(afterAddItem),
        afterRemoveItem:new EventListenersProxy(afterRemoveItem)
    };


    this.add = function(uid,name){

        //create a new selected item and display the name on it
        var newItem = $("<span></span>");
        newItem.text(name);

        //the close button
        var newItemClose = $("<span>X</span>");
        newItemClose.css({display:"inline-block", border:"1px solid #40aB4A", paddingLeft:"5px", paddingRight:"3px", margin:"2px", cursor:"pointer", verticalAlign:"middle"});

        var newItemContentWrapper = $("<span></span>");
        newItemContentWrapper.css({fontSize:"9pt", fontFamily:"arial,sans-serif", display:"inline-block", border:"1px solid #80eB8A", backgroundColor:"#60CB6A", padding:"3px 10px 3px 10px", color:"white", fontWeight:"bold"});

        newItemContentWrapper.append(newItem);
        newItemContentWrapper.append(newItemClose);


        var newItemWrapper = $("<span></span>");
        newItemWrapper.attr("uid", uid);
        newItemWrapper.append(newItemContentWrapper);
        newItemWrapper.css({display:"inline-block", backgroundColor:"#40aB4A", padding:"1px", cursor:"pointer"});

       self.viewer.append(newItemWrapper);

        afterAddItem.fire({itemId:uid,displayName:name});

        newItemWrapper.click(function (i) {
            newItemWrapper.remove();
            afterRemoveItem.fire({itemId:uid});
        });
    };

    this.removeAll = function(){
        self.viewer.html('');
    };

    this.itemsAsCSV = function(){
        var selectedPeople = self.viewer.children();

        var customerNumberCSV = "";
        var count = 0;
        selectedPeople.each(function () {
            uid = $(this).attr("uid");
            var sep = ",";
            if (count == 0) {
                sep = "";
            }
            customerNumberCSV += sep + uid;
            count++;
        });
        return customerNumberCSV;
    };
}


//++++++++++++++++++ js/rate-limiter.js +++++++++++++++++++


function RateLimiter(callback,def_delay,max_delay,delay_increment){

    var default_delay = def_delay;
    var maximum_delay = max_delay;
    var current_delay = default_delay;
    var last_delay = default_delay;
    var _callback = callback;

    var timer_id = null;

    var scheduleFetchEvents = function(){
        if(null !== timer_id){
            clearTimeout(timer_id);
        }
        timer_id = setTimeout(function(e){
            _callback();
        },current_delay);
    };

    var _increaseDelay = function(){
        last_delay = current_delay;
        current_delay += delay_increment;
        current_delay = Math.min(current_delay,maximum_delay);
    };

    var _resetDelay = function(){
        last_delay = current_delay;
        current_delay = default_delay;
    };

    this.resetDelay = function(){
        _resetDelay();
        scheduleFetchEvents();
    };

    this.increaseDelay = function(){
        _increaseDelay();
        scheduleFetchEvents();
    };

    this.reschedule = function(){
        scheduleFetchEvents();
    };

    this.invokeCallback = function(){
        _callback();
    };

    this.lastDelay = function(){
        return last_delay;
    };

    this.currentDelay = function(){
        return current_delay;
    };

    scheduleFetchEvents();
    return this;
}

//++++++++++++++++++ js/auto-content-navigator.js +++++++++++++++++++


function AutoContentNavigator() {
    var self = this;
    var selector = ".dialog-page";
    var onLoadPage = new EventListeners();
    this.events = {
        onLoadPage: new EventListenersProxy(onLoadPage)
    };

    var showPage = function (strNewPage) {
        strNewPage = $.trim(strNewPage);

        if (strNewPage.length > 0) {
            var desiredObject = $(selector.concat(".",strNewPage));
            $(selector).slideUp();
            desiredObject.slideDown();
            //we can incorporate history by tracking a stack of previous pages - an their urls
        }
    };

    this.loadPage = function(page,href){
        //we could save the current page and its content first before load

        var contentContainerSelector = ".clearable-content".concat(".",page);
        var urlToLoad = href.concat("&ajax=true");
        $.get(urlToLoad,null,function(data){
            $(contentContainerSelector).html(data);
            onLoadPage.fire({page:page,href:href,data:data});
        });
    };



    this.init = function () {

    };

    onLoadPage.setListener(function(eventArgs){
        var page = eventArgs.page;
        var href = eventArgs.href;//keep this for "back" purposes
        showPage(page);
    });

    return this;

}

var autoContentNavigator =  new AutoContentNavigator();


//++++++++++++++++++ js/application.js +++++++++++++++++++


var application = (function (){
        function Application(){
            var showPlaceOfferDialog = new EventListeners();
            this.events = {
                showPlaceOfferDialog: new EventListenersProxy(showPlaceOfferDialog)
            };

            this.showPlaceOfferDialog = function(eventArgs){
                showPlaceOfferDialog.fire(eventArgs);
            };

            this.gotoPage = function(page,href){
                setTimeout(function(e){
                    if(null !== frontController && null !== page && null !== href){
                        frontController.loadPage(page,href);
                    }
                },0);
            };

            //########## DEFAULT EVENT HANDLERS/LISTENERS ###############
            showPlaceOfferDialog.setListener(function(eventArgs){
                //default listener/handler
                var productId = eventArgs.productId;
                var placeOfferDialogTemplate = '<div id="__dialog_id__" product-id="__product_id__"> <label>Your offer (Ushs):</label> <div class="offer-input-area"> <input class="offer-amount" type="text" name="offerAmount"/> </div> <div class="offer-submit-area"> <input class="submit-offer" type="submit" value="Place my Offer"/> </div> <span class="offer-status"></span> </div> <script type="text/javascript"> onPageLoad.addListener(function (e) { var options = { dialogId:"__dialog_id__" }; var offerDialog = new PlaceOfferDialog(options); }); </script>';
                //alert("default event handler for showPlaceOfferDialog called with productId = "+productId);
                //alert(placeOfferDialogTemplate);
                //..............
                var dialogAsObject = $(placeOfferDialogTemplate);
                overlayDialog.loadJQueryObject(dialogAsObject);
                overlayDialog.showUpdateDialog();
                dialogAsObject.attr("product-id",productId);

            });
        }
        return new Application();
})();

//++++++++++++++++++ js/utils.image.js +++++++++++++++++++


function smartImage($pictureId, $size, $onlineStatusHTML, $imageClass)
{
    var $widgetId = "smart-image-" + Math.random();
    var $numeric_size = 50;
    switch ($size) {
        case "icon":
            $numeric_size = 50;
            break;
        case "small":
            $numeric_size = 100;
            break;
        case "medium":
            $numeric_size = 200;
            break;
        case "large":
            $numeric_size = 400;
            break;
        default:
            $numeric_size = 50;
            break;
    }

    var $pictureUrlTemplate = getPictureTemplate();
    var $html = preg_replace(
        new Array("#picture-id#", "#picture-size#", "#widget-id#", "#online-status-html#", "#image-class#","#size#"),
        new Array($pictureId, $size, $widgetId, $onlineStatusHTML, $imageClass, $numeric_size),
        $pictureUrlTemplate
    );
    return $html;
}

function smartAvatar(commenterId, additionalClass) {
    return smartImage(commenterId,"icon","","chat-message-image");
}


//++++++++++++++++++ js/utils.templates.js +++++++++++++++++++


function getPictureTemplate(){
    var $avatarUrl = "../pictures/#picture-id#?size=#picture-size#&rand=" + Math.random();
    return "<img class='#image-class#' src='"+$avatarUrl+"'/>";
}

function getTimeAgoTemplate() {
    return "<abbr class='time-ago smart-normal-sub-title-text' id='{widget-id}' title='#gmt-date-time-string#'>published date</abbr> <script type='text/javascript'> onPageLoad.addListener(function(e){ $('#{widget-id}').timeago(); }); </script> ";
}

function getMessageItemTemplate() {
    return "<div item-id='__commentId' class='chat-message-wrapper __message_direction_class__'> <table style='width: 98%; border: 0px solid transparent'><tbody><tr><td valign='top' class='image-column'>__avatar</td><td valign='top'>__commenter<br><span comment-id='__commentId'>&nbsp;__comment</span><br><div class='count' style='width: 32px;margin-left: 95%;margin-top: -1.5em;font-weight: bold;color: #656565;float: right;'></div><div class='comment-time-ago'>__timeAgo</div></td></tr></tbody></table></div>";
}

function getCommentTemplate(){
    return "<div comment-id='__commentId' item-id='__commentId' display-name='__display_name' class='comment-wrapper'> <div role='comment-container' class='float-container'> <span role='commenter-image' class='float-left'> __avatar </span> <span role='comment-text' class='float-left'> <div role='comment-text' class='float-container'> <span role='comment-info' class='float-left'> __commenter<br> <span comment-id='__commentId'>&nbsp;__comment</span> </span> </div> </span> <span role='comment-time' class='float-right'> __timeAgo </span> </div> </div>";
}



//++++++++++++++++++ js/utils.time.js +++++++++++++++++++


function smartTimeAgo($iso_8601__timestamp) {
    //we expect something like 2014-10-19T23-45-00Z
    var $timeAgoTemplate = getTimeAgoTemplate();
    var $timeAgo_widgetId = "smart-time-ago-" + smartRandom();

    var $HTML = preg_replace(["{widget-id}", "#gmt-date-time-string#"], [$timeAgo_widgetId, $iso_8601__timestamp], $timeAgoTemplate);
    return $HTML;
}

//++++++++++++++++++ js/utils.item.temporary-data-generator.js +++++++++++++++++++


function generateTemporaryItemInfo_comment(messageToSend) {
    //could removing activity id help with
    var arr_message_info = {"object_id":"67",/*"activity_id":"67",*/"product_id":"14","customer_no":"5","comment":"comment","target_no":"2","actor_no":"5","seen":"0","timestamp":"1424784468","full_name":"dan tusuubira"};

    //process and inject message
    messageToSend = htmlSpecialChars(messageToSend);


    //var activity_id = 0;

    arr_message_info['comment'] = messageToSend;
    arr_message_info['actor_no'] = 7;//replace with me
    arr_message_info['target_no'] = 53;//replace with friendId
    arr_message_info['timestamp'] = 0;//replace with NOW() as seconds
    arr_message_info['date'] = "2014-01-19";
    arr_message_info['time'] = "12-37-00";
    arr_message_info['timezone'] = 'UTC';
    arr_message_info['full_name'] = 'Me';
    arr_message_info['customer_no'] = arr_message_info['actor_no'];

    return arr_message_info;
}


//++++++++++++++++++ js/utils.item.render.js +++++++++++++++++++


function renderItem_comment(arrayOfReplacements) {
    var ItemHTMLTemplate = getCommentTemplate();
    var keys = _.keys(arrayOfReplacements);
    var values = _.values(arrayOfReplacements);
    var html = preg_replace(keys, values, ItemHTMLTemplate);
    return html;
}

//++++++++++++++++++ controls/add-to-basket.js +++++++++++++++++++


//we create a collection of addToBasketButtons

var addToBasketButtonCollection = (function ($) {


    var wrapperClassSelector = ".add-to-basket-wrapper";
    var addToBasketButtonSelector = ".add-to-basket-button";
    var addToBasketStatusSelector = ".add-to-basket-status";


    function AddToBasketButton(uniqueId) {

        //this code runs immediately
        var uniqueSelector = wrapperClassSelector + "." + uniqueId;
        var self = this;

        var indicateSuccess = function(){
            $("#"+uniqueId).val("Added");
        };

        var indicateBusy = function(){
            $("#"+uniqueId).val("Adding...");
        };

        var indicateFailure = function(error){
            $("#"+uniqueId).val("Add to Basket");
            messageBox.show(error);
        };

        //........................................
        var afterAddToCart = function (jsonResult, statusJSON, additionalJSON) {
            if ("" === jsonResult.error) {
                indicateSuccess();
            }
            else {
                indicateFailure(jsonResult.error);
            }
        };


        var onClickButton = function (e) {
            var recommenderNumber = self.button.attr('recommender-number');
            var productId = self.button.attr('product-id');
            var quantityHolder = $(".quantity-holder[product-id=" + productId + "]");

            var options = {productIds:productId};
            if (!isNaN(recommenderNumber)) {
                options.recommenderNumber = recommenderNumber;
            }

            self.status.text("adding item...");
            self.status.slideDown();
            storeClient.addProductsToCart(options, afterAddToCart, {});
            return false;
        };

        $("#"+uniqueId).click(function(e){
            var formId = "form-"+uniqueId;
            var url = $("#"+formId).attr("action");
            var itemType = $("#"+formId).find("[name=itemType]").val();
            var itemId = $("#"+formId).find("[name=itemId]").val();

            var postingOptions = {itemType:itemType, itemId:itemId};
            indicateBusy();
            storeClient.addProductsToCart(postingOptions,afterAddToCart,{});

            return false;
        });



        //.................................................


        return this;
    }

    function AddToBasketButtonCollection($) {
        var buttons = [];

        var buttonCollection = this;
        this.hideForProductId = function (productId) {
            $(wrapperClassSelector).find(addToBasketButtonSelector).filter('[product-id=' + productId + ']').hide();
        };

        this.createButton = function (uniqueId) {
            buttons.push(new AddToBasketButton(uniqueId));
            var createdButton = buttons[buttons.length - 1];

        };

        return this;
    }

    return new AddToBasketButtonCollection($);

})(jQuery);

//++++++++++++++++++ controls/render.respond-to-offer.js +++++++++++++++++++


function RespondToOffer(theOfferId, theWidgetId) {
    var widgetId = theWidgetId;
    var offerId = theOfferId;

    var widgetSelector = "#" + widgetId;

    var acceptButtonObject = $(widgetSelector).find("[action=accept-offer]");
    var rejectButtonObject = $(widgetSelector).find("[action=reject-offer]");
    var statusObject = $(widgetSelector).find(".status-area");
    var successStatusObject = $(widgetSelector).find(".accepted-status-wrapper");
    var rejectedStatusObject = $(widgetSelector).find(".rejected-status-wrapper");


    var showFeedbackForReady = function () {
        $(widgetSelector).css({"opacity":1.0});
    };

    var showFeedbackForBusy = function () {
        $(widgetSelector).css({"opacity":0.3});
        acceptButtonObject.slideUp();
        rejectButtonObject.slideUp();
        statusObject.hide().text("Please wait...").slideDown();
    };

    var afterAcceptOffer = function (jsonResult, statusJSON, additionalJSON) {
        showFeedbackForReady();
        var error = jsonResult.error;
        if ("" === error) {
            //run the success loop
            $(statusObject).slideUp();
            successStatusObject.slideDown();
        }
        else {
            statusObject.text(error);
            setTimeout(function (e) {
                statusObject.slideUp();
                acceptButtonObject.slideDown();
                rejectButtonObject.slideDown();
            }, 3000);
        }
    };

    var afterRejectOffer = function (jsonResult, statusJSON, additionalJSON) {
        showFeedbackForReady();
        var error = jsonResult.error;
        if ("" === error) {
            //run the success loop
            $(statusObject).slideUp();
            rejectedStatusObject.slideDown();
        }
        else {
            statusObject.text(error);
            setTimeout(function (e) {
                statusObject.slideUp();
                acceptButtonObject.slideDown();
                rejectButtonObject.slideDown();
            }, 3000);
        }
    };

    var startAcceptOffer = function () {
        showFeedbackForBusy();
        var options = {offerIds:offerId, offerStatus:"accepted"};
        storeClient.setOfferStatus(options,afterAcceptOffer,{});
    };

    var startRejectOffer = function () {
        showFeedbackForBusy();
        var options = {offerIds:offerId, offerStatus:"rejected"};
        storeClient.setOfferStatus(options, afterRejectOffer,{});
    };

    (function init() {
        acceptButtonObject.click(function (e) {
            startAcceptOffer();
            return false;
        });

        rejectButtonObject.click(function (e) {
            startRejectOffer();
            return false;
        });
    })();
}

//++++++++++++++++++ controls/render.respond-to-friend-request.js +++++++++++++++++++


function RespondToFriendRequest($, theRequestId, theWidgetId) {

    var widgetId = theWidgetId;
    var requestId = theRequestId;

    var widgetSelector = "#" + widgetId;

    var acceptButtonObject = $(widgetSelector).find("[action=accept-friend-request]");
    var rejectButtonObject = $(widgetSelector).find("[action=reject-friend-request]");
    var statusObject = $(widgetSelector).find(".status-area");
    var successStatusObject = $(widgetSelector).find(".accepted-status-wrapper");
    var rejectedStatusObject = $(widgetSelector).find(".rejected-status-wrapper");


    var showFeedbackForReady = function () {
        $(widgetSelector).css({"opacity":1.0});
    };

    var showFeedbackForBusy = function () {
        $(widgetSelector).css({"opacity":0.3});
        acceptButtonObject.slideUp();
        rejectButtonObject.slideUp();
        statusObject.hide().text("Please wait...").slideDown();
    };

    var afterAcceptFriendRequest = function (jsonResult, statusJSON, additionalJSON) {
        showFeedbackForReady();
        var error = jsonResult.error;
        if ("" === error) {
            //run the success loop
            $(statusObject).slideUp();
            successStatusObject.slideDown();
        }
        else {
            statusObject.text(error);
            setTimeout(function (e) {
                statusObject.slideUp();
                acceptButtonObject.slideDown();
                rejectButtonObject.slideDown();
            }, 3000);
        }
    };

    var afterRejectFriendRequest = function (jsonResult, statusJSON, additionalJSON) {
        showFeedbackForReady();
        var error = jsonResult.error;
        if ("" === error) {
            //run the success loop
            $(statusObject).slideUp();
            rejectedStatusObject.slideDown();
        }
        else {
            statusObject.text(error);
            setTimeout(function (e) {
                statusObject.slideUp();
                acceptButtonObject.slideDown();
                rejectButtonObject.slideDown();
            }, 3000);
        }
    };

    var startAcceptFriendRequest = function (requestId) {
        showFeedbackForBusy();
        var options = {requestIds:requestId, status:"accepted"};
        storeClient.setFriendRequestStatus(options,afterAcceptFriendRequest,{});
    };

    var startRejectFriendRequest = function (requestId) {
        showFeedbackForBusy();
        var options = {requestIds:requestId, status:"rejected"};
        storeClient.setFriendRequestStatus(options, afterRejectFriendRequest,{});
    };

    (function init() {
        acceptButtonObject.click(function (e) {
            startAcceptFriendRequest(requestId);
            return false;
        });

        rejectButtonObject.click(function (e) {
            startRejectFriendRequest(requestId);
            return false;
        });
    })();
}

//++++++++++++++++++ controls/render.search.js +++++++++++++++++++


var searchClientsDictionary = {};


function SearchClient(searchFormId) {
    var self = this;
    var searchFormSelector = "#" + searchFormId;
    var searchBoxSelector = searchFormSelector + " .h-search-box";
    var defaultResultAreaSelector = searchFormSelector + " .h-result-area";
    var defaultResultContentAreaSelector = searchFormSelector + " .h-result-area-content";
    var showAllLinkSelector = searchFormSelector + " .h-show-all-link";

    var defaultResultContentArea = $(defaultResultContentAreaSelector);

    var resultContentArea = defaultResultContentArea;

    var editProductSelector = searchFormSelector + " .search-action-edit-product";
    var searchButtonSelector = searchFormSelector + " input.h-search-button";
    var addFriendSelector = searchFormSelector + " .add-friend";


    var searchForm = $(searchFormSelector);
    var searchBox = $(searchBoxSelector);
    var defaultResultArea = $(defaultResultAreaSelector);


    var searchType = searchForm.attr("search-type");
    var searchLive = searchForm.attr("search-live");
    var pictureUrl = searchForm.attr("picture-url");

    var preferedResultAreaSelector = searchForm.attr("result-area");

    var query = "";

    var onClickSearchCallbacks = [];


    var resultArea = defaultResultArea;
    if ("" != preferedResultAreaSelector) {
        resultArea = $(preferedResultAreaSelector);
        resultContentArea = resultArea;
    }

    var closeResultArea = function () {
        if (resultArea === defaultResultArea) {
            resultArea.slideUp("fast", function (event) {
                resultContentArea.html("");
            });
        }
        else {
            resultArea.html("");
        }
    };

    var showResultArea = function () {
        if (resultArea === defaultResultArea) {
            resultArea.slideDown("fast");
        }
        else {

        }

    };

    var inputHasChanged = function () {
        var currentInput = searchBox.val();
        return currentInput !== query;
    };

    var startSearch = function () {
        if (inputHasChanged()) {
            __logger.log("search input changed...");
            return;
        }
        __logger.log("search input not changed, starting search...");
        if (query !== "" && query.length >= 3) {

            var searchOptions = {type:searchType, query:query};
            storeClient.search(searchOptions, afterSearch, {query:query});
            __logger.log("new search started....");
        }
        else {
            __logger.log("search input inadequate to complete search")
            closeResultArea();
        }
    };

    searchBox.blur(function (event) {
        closeResultArea();
    });

    searchBox.keyup(function (event) {
        query = searchBox.val();
        _.delay(startSearch, 1000);

    });

    var afterSendRequest = function (jsonResult, statusJSON, additionalJSON) {
        if ("" == jsonResult.error) {
            frontController.setMessage("Your friend request has been forwarded to " + additionalJSON.receiver + " for approval");
        }
        else {
            frontController.setMessage(jsonResult.error);
        }
    };

    var attachEventsToResults = function () {
        if (searchType == "people") {
            $(addFriendSelector).click(function (event) {
                var sender = $(this);
                var customerNumber = sender.attr('value');
                var customerName = sender.text();
                var requestOptions = {customerNumber:customerNumber};
                storeClient.sendFriendRequest(requestOptions, afterSendRequest, {receiver:customerName});
            });

        }
        else {
            if (searchType == "product") {
                $(".product-result-item").click(function (e) {
                    var productId = $(this).attr('product-id');
                    alert("should show product details");

                    return false;
                });

                $(editProductSelector).click(function (e) {
                    var productId = $(this).attr('product-id');

                    if ("object" === typeof(myProducts)) {
                        myProducts.invokeOnEditProduct(productId);
                    }
                    else {
                        __logger.log("myProducts is not an object");
                    }

                    return false;
                });
            }
        }
    };

    var translateProductInfoIntoHTML = function (productInfo) {
        var productId = productInfo.product_id;
        var productTitle = productInfo.product_title;
        var avatarUrl = pictureUrl + "/" + productId + "?size=icon&defaultPicture=product";

        var html = "<div class='product-result-item' product-id='" + productId + "'><table class='search-result-table'><tr><td class='search-result-image-column'><img src='" + avatarUrl + "'/></td><td><span>" + productTitle + "</span><br/><span class='search-action-edit-product' product-id='" + productId + "' style='color: orange;text-decoration: underline;margin-left: 5px'>Edit</span></td></tr></table></div>";
        return html;

    };

    var createPersonMarkup = function (personInfo) {

        var customerNumber = personInfo.customer_no;
        var fullName = personInfo.full_name;
        var canReceiveFriendRequest = parseInt(personInfo.can_receive_friend_request);
        var avatarUrl = pictureUrl + "/" + customerNumber + "?size=icon&defaultPicture=person";

        //if the person is not already a friend, there is a provision for adding friend
        var addFriendMarkup = "";

        if(canReceiveFriendRequest === 1){
            addFriendMarkup = "<a href='#'' class='add-friend' value='" + customerNumber + "'>Add friend</a>";
        }


        var actionsMarkup = "";
        actionsMarkup += addFriendMarkup;
        actionsMarkup = "<span class='search-result-actions-area'>" + actionsMarkup + "</span>";

        var personAvatar = "<span class='search-result-icon-area'><img style='float: left' src='" + avatarUrl + "' width='50px' /></span>";

        var personText = "<a class='search-result-text' href='#' value='" + customerNumber + "'>" + fullName + "</a>";

        var personTextArea = "<span class='search-result-text-area'>" + personText + "<br/>" + actionsMarkup + "</span>";

        var markupName = "<div class='search-result-item-inner'>" + personAvatar + personTextArea + "</div>";
        var markup = "<div class='search-result-item' id='search-result-" + customerNumber + "'>" + markupName + "</div>";

        return markup;
    };

    var concatenate = function (startString, newString) {
        return startString + newString;
    };

    var afterSearch = function (jsonResult, statusJSON, additionalJSON) {
        if ("" == jsonResult.error) {

            var results = jsonResult.results;
            var resultType = jsonResult.metadata.type;
            var totalResults = jsonResult.metadata.count;

            //switch based on result type
            var finalMarkup = "";
            if (resultType == "people") {
                var arrayOfShortProfiles = _.map(results, createPersonMarkup);
                finalMarkup = _.reduce(arrayOfShortProfiles, concatenate, "");

                resultContentArea.html(finalMarkup);
                showResultArea();
            }
            else {
                if (resultType == "product") {
                    var arrayOfProductHTML = _.map(results, translateProductInfoIntoHTML);
                    var html = _.reduce(arrayOfProductHTML, concatenate, "");
                    resultContentArea.html(html);
                    showResultArea();
                }
                else {

                }
            }
            attachEventsToResults();
        }
        else {
            frontController.setMessage(jsonResult.error);
        }
    };

    var triggerOnClickSearch = function () {
        searchQuery = searchBox.val();
        for (var i in onClickSearchCallbacks) {
            if ("function" === typeof(onClickSearchCallbacks[i])) {
                onClickSearchCallbacks[i](self, searchQuery);
            }
        }
    };

    this.onClickSearch = {
        add:function (callback) {
            if ("function" === typeof(callback)) {
                onClickSearchCallbacks.push(callback);
            }
        }
    };

    (function initialize() {
        searchClientsDictionary[searchFormId] = self;
        $(showAllLinkSelector).click(function (e) {
            triggerOnClickSearch();
        });

        $(searchButtonSelector).click(function (e) {
            triggerOnClickSearch();
        });
    })();

}
//++++++++++++++++++ controls/render.forex-rate.js +++++++++++++++++++


function SmartForexRate() {
    var myself = this;
    var getForexRateCallbacks = new Array();
    var errorCallbacks = new Array();

    this.onGetForexRate = {
        add:function (callback) {
            if ('function' == typeof(callback)) {
                getForexRateCallbacks.push(callback);
            }
        }
    };

    this.onError = {
        add:function (callback) {
            if ('function' == typeof(callback)) {
                errorCallbacks.push(callback);
            }
        }
    };

    var runCallbacks = function (arrayOfCallbacks, jsonParameters) {
        if (arrayOfCallbacks.length > 0) {
            for (var i = 0; i < arrayOfCallbacks.length; i++) {

                if ('function' == typeof(arrayOfCallbacks[i])) {
                    arrayOfCallbacks[i](myself, jsonParameters);
                }
            }
        }
    };


    var afterGetForexRate = function (forexResult, statusJSON, additionalJSON) {

        var error = forexResult.error;



        if ('' === error) {
            var from = additionalJSON.from;
            var to = additionalJSON.to;
            var forexRate = forexResult.forexRate;
            $('#from-currency').html(from);
            $('#to-currency').html(to);
            $('#exchange-rate').html(forexRate);

            runCallbacks(getForexRateCallbacks, {from:from, to:to, forexRate:forexRate});

        }
        else {

            if (errorCallbacks.length > 0) {
                runCallbacks(errorCallbacks, error);
            }

        }

    };

    this.getForexRate = function (from, to) {
        smartCash.getForexRate(from, to, afterGetForexRate, {from:from, to:to});
    };
}
//module instance, null by default
var smartForexRate = null;
//++++++++++++++++++ controls/allControls.js +++++++++++++++++++



//++++++++++++++++++ controls/smart-buttons.js +++++++++++++++++++


function SmartChatButton(buttonId,customerNumber,customerName){
    var isBusy = false;
    $("#"+buttonId).click(function(e){
        if(isBusy === true){
            return false;
        }
        isBusy = true;
        setTimeout(function(e){
            isBusy = false;
        },1000);

        shoutboxes.switchToChatId(customerNumber,customerName);
        return false;
    });
}

function SmartUpdateProductButton(buttonId,productId,productName){
    var selfViewer = $("#"+buttonId);
    selfViewer.click(function(e){
        overlayDialog.loadUrl("index.php?cmd=editProduct&productId="+productId);
        overlayDialog.showUpdateDialog();
    });
}

function SmartFileComplaintOverlayDialog(buttonId,invoiceNumber){
    var selfViewer = $("#"+buttonId);
    selfViewer.click(function(e){
        var dialogAsObject = $($("#temp-file-complaint-dialog-holder").html());
        overlayDialog.loadJQueryObject(dialogAsObject);
        overlayDialog.showUpdateDialog();
        dialogAsObject.find("#file-complaint-invoice-number").val(""+invoiceNumber);
        dialogAsObject.find("#file-complaint-invoice-number").attr("disabled",true);
        var invoiceComplaintForm = new InvoiceComplaintForm();
    });
}

function SmartPayForDelivery(buttonId,invoiceNumber){
    var selfViewer = $("#"+buttonId);
    selfViewer.click(function(e){
        var dialogAsObject = $($("#temp-delivery-payment-dialog-holder").html());
        overlayDialog.loadJQueryObject(dialogAsObject);
        overlayDialog.showUpdateDialog();
        dialogAsObject.find("#delivery-payment-invoice-number").val(""+invoiceNumber);
        dialogAsObject.find("#delivery-payment-invoice-number").attr("disabled",true);
        var deliveryPayment = new DeliveryPayment();
    });
}

function SmartNetworkInvitationButton(buttonId,customerNumber,customerName){

    var name = customerName;
    var custNumber = customerNumber;
    var selfViewer = $("#"+buttonId);
    var textObject = selfViewer.children().eq(0);

    var busy = false;
    var disabled = false;

    var dim = function(){
      selfViewer.fadeTo("fast",0.5);
    };

    var brighten = function(){
        selfViewer.fadeTo("fast",1.0);
    };

    var disable = function(){
        disabled = true;
        dim();
        selfViewer.css({cursor:"default"});
    };



    var afterSendRequest = function (jsonResult, statusJSON, additionalJSON) {
        busy = false;
        brighten();
        if ("" == jsonResult.error) {
            disable();
            textObject.html("Invitation sent");
        }
        else {
            textObject.html("Ooops..Invitation NOT sent");
            setTimeout(function(e){
                textObject.html("Try sending invitation again");
            },5000);
        }
    };



    $("#"+buttonId).click(function(e){

        if(disabled === true){
            return false;
        }
        if(busy === true){
            return false;
        }
        busy = true;

        var requestOptions = {customerNumber:custNumber};

        dim();
        textObject.html("Sending invitation to "+name +"...");
        //TEST DOUBLE SENDING, AND DISABLING ON SUCCESS
        storeClient.sendFriendRequest(requestOptions, afterSendRequest, {receiver:name});

    });
}



//++++++++++++++++++ controls/buy-now-button.js +++++++++++++++++++


function BuyNowButton(theProductId,theButtonId){
    var productId = theProductId;
    var buttonId = theButtonId;

    var button = $("#"+buttonId);


    var recommenderNumber = button.find(".buy-now-button").attr("recommender-number");
    if(isNaN(recommenderNumber) ){
        recommenderNumber = 0;
    }


    var buttonStatus = $(".buy-now-button-status").find("."+buttonId);




    var afterAddProductToCart = function(jsonResult,statusJSON,additionalJSON){
        if("" === jsonResult.error){
            frontController.viewProductsInCart();
        }
        else{
            buttonStatus.text(jsonResult.error);
            buttonStatus.slideDown();
            button.slideUp();
            setTimeout(function(e){
                buttonStatus.slideUp();
                button.slideDown();
            },3000);

        }
    };

    button.click(function(e){

        storeClient.addProductsToCart({productIds:productId,recommenderNumber:recommenderNumber},afterAddProductToCart,{});
        return false;
    });

}
//++++++++++++++++++ controls/smart-image.js +++++++++++++++++++



var smartImageCollection = (function () {

    function SmartImageCollection() {

        var smartImagesMap = {
        };

        var urlCache = {};//keyed using picture-id+size

        this.add = function (smartImage) {
            var pictureId = smartImage.getPictureId();
            if (typeof(smartImagesMap[pictureId]) !== "object") {
                smartImagesMap[pictureId] = [];
            }
            smartImagesMap[pictureId].push(smartImage);
        };

        this.refresh = function (pictureId) {
            urlCache = [];//reset on every round of refresh
            var arrayOfSmartImages = smartImagesMap[pictureId];
            if (null !== arrayOfSmartImages && typeof(arrayOfSmartImages) === "object") {
                for (var i = 0; i < arrayOfSmartImages.length; i++) {
                    arrayOfSmartImages[i].refresh();
                }
            }
        };

        this.setCachedUrl = function (pictureId, pictureSize, newUrl) {
            urlCache[pictureId + "-" + pictureSize] = newUrl;
        };

        this.getCachedUrl = function (pictureId, pictureSize) {
            var url = urlCache[pictureId + "-" + pictureSize];
            if (typeof(url) === "undefined") {
                return "";
            }
            return url;
        };
    }
    return new SmartImageCollection();

})();

function SmartImage(widgetId, pictureId, pictureSize) {

    var self = this;

    var _widgetId = widgetId;
    var _pictureId = pictureId;
    var _pictureSize = pictureSize;

    this.getPictureId = function () {
        return _pictureId;
    };

    this.refresh = function () {
        var jQueryObject = $("#" + _widgetId);
        if (jQueryObject.length > 0) {
            //it is possible tha object with this picture id and size combination
            //has already been updated. if so, pick from cache.
            //else pull from server and place in cache
            var cachedUrl = smartImageCollection.getCachedUrl(_pictureId, _pictureSize);
            if (cachedUrl.length > 0) {
                jQueryObject.attr("src", cachedUrl);
                __logger.log("cached url: " + cachedUrl);
            }
            else {
                var url = jQueryObject.attr("src");
                var urlSubparts = url.split("?");
                var urlWithoutQueryString = urlSubparts[0];
                var queryString = "size=" + _pictureSize + "&rand=" + Math.round(Math.random() * 10000);

                var newUrl = urlWithoutQueryString + "?" + queryString;
                jQueryObject.attr("src", newUrl);
                smartImageCollection.setCachedUrl(_pictureId, _pictureSize, newUrl);
                __logger.log("non_cached_url "+newUrl);
            }


        }

    };

    (this.init = function () {
        smartImageCollection.add(self);
    })();


}
//++++++++++++++++++ controls/render.load-cash.js +++++++++++++++++++


function LoadCashModule() {
    var loadCashFormSelector = ".load-cash-form";
    var loadButtonSelector = loadCashFormSelector + " #submitLoadCashOptions";
    var loadStateText = "Loading Cash...";
    var loadButtonDefaultText = "";
    var accountBalanceSelector = ".account-balance";

    var loadButtonTextObject = $(loadButtonSelector).find(".text");

    var loadCashStatusSelector = "#load-cash-status";

    var amountBoxSelector = loadCashFormSelector + " input.amount";

    var onLoadCash = function (event) {
        var loadCashOptions = {
            'amount':$('.load-cash-form input[name=amount]').eq(0).val(),
            'ccode':$('.load-cash-form select[name=ccode]').eq(0).val(),
            'pmcode':$('.load-cash-form select[name=pmcode]').eq(0).val()
        };
        loadCash(loadCashOptions);
        return false;
    };


    var afterLoadCash = function (loadCashResult, statusJSON, additionalJSON) {
        $(loadCashFormSelector).css({opacity:1.0});

        if ("" == loadCashResult.error) {
            var accountBalance = loadCashResult.balance;
            $(accountBalanceSelector).text(accountBalance + "/=");

            $(loadButtonTextObject).text("Cash Loaded successfully!");
            $(loadCashStatusSelector).addClass("load-cash-success");
            $(loadCashStatusSelector).text("Your balance is Ushs " + accountBalance + "/=");
            $(loadCashStatusSelector).smartFlash();


            setTimeout(function (e) {
                    $(loadButtonTextObject).text("Load Cash Again!");
                },
                5000);

            if ('object' == typeof (frontController)) {
                frontController.setMessage('cash loaded successfully');
            }

        }
        else {
            $(loadButtonTextObject).text("Failed!");
            $(loadCashStatusSelector).addClass("load-cash-error");
            $(loadCashStatusSelector).text(loadCashResult.error);

            setTimeout(function (e) {
                    $(loadButtonTextObject).text("Try Loading Again!");
                },
                5000);


        }
    };

    var loadCash = function (loadCashOptions) {
        loadButtonDefaultText = $(loadButtonTextObject).text();

        $(loadButtonTextObject).text(loadStateText);
        $(loadCashFormSelector).css({opacity:0.3});
        $(loadCashStatusSelector).removeClass("load-cash-error");
        $(loadCashStatusSelector).removeClass("load-cash-success");
        $(loadCashStatusSelector).text("Please wait...");

        smartCash.loadCash(loadCashOptions, afterLoadCash, {});
    };

    var construct = function () {
        $(loadButtonSelector).eq(0).click(onLoadCash);
        $(amountBoxSelector).focus();
    };
    construct();

    (function HandleForexConversion() {

        var from = "";
        var to = "";
        var forexRate = 0;

        var convertedValueSelector = "#converted-value";

        var showConvertedAmount = function () {
            var typedAmount = getTypedAmount();

            if (!isEmpty(typedAmount)) {
                if (!isNaN(typedAmount) && typedAmount > 0) {

                    if (!isNaN(forexRate) && forexRate > 0) {
                        var amountInUgx = forexRate * typedAmount;
                        $(convertedValueSelector).text("= Ushs. " + amountInUgx + "/=");

                    }
                    else {
                        $(convertedValueSelector).text("invalid forex rate " + forexRate);
                    }
                }
                else {

                    $(convertedValueSelector).text("invalid amount");
                }
            }
            else {
                $(convertedValueSelector).text("Enter amount above");

            }

        };

        var onGetForexRate = function (sender, forexInfo) {
            from = forexInfo.from;
            to = forexInfo.to;
            forexRate = forexInfo.forexRate;

            showConvertedAmount();
        };

        var onForexError = function (sender, errorMessage) {

        };

        var getSelectedCurrency = function () {
            return $(".load-cash-form select[name=ccode]").val();
        };

        var getTypedAmount = function () {
            return $(".load-cash-form input[name=amount]").val();
        };


        smartForexRate.onGetForexRate.add(onGetForexRate);
        smartForexRate.onError.add(onForexError);
        var currency = getSelectedCurrency().toUpperCase();
        smartForexRate.getForexRate(currency, "UGX");
        $(amountBoxSelector).smartChangeHandler(showConvertedAmount);
        $('.load-cash-account-balance').smartAccountBalance("create",{});

    })();


}
//++++++++++++++++++ controls/render.send-cash.js +++++++++++++++++++


function SendCashModule() {
    var myself = this;

    var amountToConvert = 0;
    var sendCashStatusSelector = '#send-cash-status';
    var submitSelector = "#submitSendCashOptions";
    var sendCashDefaultText = $(submitSelector).val();
    var sendCashFormSelector = "cashTransferWizard";

    var errorCallbacks = new Array();
    var sendCashCallbacks = new Array();

    this.onError = {
        add:function (callback) {
            if ('function' == typeof (callback)) {
                errorCallbacks.push(callback);
            }
        }
    };

    this.onSendCash = {
        add:function (callback) {
            if ('function' == typeof (callback)) {
                sendCashCallbacks.push(callback);
            }
        }
    };

    var runCallbacks = function (arrayOfCallbacks, jsonParameters) {
        if (arrayOfCallbacks.length > 0) {
            for (var i = 0; i < arrayOfCallbacks.length; i++) {

                if ('function' == typeof(arrayOfCallbacks[i])) {
                    arrayOfCallbacks[i](myself, jsonParameters);
                }
            }
        }
    };


    var afterSendCash = function (sendCashResult, statusJSON, additionalJSON) {
        $(sendCashFormSelector).css({opacity:1.0});

        if ('' === sendCashResult.error) {
            var newBalance = sendCashResult.balance;
            $('#account-balance').text(newBalance);
            $('.account-balance-wrapper').smartFlash();


            $(sendCashStatusSelector).removeClass("send-cash-error");
            $(sendCashStatusSelector).addClass("send-cash-success");
            $(sendCashStatusSelector).text("Cash sent successfully");
            $(submitSelector).val("Cash Sent successfully!");
            setTimeout(function (e) {
                $(sendCashStatusSelector).text("");
                $(sendCashStatusSelector).removeClass("send-cash-success");
                $(submitSelector).val("Send Cash Again");
            }, 5000);


            runCallbacks(sendCashCallbacks, sendCashResult);
        }
        else {
            $(submitSelector).val("Failed to Send");
            $(sendCashStatusSelector).addClass("send-cash-error");
            $(sendCashStatusSelector).text(sendCashResult.error);
            setTimeout(function (e) {
                $(submitSelector).val("Try Sending Again");
            }, 5000);

            runCallbacks(errorCallbacks, sendCashResult.error);
        }
    };

    var completeTransaction = function (sender, authenticationCode) {

        var sendCashOptions = {
            'acode':authenticationCode,
            'amount':$('.cashTransferWizard input[name=amount]').eq(0).val(),
            'dmcode':$('.cashTransferWizard select[name=dmcode]').eq(0).val(),
            'name':$('.cashTransferWizard input[name=name]').eq(0).val(),
            'email':$('.cashTransferWizard input[name=email]').eq(0).val(),
            'phone':$('.cashTransferWizard input[name=phone]').eq(0).val(),
            'reason':$('.cashTransferWizard input[name=reason]').eq(0).val(),
            'scode':$('.cashTransferWizard input[name=scode]').eq(0).val()
        };

        $(submitSelector).val("sending Cash...");
        $(sendCashFormSelector).css({opacity:0.3});
        smartCash.sendCash(sendCashOptions, afterSendCash);

    };

    var afterSendAuthenticationCode = function (authenticationResult, statusJSON, additionalJSON) {
        if ('' == authenticationResult.error) {
            var message = authenticationResult.message;
            authenticationDialog.promptText(message);
            authenticationDialog.onEnterCode(completeTransaction);
            authenticationDialog.showAuthenticationDialog();
        }
        else {
            $(sendCashStatusSelector).text(authenticationResult.error);
        }
    };

    var onClickSendCash = function (event) {
        smartCash.sendAuthenticationCode(afterSendAuthenticationCode, {});
        return false;
    };


    var emptyText = '<span class="empty-ticket-text">Empty</span>';

    connectElementValues('input.send-cash-amount', '#ticket-amount', emptyText);
    connectElementValues('[name=dmcode]', '#ticket-dmcode', emptyText);
    connectElementValues('input:text[name=name]', '#ticket-name', emptyText);
    connectElementValues('input:text[name=email]', '#ticket-email', emptyText);
    connectElementValues('input.send-cash-phone', '#ticket-phone', emptyText);
    connectElementValues('input:text[name=reason]', '#ticket-reason', emptyText);


    //-------------------------------------

    var amountSelector = '.send-cash-page input:text[name=amount]';
    var currencySelector = '.send-cash-page  select[name=ccode]';

    $(submitSelector).click(onClickSendCash);


    return this;
}

var sendCashModule = null;

//++++++++++++++++++ controls/render.baloon.js +++++++++++++++++++


function SmartBaloon(itemId) {
    var objBaloon = null;
    var self = this;


    this.moveTo = function (x, y) {

    };

    this.viewer = function () {
        return objBaloon;
    };

    this.showMessage = function (html) {
        objBaloon.find('.baloon-inner').html(html);
        objBaloon.fadeIn(1000);
        setTimeout(function(e){
            self.hide();
        },10000);


    };

    this.hide = function () {
        objBaloon.fadeOut(1000);
    };

    this.hideAfter = function (milliseconds) {
        setTimeout(self.hide, milliseconds);
    };


    var isShown = false;
    this.notifyUpdates = function () {
        if(true === isShown){
            return false;
        }
        isShown = true;

        self.showMessage("you have new updates in your stream!!<br/><a class='see-updates' href='#'>See updates</a>");

        objBaloon.find(".see-updates").click(function (e) {
            self.hide();
            frontController.showIdleScreen();
            return false;
        });
        objBaloon.fadeIn('fast', function (e) {
            //flash
            var count = 0;
            setInterval(function (e) {
                if (count > 1) {
                    return;
                }
                count += 1;
                objBaloon.fadeOut(900, function (e) {
                    objBaloon.fadeIn(100);
                });
            }, 2000);
            //set auto hide
            setTimeout(function (e) {
                objBaloon.fadeOut(2000);
                isShown = false;
            }, 10000)
        });

    };

    //===============

    onPageLoad.addListener(function () {

        objBaloon = $("#" + itemId);

        objBaloon.fadeTo(0);
        objBaloon.css({display:'block'});

        var interfaceWrapper = $(".interface-wrapper");

        //=============
        objBaloon.css({left:smartBrowser.clientWidth()});
        objBaloon.animate({left:interfaceWrapper.offset().left, top:smartBrowser.clientHeight() - 100, opacity:1.0}, 1000, null, function (e) {
            setTimeout(function (e) {
                self.hide();
            }, 5000);
        });

        $(window).resize(function (e) {
            objBaloon.css({left:interfaceWrapper.offset().left, top:smartBrowser.clientHeight() - 100});
        });

        return false;


        //=====================


    });
    //---------
    return this;
}


var smartBaloon = null;
//++++++++++++++++++ controls/render.load-cash-as-agent.js +++++++++++++++++++



function LoadCashAsAgent($) {
    var self = this;

    //==============================

    var setText = function (buttonText, statusText, timeoutButtonText, timeoutDuration) {
        view.submitButton.val(buttonText);
        view.submitStatus.val(statusText);
        view.submitStatus.jqueryObject.fadeIn();
        setTimeout(function (e) {
            view.submitButton.val(timeoutButtonText);
            view.submitStatus.jqueryObject.fadeOut();
        }, timeoutDuration);
    };


    //===================================================
    var onSubmit = new EventListeners();
    var beforeSubmit = new EventListeners();
    var afterSubmit = new EventListeners();
    var afterSubmitSuccess = new EventListeners();
    var afterSubmitError = new EventListeners();

    this.events = {
        onSubmit:new EventListenersProxy(onSubmit),
        beforeSubmit:new EventListenersProxy(beforeSubmit),
        afterSubmit:new EventListenersProxy(afterSubmit),
        afterSubmitSuccess:new EventListenersProxy(afterSubmitSuccess),
        afterSubmitError:new EventListenersProxy(afterSubmitError)
    };

    //================================================

    var view = (function ($) {

        function View($) {
            var wrapperSelector = "#load-cash-as-agent";

            this.getData = function () {
                return {
                    voucherId:$(wrapperSelector).find('input[name=voucherId]').val(),
                    accessNumber:$(wrapperSelector).find('input[name=accessNumber]').val(),
                    mobileNumber:$(wrapperSelector).find('input[name=mobileNumber]').val(),
                    amount:$(wrapperSelector).find('input[name=amount]').val(),
                    secretCode:$(wrapperSelector).find('input[name=secretCode]').val()
                };
            };

            this.submitButton = (function ($) {

                function SubmitButton() {
                    var submitSelector = '.load-cash-as-agent-submit';
                    var jqueryObject = $(wrapperSelector).find(submitSelector);

                    this.click = function (callback) {
                        jqueryObject.click(callback);
                    };

                    this.val = function (newValue) {
                        if ("undefined" === typeof(newValue)) {
                            return jqueryObject.val();
                        }
                        else {
                            jqueryObject.val(newValue);
                        }
                    };


                    return this;
                }

                return new SubmitButton($);
            })($);

            this.submitStatus = (function ($) {


                function SubmitStatus() {
                    var selector = '.load-cash-as-agent-submit-status';
                    this.jqueryObject = $(wrapperSelector).find(selector);

                    this.click = function (callback) {
                        this.jqueryObject.click(callback);
                    };

                    this.val = function (newValue) {
                        if ("undefined" === typeof(newValue)) {
                            return this.jqueryObject.text();
                        }
                        else {
                            this.jqueryObject.text(newValue);
                        }
                    };


                    return this;
                }

                return new SubmitStatus($);
            })($);

            return this;
        }

        return new View($);
    })($);

    //=================================================

    var eventHandlers = (function () {
        function EventHandlers() {

            var afterLoadVoucher = function(jsonResult, statusJSON, additionalJSON) {
                var eventArgs = {sender:self, jsonResult:jsonResult, additionalJSON:additionalJSON};
                afterSubmit.fire(eventArgs);

                if ("" === jsonResult.error) {
                    afterSubmitSuccess.fire(eventArgs);
                }
                else {
                    afterSubmitError.fire(eventArgs);
                }
            };

            var completeTransaction = function (sender, authenticationCode) {

                var options = view.getData();
                options.pin = authenticationCode;
                smartCash.loadVoucher(options, afterLoadVoucher, {});
            };

            this.onSubmit = function (eventArgs) {
                //cross-check entered data, capture it, then show authentication dialog
                beforeSubmit.fire({sender:self});

                authenticationDialog.onEnterCode(completeTransaction);
                authenticationDialog.promptText("Confirm load voucher");
                authenticationDialog.showAuthenticationDialog();

                return false;
            };


            this.beforeSubmit = function (eventArgs) {
                //view.submitStatus.jqueryObject.fadeOut();
            };


            this.afterSubmit = function (eventArgs) {
                //view.submitButton.val("Done!!");
            };


            this.afterSubmitSuccess = function (eventArgs) {
                smartBaloon.showMessage(eventArgs.jsonResult.success_info.message);

            };

            this.afterSubmitError = function (eventArgs) {
                var error = eventArgs.jsonResult.error;

                smartBaloon.showMessage("<b style='color:#e00'><big style='color:#323b43'>Error in loading cash</big><br/>"+error+"</b>");
            };


            return this;
        }
        return new EventHandlers();
    })();


    //=====================================================
    this.init = function () {
        this.events.onSubmit.addListener(eventHandlers.onSubmit);
        this.events.beforeSubmit.addListener(eventHandlers.beforeSubmit);
        this.events.afterSubmit.addListener(eventHandlers.afterSubmit);
        this.events.afterSubmitSuccess.addListener(eventHandlers.afterSubmitSuccess);
        this.events.afterSubmitError.addListener(eventHandlers.afterSubmitError);


        view.submitButton.click(function (e) {
            onSubmit.fire({sender:self});
            return false;
        });
    };


    return this;
}

var loadCashAsAgent = null;

//++++++++++++++++++ controls/withdraw-page.js +++++++++++++++++++


function CreateVoucherDialog($) {

    var createVoucherDialogSelector = '.withdraw-dialog-wrapper';
    var submitSelector = createVoucherDialogSelector + ' #withdraw-submit';
    var accountBalanceSelector = createVoucherDialogSelector + '#account-balance';
    var accountBalanceWrapperSelector = createVoucherDialogSelector + '.account-balance-wrapper';
    var withdrawCashStatusSelector = createVoucherDialogSelector + ' .withdraw-cash-status';


    var getCreateVoucherOptions = function () {
        return {
            'amount':$('.withdraw-dialog input[name=amount]').val(),
            'secretCode':$('.withdraw-dialog input[name=secretCode]').val(),
            'mobileNumber':$('.withdraw-dialog input[name=mobileNumber]').val()
        };
    };

    var afterWithdrawCash = function (jsonResult, statusJSON, additionalJSON) {
        indicateNotBusy();
        if ('' === jsonResult.error) {

            var newBalance = jsonResult.success_info.account_balance;
            var success_message = jsonResult.success_info.message;

            $(accountBalanceSelector).text(newBalance);
            $(accountBalanceWrapperSelector).smartFlash();

            smartBaloon.showMessage("<b class='smart-success-color'><big class='smart-dark-gray'>Voucher created</big><br/>"+success_message+"</b>");

        }
        else {
            var error = jsonResult.error;
            smartBaloon.showMessage("<b class='smart-error-color'><big class='smart-dark-gray'>Error in creating voucher</big><br/>"+error+"</b>");

        }

    };

    var indicateNotBusy = function(){
        $(createVoucherDialogSelector).css({opacity:1.0});
    };

    var indicateBusy = function(){
        $(createVoucherDialogSelector).css({opacity:0.3});

    };

    var completeTransaction = function (sender, authenticationCode) {

        var pin = authenticationCode;
        var createVoucherOptions = getCreateVoucherOptions();
        createVoucherOptions.pin = pin;

        indicateBusy();
        smartCash.createVoucher(createVoucherOptions, afterWithdrawCash);

    };

    var initializeDialog = function () {
        $(submitSelector).click(function (event) {

            authenticationDialog.onEnterCode(completeTransaction);
            authenticationDialog.promptText("Confirm create voucher");
            authenticationDialog.showAuthenticationDialog();

               return false;
        });
    };

    initializeDialog();

}
//++++++++++++++++++ controls/shoutbox-menu.js +++++++++++++++++++


function SmartCombo(selector) {
    var wrapper = $(selector);
    var comboButton = wrapper.find(".combo-button");
    var currentSelection = wrapper.find(".current-selection");
    var currentTextArea = wrapper.find(".current-text");
    var menuItemsContainer = wrapper.find(".menu-items-wrapper-inner");
    var menuItemsWrapper = wrapper.find(".menu-items-wrapper");

    var eventHandlers = {
        onSelectionChanged:new EventListeners()
    };

    this.onSelectionChanged = new EventListenersProxy(eventHandlers.onSelectionChanged);

    //attach events
    var attachEvents = function () {

        currentSelection.click(function(e){
            menuItemsWrapper.toggle();
        });


        menuItemsContainer.find(".menu-item").unbind("click");
        menuItemsContainer.find(".menu-item").click(function (e) {
            menuItemsWrapper.hide();
            var itemId = $(this).attr('item-id');
            var text = $(this).text();
            eventHandlers.onSelectionChanged.fire({itemId:itemId, text:text});

        });
    };

    attachEvents();
    return this;
}


//++++++++++++++++++ controls/render.post-status.js +++++++++++++++++++


function PostStatusControl($){
    var statusBoxWrapper = ".post-status-wrapper";
    var statusInputBoxSelector = statusBoxWrapper + " .post-status-input-box";
    var postStatusButton = statusBoxWrapper + " #post-status-update";
    var statusNotificationArea = statusBoxWrapper + " .status-notification-area";

    var afterPostToWall = function(jsonResult, statusJSON, additionalJSON){
        if("" === jsonResult.error){

            if("object" === typeof(updateStream)){
                updateStream.fetchUpdates();
            }
            else{
                __logger.log(updateStream + " is not an instance of UpdateStream");
            }
        }
        else{
            $(statusNotificationArea).text(jsonResult.error);
        }
    };

    $(postStatusButton).click(function(e){

        var status = $(statusInputBoxSelector).val();
        if(isEmpty(status)){
            $(statusNotificationArea).text("Type what to post above!");
        }
        else{
            storeClient.postToWall({content:status}, afterPostToWall,{});
        }

        return false;
    });

}
//++++++++++++++++++ controls/smart-action-panel.js +++++++++++++++++++




var smartActionPanelItems = (function(){
    function SmartActionPanelItems(){
        var onItemClick = new EventListeners();
        this.events = {
            onItemClick:new EventListenersProxy(onItemClick)
        };
        this.fireHandlers = function (itemId){
            onItemClick.fire(itemId);
        };
    }
    return new SmartActionPanelItems();
})();

function SmartActionPanelItem(options) {
    //when item click, check its action
    var action_panel_id = options.action_panel_id;
    var buttonid = options.button_id;
    var action_type = options.action_type;

    var target_id = options.target_id;
    var callback = options.callback;
    var url = options.url;

    var toggle_text = options.toggle_text;
    var show_parent = options.show_parent;
    var url_load_option = options.load_option;
    var url_load_target_id = options.load_target_id;

    var action_panel = $("#"+action_panel_id);

    var button = $("#" + buttonid);
    var target = $("#" + target_id);

    var textAreaSelector = ".smart-action-panel-button-text";

    var textContainer = button.find(textAreaSelector);
    var text = textContainer.text();

    //preprocess
    if(toggle_text.length < 1){
        toggle_text = "Hide";
    }


    button.click(function (e) {
        //hide the badge
        button.find(".smart-action-panel-button-badge").hide();

        //depends on action-type
        __logger.log("smart action panel:  handling button click");
        switch (action_type) {
            case "show":
                target.show("fast");
                break;
            case "hide":
                target.hide("fast");
                break;
            case "toggle":
                target.slideToggle("fast",function(e){
                    var display = target.css("display");
                    //we display element, text becomes hide
                    if(display !== "none"){
                        textContainer.text(toggle_text);
                    }
                    else{
                        textContainer.text(text);
                    }

                });

                break;
            case "switch":
                target.parent().children().hide();
                target.show("fast");
                if(1 === show_parent || "1" === show_parent || true === show_parent || "true" === show_parent){
                    target.parent().show();
                }
                break;

            case "switch_toggle":
                //if data not loaded, we load

                if(typeof(url) == "string" && $.trim(url).length > 0 &&  target.attr("data-loaded") !== "true" ){
                    target.html("<b>Loading...</b>");
                    smartLoader.loadFile(url,{success:function(responseText){
                        var dataObject = $(responseText);
                        if(dataObject.attr("data-loaded-successfully") === "true"){
                            target.attr("data-loaded","true");
                            target.smartFlash({});
                        }

                        target.html(responseText);
                        //what if the returned text is error html? we could encode it in an attribute is_error_html
                    }});
                }

                var display = target.css("display");
                if(display !== "none"){
                    //the item is visible, we slideUp
                    target.slideUp("fast",function(e){
                        textContainer.text(text);
                    });

                }
                else{
                    //reset text on other buttons
                    action_panel.find(textAreaSelector).each(function(i){
                        $(this).text($(this).attr("value"));
                    });

                    //the item is hidden, we slide down, and hide all other children
                    target.parent().children().hide();
                    target.parent().show();
                    target.slideDown("fast",function(e){
                        textContainer.text(toggle_text);
                    });

                }
                break;

            case "call":
                if('function' === typeof(callback)){
                    callback();
                }
                break;
            case "fire":
                smartActionPanelItems.fireHandlers(buttonid);
                break;
            default:
                smartActionPanelItems.fireHandlers(buttonid);
                break;
        }
        //...............
        //smartActionPanelItems.fireHandlers(buttonid);
        return false;
    });


}




//++++++++++++++++++ controls/smart-notification-summary.js +++++++++++++++++++


var globalNotification = (function () {
    function GlobalNotification() {
        var header = null;
        var headderWrapperSelector = ".global-notification-header-wrapper";
        var visibleHeaderClass = "global-notification-header-wrapper-visible";

        this.constants = {
            out_of_stock:"out_of_stock",
            commented_on:"commented_on",
            placed_offer:"placed_offer"
        };

        var onItemClick = new EventListeners();
        this.events = {
            onItemClick:new EventListenersProxy(onItemClick)
        };


        this.updateCount = function (verb, value) {
            $(".global-notification").each(function (e) {
                var object = $(this);
                if (object.attr("value") === verb) {
                    object.find(".global-notification-count").text(value);
                    object.fadeOut("slow", function (e) {
                        object.fadeIn("fast");
                    });
                }
            });
        };

        this.showHeader = function () {
            header = $(headderWrapperSelector);
            header.addClass(visibleHeaderClass);
        };

        this.hideHeader = function () {
            header = $(headderWrapperSelector);
            header.removeClass(visibleHeaderClass);
        };

        this.updateContent = function (jsonResult) {
            var error = jsonResult.error;
            if ("" === error) {
                var metadata = jsonResult.metadata;

                var totalNotifications = metadata.count;
                var notificationCounter = $(".total_notification_counter");
                notificationCounter.html(totalNotifications);
                if(parseInt(totalNotifications) > 0){
                    header = $(headderWrapperSelector);
                    header.smartFlash({});
                }

                var notifications = jsonResult.notifications;
                if (typeof(notifications) === "object" && null !== notifications) {
                    for(var key in  notifications){
                        var verb = key;
                        var total = notifications[verb];

                        var tag = $("." + verb);
                        tag.html(total);
                        var itemTag = $(".item-" + verb);
                        if (parseInt(total) > 0) {
                            itemTag.addClass("global-notification-visible");
                        }
                        else {
                            itemTag.removeClass("global-notification-visible");
                        }
                    }
                }
            }
        };

        this.init = _.once(function(){
            $(".global-notification-header").click(function (e) {
                $(".global-notification-container").toggle();
                return false;
            });

            $(".global-notification").click(function (e) {
                var object = $(this);
                var verb = object.attr("value");
                var href = object.attr("href");
                onItemClick.fire({verb:verb,href:href});
                return false;
            });

        });

    }

    return new GlobalNotification();
})();

//++++++++++++++++++ controls/smart-place-offer-dialog.js +++++++++++++++++++



function PlaceOfferDialog(options) {

    var dialogSelector = "#" + options.dialogId;
    var productId = $(dialogSelector).attr('product-id');

    function OfferSubmitButton() {
        var submitSelector = dialogSelector + " .submit-offer";
        var offerAmountSelector = dialogSelector + " .offer-amount";
        var offerStatusSelector = dialogSelector + " .offer-status";


        var showError = function (message) {
            $(submitSelector).val("Failed to place offer");
            $(offerStatusSelector).text(message);
            setTimeout(function (e) {
                $(submitSelector).val("Try placing offer Again!");
            }, 5000);
        };

        var showSuccess = function (amount) {
            $(submitSelector).val("Offer placed successfully");
            $(offerStatusSelector).text("Your offer of Ushs. " + amount + "/= has been placed. you will receive response from seller");

            setTimeout(function (e) {
                $(submitSelector).val("Change your offer");
            }, 5000);
        };

        var afterMakeOffer = function (jsonResult, statusJSON, additionalJSON) {
            $(dialogSelector).css({opacity:1.0});

            if ("" === jsonResult.error) {
                var offerAmount = additionalJSON.amount;
                showSuccess(offerAmount);
            }
            else {
                showError(jsonResult.error);
            }

        };

        var onClickSubmit = function (e) {
            //get amount
            var offerAmount = $(offerAmountSelector).val();
            //check not empty
            if (!isEmpty(offerAmount)) {
                //ensure numeric
                if (!isNaN(offerAmount)) {
                    var options = {productId:productId, amount:offerAmount};

                    $(dialogSelector).css({opacity:0.3});
                    $(submitSelector).val("Placing offer...");
                    storeClient.makeOffer(options, afterMakeOffer, {amount:offerAmount});

                }
                else {
                    showError("Incorrect value for offer")
                }
            }
            else {
                showError("You've not specified your offer");
            }
            return false;
        };

        //starts here
        $(submitSelector).click(onClickSubmit);

    }


    var offerSubmitButton = new OfferSubmitButton();
}
//++++++++++++++++++ controls/smart-link.js +++++++++++++++++++


function SmartPageLink(linkId){

}

function SmartLink(linkId){
    var link = $("#"+linkId);
    link.click(function(e){
        var href = link.attr("href");
        var page = link.attr("page");
        var event_type=link.attr('event_type');

        switch(event_type){
            case 'show_place_offer_dialog':
                var productId = link.attr('product_id');
                var eventArgs = {productId:productId};
                application.showPlaceOfferDialog(eventArgs);
                break;
            default:
                application.gotoPage(page,href);
                break;
        }



        return false;
    });
}

function SmartEventDelegate(){
    setTimeout(function(e){
        if(null !== frontController && null !== page && null !== href){
            frontController.loadPage(page,href);
        }
    },0);
}


//++++++++++++++++++ pages/render.product-collection.js +++++++++++++++++++


var productCollections = (function () {

    function ProductCollections() {
        var productCollectionsObject = {};
        this.get = function (uniqueKey) {
            return productCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            productCollectionsObject[uniqueKey] = value;
        };

        return this;
    }

    return new ProductCollections();

})();


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function IProductCollection() {
    this.onEdit = function () {
    };
}


function ProductCollection($, theCollectionId, theOptions) {
    //create settings object
    var collectionSettings = new CollectionSettings();
    collectionSettings.itemSelector = ".product-link";
    collectionSettings.containerSelector = ".the-products";
    collectionSettings.nextLink = ".more-products-link";
    collectionSettings.previousLink = ".previous-products-link";
    collectionSettings.countSelector = ".count";
    collectionSettings.totalCount = ".total_items";
    collectionSettings.title = ".product-collection-title";
    collectionSettings.widgetUrl = $(collectionSettings.containerSelector).attr('url');


    collectionSettings.itemIdAttribute = "value";
    collectionSettings.highlightedItemClass = "product-highlighted";
    collectionSettings.displayOrder = 'desc';
    collectionSettings.itemWithOnclick = ".link-to-profile";
    collectionSettings.shouldPrevent = false;
    collectionSettings.displayNameAttribute = "display-name";
    collectionSettings.collectionsObject = productCollections;
    collectionSettings.flashBackgroundColor = "#ffc";
    collectionSettings.mustClearOnNavigation = true;

    if (true !== collectionSettings.complete()) {
        throw new Error("some settings have not been set");
    }
            //go ahead to create the object
    extend(this, new Array(new SmartCollection($, theCollectionId, theOptions, collectionSettings)));
    //===================
    var self = this;

    //implements(this, new IProductCollection());
    return self;
}


//++++++++++++++++++ pages/render.customer-collection.js +++++++++++++++++++


var customerCollections = (function () {

    function CustomerCollections() {
        var customerCollectionsObject = {};
        this.get = function (uniqueKey) {
            return customerCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            customerCollectionsObject[uniqueKey] = value;
        };

        return this;
    }

    return new CustomerCollections();

})();


function CustomerCollection($, theCollectionId, theOptions) {
    //create settings object
    var collectionSettings = new CollectionSettings();
    collectionSettings.itemSelector = ".customer-link";
    collectionSettings.containerSelector = ".the-customers";
    collectionSettings.nextLink = ".show-next-link";
    collectionSettings.previousLink = ".show-previous-link";
    collectionSettings.countSelector = ".count";
    collectionSettings.totalCount = ".total-items";
    collectionSettings.title = ".customer-collection-title";
    collectionSettings.widgetUrl = $(collectionSettings.containerSelector).attr('url');

    collectionSettings.itemIdAttribute = "value";
    collectionSettings.highlightedItemClass = "product-highlighted";

    collectionSettings.itemWithOnclick = ".link-to-profile";
    collectionSettings.shouldPrevent = false;

    collectionSettings.displayNameAttribute = "display-name";
    collectionSettings.collectionsObject = customerCollections;


    if (true !== collectionSettings.complete()) {
        throw new Error("some settings have not been set");
    }
    //go ahead to create the object
    extend(this, new Array(new SmartCollection($, theCollectionId, theOptions, collectionSettings)));
    return this;
}

//++++++++++++++++++ pages/render.chat-topic-collection.js +++++++++++++++++++


var chatTopicCollections = (function () {

    function ChatTopicCollections() {
        var chatTopicCollectionsObject = {};
        this.get = function (uniqueKey) {
            return chatTopicCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            chatTopicCollectionsObject[uniqueKey] = value;
        };

        return this;
    }

    return new ChatTopicCollections();

})();


function ChatTopicCollection($, theCollectionId, theOptions) {
    var myself = this;
    var sender = this;
    var collectionId = theCollectionId;

    var wrapperSelector = "#" + collectionId;
    var collectionViewObject = $(wrapperSelector);

    var chatTopicSelector = wrapperSelector + " .chat-topic-list-item";
    var chatTopicContainerSelector = wrapperSelector + " .the-chat-topics";
    var nextLink = wrapperSelector + " .show-next-link";
    var previousLink = wrapperSelector + " .show-previous-link";
    var countSelector = wrapperSelector+" .count";
    var totalCountSelector = wrapperSelector+" .total_items";
    var titleSelector = wrapperSelector+" .chat-topic-collection-title";
    var widgetUrl = $(chatTopicContainerSelector).attr('url');

    var onSelectionChangedCallback = null;
    var onError = null;

    var chatTopicsReturnedCallbacks = [];
    var noChatTopicsReturnedCallbacks = [];

    var totalChatTopicsMatchingCriteria = theOptions.totalChatTopicsMatchingCriteria;
    var count = theOptions.count;
    var defaultMaximumNumber = 10;

    var options = {
        firstIndex: theOptions.firstIndex,
        maximumNumber:theOptions.maximumNumber,
        searchQuery : theOptions.searchQuery
    };
    options.output = "json";



    //----------------------- EVENTS ---------------------------------------
    this.onItemsReturned = {
        add:function (callback) {
            if ('function' == typeof (callback)) {
                chatTopicsReturnedCallbacks.push(callback);
            }
        }
    };

    this.onNoItemsReturned = {
        add:function (callback) {
            if ('function' == typeof (callback)) {
                noChatTopicsReturnedCallbacks.push(callback);
            }
        }
    };

    var runCallbacks = function (arrayOfCallbacks, jsonParameters) {
        if (arrayOfCallbacks.length > 0) {
            for (var i = 0; i < arrayOfCallbacks.length; i++) {

                if ('function' == typeof(arrayOfCallbacks[i])) {
                    arrayOfCallbacks[i](myself, jsonParameters);
                }
            }
        }
    };

    var attachClickEvent = function () {
        $(chatTopicSelector).unbind("click");
        $(chatTopicSelector).click(function (i) {
            var itemId = $(this).attr('value');
            highlightCustomer(itemId);
            if ('function' == typeof(onSelectionChangedCallback)) {
                onSelectionChangedCallback(sender, itemId);
            }

            return false;
        });
    };

    var attachNavigationEvents = function () {
        $(nextLink).unbind("click");
        $(nextLink).click(function (e) {
            myself.next();
            return false;
        });

        $(previousLink).unbind("click");
        $(previousLink).click(function (e) {
            myself.previous();
            return false;
        });
    };

    var highlightCustomer = function (itemId) {
        var targetObject = $(chatTopicSelector + "[value=" + itemId + "]");
        $(chatTopicSelector).not(targetObject).removeClass('product-highlighted');
        targetObject.addClass('product-highlighted');
    };

    var afterGetItems = function (jsonResult, statusJSON, additionalJSON) {
        collectionViewObject.css({opacity:1.0});

        var error = jsonResult.error;
        if ("" == error) {
            var html = jsonResult.html;
            var metadata = jsonResult['metadata'];

            totalChatTopicsMatchingCriteria = metadata.total_count;
            count = metadata.count;

            $(countSelector).text(count);
            $(totalCountSelector).text(totalChatTopicsMatchingCriteria);

            options.firstIndex = metadata.first_index;
            options.maximumNumber = metadata.maximum_number;
            options.sellerNumbers = metadata.seller_numbers;
            options.categoryIds = metadata.category_ids;
            options.searchQuery = metadata.search_query;

            if (html) {
                $(chatTopicContainerSelector).html(html);
                attachClickEvent();
                runCallbacks(chatTopicsReturnedCallbacks, jsonResult);
            }
            else {
                myself.setContent("No Products to display");
                runCallbacks(noChatTopicsReturnedCallbacks, jsonResult);
            }

        }
        else {
            if ('function' == typeof(onError)) {
                onError(myself, jsonResult.error);
            }
            else {
                myself.setContent("<span style='color: rgb(250,10,0)'>" + jsonResult.error + "</span>");
                setTimeout(function (e) {
                    myself.setContent("");
                }, 5000);
            }
        }
    };

    this.onSelectionChanged = function (callback) {
        if ('function' == typeof(callback)) {
            onSelectionChangedCallback = callback;
        }
    };

    this.onError = function (callback) {
        if ('function' == typeof(callback)) {
            onError = callback;
        }
    };

    this.reset = function () {
        options.firstIndex = 0;
        options.maximumNumber = defaultMaximumNumber;
        options.searchQuery = "";
    };

    this.searchFor = function(searchQuery){
        options.searchQuery = searchQuery;
        collectionViewObject.css({opacity:0.3});
        storeClient.queryUrl(widgetUrl, options, afterGetItems, {}, options.output);
    };

    this.getItemsInRange = function (firstIndex, maximumNumber) {
        options.firstIndex = firstIndex;
        options.maximumNumber = maximumNumber;
        collectionViewObject.css({opacity:0.3});
        storeClient.queryUrl(widgetUrl, options, afterGetItems, {}, options.output);
    };

    this.next = function () {

        if (isNaN(options.maximumNumber) || options.maximumNumber < 1) {
            options.maximumNumber = defaultMaximumNumber;
        }

        if (isNaN(options.firstIndex || options.firstIndex < 0)) {
            options.firstIndex = 0;
        }

        options.firstIndex = parseInt(options.firstIndex + options.maximumNumber);

        if (options.firstIndex >= totalChatTopicsMatchingCriteria) {
            options.firstIndex = totalChatTopicsMatchingCriteria - options.maximumNumber;
            if (options.firstIndex < 0) {
                options.firstIndex = 0;
            }
        }

        this.getItemsInRange(options.firstIndex, options.maximumNumber);

    };

    this.previous = function () {
        if (isNaN(options.maximumNumber) || options.maximumNumber < 1) {
            options.maximumNumber = defaultMaximumNumber;
        }

        if (isNaN(options.firstIndex)) {
            options.firstIndex = 0;
        }
        else {
            options.firstIndex -= options.maximumNumber;
            if (options.firstIndex < 0) {
                options.firstIndex = 0;
            }
        }

        this.getItemsInRange(options.firstIndex, options.maximumNumber);

    };

    this.getItems = function (customerOptions) {
        options = $.extend(options, customerOptions);
        storeClient.queryUrl(widgetUrl, options, afterGetItems, {}, options.output);
    };

    this.setContent = function (html) {
        $(chatTopicContainerSelector).html(html);
    };

    this.setTitle = function(newTitle){
        $(titleSelector).html(newTitle);
    };

    attachClickEvent();
    attachNavigationEvents();
    chatTopicCollections.set(collectionId, this);

    return this;
}


//++++++++++++++++++ pages/render.chat-message-collection.js +++++++++++++++++++


var chatMessageCollections = (function () {

    function ChatMessageCollections() {
        var chatMessageCollectionsObject = {};
        this.get = function (uniqueKey) {
            return chatMessageCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            chatMessageCollectionsObject[uniqueKey] = value;
        };

        return this;
    }

    return new ChatMessageCollections();

})();
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function ChatMessageCollection($, theCollectionId, theOptions) {


//create settings object
    var collectionSettings = new CollectionSettings();
    collectionSettings.itemSelector = ".chat-message-wrapper";//
    collectionSettings.containerSelector = ".chat-messages-container";//
    collectionSettings.nextLink = ".show-next-link";//
    collectionSettings.previousLink = ".show-previous-link";//
    collectionSettings.countSelector = ".count";//
    collectionSettings.totalCount = ".total_items";//
    collectionSettings.title = ".collection-title";
    collectionSettings.widgetUrl = $(collectionSettings.containerSelector).attr('url');

    collectionSettings.itemIdAttribute = "item-id";
    collectionSettings.highlightedItemClass = "product-highlighted";
    collectionSettings.itemWithOnclick = ".link-to-profile";
    collectionSettings.shouldPrevent = false;

    collectionSettings.displayNameAttribute = "display-name";
    collectionSettings.displayOrder = 'asc';
    collectionSettings.collectionsObject = chatMessageCollections;
    collectionSettings.autoShowInsertedItems = true;


    if (true !== collectionSettings.complete()) {
        throw new Error("some settings have not been set");
    }

    var self = new SmartCollection($, theCollectionId, theOptions, collectionSettings);
    var viewerNumber = theOptions.viewer_no;

    //add more events
    var onPostMessage = new EventListeners();
    var onPostMessageFailed = new EventListeners();
    self.events.onPostMessage = new EventListenersProxy(onPostMessage);
    self.events.onPostMessageFailed = new EventListenersProxy(onPostMessageFailed);
    var afterPostMessage = function (jsonResult, statusJSON, additionalJSON) {
        var i = 0;
        var html;
        //self.brightenView();
        if ("" === jsonResult.error) {
            onPostMessage.fire(additionalJSON);
            var newMetadata = jsonResult.metadata, html_array = jsonResult.html_array;
            if (html_array instanceof Array) {
                for (i = 0; i < html_array.length; i++) {
                    html = html_array[i];
                    self.insertItem(html);
                }
            }
            else {
                __logger.log("no chat messages returned");
            }


        }
        else {
            __logger.log("ERROR IN POST MESSAGE: "+jsonResult.error);
            onPostMessageFailed.fire({error:jsonResult.error});
        }
    };


    self.postMessage = function (message) {
        var temporaryMsg = new TemporaryMessage(message, self);
        var url = self.getWidgetUrl(), postingOptions = self.getOptions();
        $.extend(postingOptions, {action:"post", order:'asc', message:message, afterActivityId:self.highestId()-1});
        storeClient.queryUrl(url, postingOptions, afterPostMessage, {temporaryMessageId:temporaryMsg.id()}, 'json');
    };

    return self;
}


//++++++++++++++++++ pages/render.comment-collection.js +++++++++++++++++++


var commentCollections = (function () {

    function CommentCollections() {
        var commentsCollectionsObject = {};
        this.get = function (uniqueKey) {
            return commentsCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            commentsCollectionsObject[uniqueKey] = value;
        };

        return this;
    }

    return new CommentCollections();

})();
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function CommentCollection($, theCollectionId, theOptions) {

//create settings object
    var collectionSettings = new CollectionSettings();
    collectionSettings.itemSelector = ".comment-wrapper";//
    collectionSettings.containerSelector = ".product-comments-container";//
    collectionSettings.nextLink = ".comments-next";//
    collectionSettings.previousLink = ".comments-previous";//
    collectionSettings.countSelector = ".comments-count";//
    collectionSettings.totalCount = ".comments-total";//
    collectionSettings.title = ".comments-title";


    collectionSettings.itemIdAttribute = "item-id";
    collectionSettings.highlightedItemClass = "comment-highlighted";

    collectionSettings.itemWithOnclick = ".link-to-profile";
    collectionSettings.shouldPrevent = false;

    collectionSettings.displayNameAttribute = "display-name";

    collectionSettings.collectionsObject = commentCollections;
    collectionSettings.autoShowInsertedItems = true;
    collectionSettings.flashBackgroundColor = "#ffc";
    collectionSettings.displayOrder = 'asc';

    if (true !== collectionSettings.complete()) {
        throw new Error("some settings have not been set");
    }

    var self =  new SmartCollection($, theCollectionId, theOptions, collectionSettings);
    //===============================
    var productId = theOptions.product_id;

    //add more events
    var onPostComment = new EventListeners();
    var onPostCommentFailed = new EventListeners();
    self.events.onPostComment = new EventListenersProxy(onPostComment);
    self.events.onPostCommentFailed = new EventListenersProxy(onPostCommentFailed);

    var afterPostComment = function (jsonResult, statusJSON, additionalJSON) {

        if ("" === jsonResult.error) {
            setTimeout(function(e){
                onPostComment.fire({jsonResult:jsonResult,additionalJSON:additionalJSON});
            },5);

            var html_array = jsonResult.html_array;
            if (html_array instanceof Array) {
                for (var i = 0; i < html_array.length; i++) {
                    var html = html_array[i];
                    self.insertItem(html);
                }
            }
            else {
                __logger.log("no comments returned");
            }

        }
        else {
            onPostCommentFailed.fire({error:jsonResult.error,additionalJSON:additionalJSON});
        }
    };

    self.postComment = function (comment) {
        var temporaryComment = new TemporaryText(comment, self);
        //===============
        var url = self.getWidgetUrl();
        var postingOptions = {
            action:"post",
            productId:productId,
            comment:comment,
            afterActivityId:self.highestId()
        };
        storeClient.queryUrl(url, postingOptions, afterPostComment, {temporaryTextId:temporaryComment.id(),text:comment}, 'json');
    };

    return self;
}

//++++++++++++++++++ pages/render.event-collection.js +++++++++++++++++++


var eventCollections = (function () {

    function EventCollections() {
        var eventCollectionsObject = {};
        this.get = function (uniqueKey) {
            return eventCollectionsObject[uniqueKey];
        };

        this.set = function (uniqueKey, value) {
            eventCollectionsObject[uniqueKey] = value;
        };

        this.notifyAll = function(itemHTML){
            for(var key in eventCollectionsObject){
                eventCollectionsObject[key].insertItem(itemHTML);
            }
        };

        return this;
    }

    return new EventCollections();

})();


function EventCollection($, theCollectionId, theOptions) {
    //create settings object
    var collectionSettings = new CollectionSettings();
    collectionSettings.itemSelector = ".activity-stream-item";//
    collectionSettings.containerSelector = ".updates-container";//
    collectionSettings.nextLink = ".events-next";//
    collectionSettings.previousLink = ".events-previous";//
    collectionSettings.countSelector = ".events-count";//
    collectionSettings.totalCount = ".events-total";//
    collectionSettings.title = ".events-title";

    collectionSettings.itemIdAttribute = "item-id";
    collectionSettings.highlightedItemClass = "stream-item-highlighted";

    collectionSettings.itemWithOnclick = ".link-to-profile";
    collectionSettings.shouldPrevent = false;

    collectionSettings.displayNameAttribute = "display-name";

    collectionSettings.collectionsObject = eventCollections;
    collectionSettings.autoShowInsertedItems = true;
    collectionSettings.flashBackgroundColor = "#ffc";

    collectionSettings.displayOrder = 'desc';

    if (true !== collectionSettings.complete()) {
        throw new Error("some settings have not been set");
    }
    extend(this, new Array(new SmartCollection($, theCollectionId, theOptions, collectionSettings)));

    //===============================

    this.setOptions({"excluded_types":theOptions.excluded_types});
    return this;
}


//++++++++++++++++++ pages/render.recommend-product-dialog.js +++++++++++++++++++


var recommendationDialogs = { };

function RecommendationDialog($, dialogId) {

    //---------- some collection functions---------
    var sellerNumber = "";
    var wrapperSelector = "#" + dialogId;
    var collectionUrl = $(wrapperSelector).attr("collection-url");
    var collectionArea = $(wrapperSelector).find(".customer-collection-area");
    var statusArea = $(wrapperSelector).find(".recommendation-status");
    var customerCollection = null;


    var selectedPeopleContainerArea = $(wrapperSelector).find(".selected-customers");
    var smartSelectedItems = new SmartSelectedItems(selectedPeopleContainerArea);


    var afterLoadCustomerCollection = new EventListeners();
    this.events = {
        afterLoadCustomerCollection:new EventListenersProxy(afterLoadCustomerCollection)
    };
    var isBusy = false;

    var productId = null;

    var afterGetCustomerCollection = function (jsonResult, statusJSON, additionalJSON) {
        isBusy = false;
        if ("" === jsonResult.error) {
            statusArea.html('');
            var collection_id = jsonResult.metadata.collection_id;
            var html = jsonResult.html;
            collectionArea.html(html);
            customerCollection = customerCollections.get(collection_id);
            customerCollection.setTitle("Click each person you want to recommend the product");
            customerCollection.preventDefaultClickAction();
            customerCollection.events.onSelectionChanged.setListener(addCustomerToRecommendationList);

            afterLoadCustomerCollection.fire({collectionId:collection_id});
        }
        else {
            statusArea.html(jsonResult.error);
        }


    };


    this.setProductId = function (theProductId, theSellerNumber) {
        if (isBusy === true) {
            return false;
        }
        isBusy = true;
        productId = theProductId;
        //what if productId same as last?
        collectionArea.html('');
        smartSelectedItems.removeAll();
        storeClient.queryUrl(collectionUrl, {action:"getCustomerCollection", productId:productId}, afterGetCustomerCollection, {}, "json");
    };

    this.unsetProductId = function () {
        $(wrapperSelector).attr("product-id", '');
        customerCollection.showItem(sellerNumber);
    };

    this.appendTo = function (selector) {
        $(wrapperSelector).appendTo($(selector));
    };

    this.dialogView = function () {
        return $(wrapperSelector);
    };


    //============= wire up customer collection =====================


    var addCustomerToRecommendationList = function (eventArgs) {
        var uid = eventArgs.itemId;
        var name = customerCollection.getDisplayName(uid);
        smartSelectedItems.add(uid, name);
    };

    //==================================


    //========= wire up selection list ======================================

    var afterAddItemToSelectedList = function (eventArgs) {
        customerCollection.hideItem(eventArgs.itemId);
    };
    smartSelectedItems.events.afterAddItem.addListener(afterAddItemToSelectedList);

    var afterRemoveItemFromSelectedList = function (eventArgs) {
        customerCollection.showItem(eventArgs.itemId);
    };
    smartSelectedItems.events.afterRemoveItem.addListener(afterRemoveItemFromSelectedList);

    //========================================================

    var statusSelector = wrapperSelector + " .recommendation-status";

    var setStatus = function (text) {
        $(statusSelector).text(text);
        $(statusSelector).slideDown("slow");
        $(statusSelector).smartFlash({});
        setInterval(function (e) {
            $(statusSelector).slideUp("slow");
        }, 7000);

    };

    (function SubmitButton() {
        var submitSelector = wrapperSelector + " #send-recommendation";

        var afterSendRecommendation = function (jsonResult, statusJSON, additionalJSON) {
            if ("" == jsonResult.error) {
                $(submitSelector).children(".text").text("Recommendation sent!");
                setStatus("recommendation sent successfully!");
                setTimeout(function (e) {
                    $(submitSelector).children(".text").text("Send recommendation Again")
                    setStatus('');
                }, 5000);
            }
            else {
                $(submitSelector).children(".text").text("Failed to Send");
                setStatus(jsonResult.error);
                setTimeout(function (e) {
                    $(submitSelector).children(".text").text("Try sending recommendation Again");
                }, 5000);
            }
        };

        var onClickSendRecommendation = function () {

            var customerNumberCSV = smartSelectedItems.itemsAsCSV();

            if ("" != customerNumberCSV) {

                var options = {customerNumbers:customerNumberCSV, productId:productId};

                $(submitSelector).children(".text").text("Sending recommendation...");
                storeClient.recommendProduct(options, afterSendRecommendation, {});

            }
            else {
                setStatus("Select people to recommend the product to");
            }


            return false;
        };

        $(submitSelector).click(onClickSendRecommendation);
    })();


    recommendationDialogs[dialogId] = this;
    return this;
}

//++++++++++++++++++ pages/render.dashboard.js +++++++++++++++++++


function Dashboard() {

    var linkClassSelector = '.dashboard-link';

    var onSelectionChanged = new EventListeners();
    this.events = {
        onSelectionChanged : new EventListenersProxy(onSelectionChanged)
    };

    var highlight = function (linkId) {
        $(linkClassSelector).removeClass('dashboard-link-highlighted');
        $("#" + linkId).addClass('dashboard-link-highlighted');
    };

    var getIdentifier = function (linkId) {
        var identifier = "";
        switch(linkId){
            case "dboard-feed":
                identifier = "home";
                break;
            case "dboard-store":
                identifier = "shop";
                break;
            case "dboard-my-products":
                identifier = "my-products";
                break;
            case "dboard-load-cash":
                identifier = "cash";
                break;
            default:
                break;
        }
        return identifier;
    };

    this.init = function(){
        $(linkClassSelector).unbind("click");
        $(linkClassSelector).click(function (e) {
            var linkId = $(this).attr("id");
            highlight(linkId);
            var identifier = getIdentifier(linkId);
            onSelectionChanged.fire({linkId:linkId,identifier:identifier});
        });
        highlight('dboard-feed');
    };

}

var dashboard = new Dashboard();;
//++++++++++++++++++ pages/render.categories.js +++++++++++++++++++


function ProductCategories() {
    var productCategorySelector = ".product-category";
    var sender = this;
    var onSelectionChangedCallback = null;
    $(productCategorySelector).click(function (i) {
        var categoryId = $(this).attr('category-id');
        highlightCategory(categoryId);
        if ('function' == typeof(onSelectionChangedCallback)) {
            onSelectionChangedCallback(sender, categoryId);
        }
    });

    var highlightCategory = function (categoryId) {
        var targetObject = $(productCategorySelector + "[category-id=" + categoryId + "]");
        $(productCategorySelector).not(targetObject).removeClass('category-highlighted');
        targetObject.addClass('category-highlighted');
    }

    this.onSelectionChanged = function (callback) {
        if ('function' == typeof(callback)) {
            onSelectionChangedCallback = callback;
        }
    }

}

//++++++++++++++++++ pages/render.friend-requests.js +++++++++++++++++++



function FriendRequests() {
    var myself = this;

    FriendRequests.prototype.accept = function (requestId) {
        storeClient.setFriendRequestStatus({requestIds:requestId, status:'accepted'}, afterAccept, {requestIds:requestId});
    }

    FriendRequests.prototype.reject = function (requestId) {
        storeClient.setFriendRequestStatus({requestIds:requestId, status:'rejected'}, afterReject, {requestIds:requestId});
    }

    FriendRequests.prototype.linkToAccept = function (selector) {
        $(selector).click(function (event) {
            var requestId = $(this).attr('value');
            myself.accept(requestId);
        });
    }

    FriendRequests.prototype.linkToReject = function (selector) {
        $(selector).click(function (event) {
            var requestId = $(this).attr('value');
            myself.reject(requestId);
        });

    }

    var removeItem = function (requestId) {
        var requestIdOnInterface = "#friend-request-" + requestId;
        $(requestIdOnInterface).remove();
        var container = $("#requests-container");
        if (container.html() == "") {
            if (!container.hasClass('has-no-content')) {
                container.addClass('has-no-content');
                container.html("No friend requests for you");
            }
        }


    }

    var afterAccept = function (jsonResult, statusJSON, additionalJSON) {
        if ("" == jsonResult.error) {
            frontController.setMessage("You have accepted the request");
            var requestIds = additionalJSON.requestIds;

            var elementToRemove = "#friend-request-" + requestIds;
            $(elementToRemove).slideUp("slow", removeItem(requestIds));
        }
        else {
            frontController.setMessage(jsonResult.error)
        }
    }


    var afterReject = function (jsonResult, statusJSON, additionalJSON) {
        if ("" == jsonResult.error) {
            frontController.setMessage("You have rejected the request");
            var requestId = additionalJSON.requestIds;
            var elementToRemove = "#friend-request-" + requestId;
            $(elementToRemove).slideUp("slow", removeItem(requestId));
        }
        else {
            frontController.setMessage(jsonResult.error)
        }
    }

    var concatenate = function (currentString, newItemString) {
        return currentString + newItemString;
    }

    var createMarkup = function (offerInfo) {


        var offerId = offerInfo['activity_id'];
        var productId = offerInfo['product_id'];
        var product_title = offerInfo['product_title'];
        var amount = offerInfo['amount'];

        var customer_no = offerInfo['customer_no'];
        var full_name = offerInfo['full_name'];

        var text = "<a id='customer-number-" + customer_no + "' href='#'>" + full_name + "</a> is offering Ushs. " + amount + " on <a id='" + productId + "' href='#'>" + product_title + "</a><br/>Do you <a class='accept-offer-link' since='" + lastUpdateTimeForPendingOffers + "' value='" + offerId + "' href='#'>Accept this Offer?</a> or <a since='" + lastUpdateTimeForPendingOffers + "' value='" + offerId + "' class='reject-offer-link' href='#'>Reject it</a><br/><br/>";

        return "<div id='pending-offer-" + offerId + "'>" + text + "</div>";

    }

    var construct = function () {

    };

    construct();


}


//++++++++++++++++++ pages/render.accepted-offers.js +++++++++++++++++++


function AcceptedOffers() {


    var showCompletionDialog = function (sender) {
        var offerId = $(sender).attr('offer-id');
        var completionDialogOfInterest = "#completion-dialog-" + offerId;
        if ("" != currentCompletionDialogId) {
            //$(completionDialogHolderId).html( $(currentCompletionDialogId).html() );
            $(currentCompletionDialogId).html("");
        }
        currentCompletionDialogId = completionDialogOfInterest;

        var offset = $(completionDialogOfInterest).offset().top;
        $('body').animate({scrollTop:offset - 160}, "fast", "", function (event) {
            $(completionDialogOfInterest).html($(completionDialogHolderId).html());

            //clicks on radios
            var paymentRadios = completionDialogOfInterest + " [type=radio]";


            $(paymentRadios).click(function (i) {
                $(paymentRadios).not($(this)).removeAttr("checked");
                $(this).attr("checked", "checked");

            });


            //submit event
            $(completionDialogOfInterest + " input[type=button]").click(function (event) {

                var pmcode = $(paymentRadios + "[checked=checked]").eq(0).val();
                var options = {offerIds:offerId, pmcode:pmcode, dmcode:1};
                storeClient.honourOffers(options, afterhonourOffers, {});
            });
        });


    };

    var afterhonourOffers = function (jsonResult, statusJSON, additionalJSON) {
        if ("" == jsonResult.error) {
            frontController.setMessage("sucessfully honoured your offer");
            $(currentCompletionDialogId).html("");

            //take person to invoice page for this transaction
        }
        else {
            frontController.setMessage(jsonResult.error);
        }
    }

    var afterGetAcceptedOffers = function (jsonResult, statusJSON, additionalData) {


        if ("" == jsonResult.error) {

            var oldUpdateTime = additionalData.oldUpdateTime;
            var lastUpdateTime = getLastUpdateTime();
            if (lastUpdateTime != oldUpdateTime) {

                return false;
            }
            else {

                var metadata = jsonResult.metadata;
                var count = metadata.count;
                var newUpdateTime = metadata.update_time;
                var html = jsonResult.html;
                var newIds = jsonResult.new_ids;

                if (count > 0) {

                    setLastUpdateTime(newUpdateTime);
                    $("#" + containerId).append(html);


                }

            }

        }
        else {
            frontController.setMessage(jsonResult.error);
        }

    };

    // ------  OVERRIDABLE METHODS

    var construct = function () {
        completionDialogHolderId = "#completion-dialog-temp-holder";

        //set events
        $('.completion-activator').click(function (event) {
            var sender = this;
            showCompletionDialog(sender);
        });

    };

    var setError = function (error) {
        alert(error);
    };

    var getLastUpdateTime = function () {
        return $('#' + containerId).attr('update-time');
    };
    var setLastUpdateTime = function (newUpdateTime) {
        $('#' + containerId).attr('update-time', newUpdateTime);
    };


    //overridable variables
    var currentCompletionDialogId = "";
    var completionDialogHolderId = "";
    var containerId = 'accepted-offers-container';
    var myself = this;

    construct();
}

//++++++++++++++++++ pages/render.delivery-payment-dialog.js +++++++++++++++++++


function DeliveryPayment(){

    var dialogSelector = "#delivery-payment-dialog";
    var submitSelector = "#submit-delivery-payment";
    var amountSelector = "#delivery-payment-amount";
    var invoiceNumberSelector = "#delivery-payment-invoice-number";
    var addressSelector = "#delivery-address";
    var statusSelector = "#delivery-payment-status";


    var SubmitButton = function(){
        var dpInfo = null;

        var afterPayForDelivery = function(jsonResult, statusJSON, additionalJSON){
            $(dialogSelector).css({opacity:1.0});
            if("" == jsonResult.error){
                var successHTML = $("<span style='color:#080;padding:20px 50px;background-color: #ffc'>".concat("Delivery payment made successfully","</span>"));
                overlayDialog.loadJQueryObject(successHTML);
                overlayDialog.showUpdateDialog();
            }
            else{
                overlayDialog.showUpdateDialog();
                messageBox.show(jsonResult.error);

            }
        };

        var completeTransaction = function(sender, confirmationCode){
            var deliveryPaymentOptions = dpInfo.get();
            deliveryPaymentOptions.confirmationCode = confirmationCode;
            $(dialogSelector).css({opacity:0.3});
            storeClient.payForDelivery(deliveryPaymentOptions, afterPayForDelivery, {});
        };

        function EnteredDeliveryPaymentInfo(){

            var errorString = '';
            var paymentInfo = null;

            this.hasNoError = function(){
              return errorString === '';
            };

            this.getError = function(){
                return errorString;
            };

            this.get = function(){
                return paymentInfo;
            };

            var getFromDialog = function(){
                return {
                    invoiceNumber:$(invoiceNumberSelector).val(),
                    amount:$(amountSelector).val(),
                    deliveryAddress:$(addressSelector).val()
                };
            };

            var checkIfComplete = function(paymentInfo){
                var emptyPattern = /^(\s*)$/;
                for(var key in paymentInfo){
                    var value = paymentInfo[key];
                    var isEmptyValue = emptyPattern.test(value);
                    if(isEmptyValue && (key === 'invoiceNumber' || key === 'amount')){
                        errorString = "".concat(key," is empty");
                        return;
                    }
                }
            };

            (function init(){
                paymentInfo = getFromDialog();
                if(typeof(paymentInfo) === 'object'){
                    if(null !== paymentInfo){
                       checkIfComplete(paymentInfo);
                    }
                    else{
                        errorString = "payment info not captured";
                    }
                }
                else{
                    errorString = "invalid data type for delivery payment info";
                }

            })();
        }

        var onClickSubmitDeliveryPayment = function(){
            dpInfo = new EnteredDeliveryPaymentInfo();
            if(dpInfo.hasNoError()){
                authenticationDialog.promptText("Confirm with your PIN");
                authenticationDialog.onEnterCode(completeTransaction);
                authenticationDialog.showAuthenticationDialog();
            }
            else{
                $(statusSelector).text(dpInfo.getError());
            }

            return false;
        };
        //==========================
        $(submitSelector).click(onClickSubmitDeliveryPayment);

    };

    var submitButton = new SubmitButton();
    return this;
}
//++++++++++++++++++ pages/render.invoice-complaint-form.js +++++++++++++++++++


function InvoiceComplaintForm() {
    var submitSelector = "#submit-complaint";
    var dialogSelector = "#submit-complaint-form";
    var statusAreaSelector = "#complaint-status-area"

    var formWrapperSelector = "#submit-complaint-form";

    var invoiceNumberSelector = "#file-complaint-invoice-number";
    var invoiceComplaintTypeIdSelector = formWrapperSelector.concat(" [name=complaintTypeId]");


    var afterPostComplaint = function (json) {
        $(dialogSelector).css({opacity:1.0});
        if ("" == json.error) {
            $(submitSelector).val("Success");
            $(submitSelector).css({opacity:"0.8"});
            $(submitSelector).unbind("click");
            $(submitSelector).click(function(e){return false;});

        }
        else {
            $(submitSelector).val("Failed");
            $(statusAreaSelector).text(json.error);
            $(statusAreaSelector).show(json.error);
            setTimeout(function (e) {
                $(submitSelector).val("Submit Complaint");
                $(statusAreaSelector).hide("fast");
            }, 5000);
        }

    };

    function EnteredComplaintInfo() {
        var error = '';
        var complaintInfo = null;

        this.hasNoError = function () {
            return error == '';
        };

        this.getError = function () {
            return error;
        };

        var getComplaintInfoFromDialog = function () {
            return {
                invoiceNumber:$(invoiceNumberSelector).val(),
                complaintTypeId:null
            };
        };

        this.getComplaintInfo = function () {
            return complaintInfo;
        };

        (function init() {
            complaintInfo = getComplaintInfoFromDialog();
        })();

    }

    var complaintTypeId = null;
    $(invoiceComplaintTypeIdSelector).click(function (e) {
        complaintTypeId = $(this).attr("value");
    });

    $(submitSelector).click(function (e) {

        var enteredComplaintInfo = new EnteredComplaintInfo();
        if (enteredComplaintInfo.hasNoError()) {
            var complaintInfo = enteredComplaintInfo.getComplaintInfo();
            complaintInfo.complaintTypeId = complaintTypeId;
            $(dialogSelector).css({opacity:0.3});
            storeClient.postComplaintOnInvoice(complaintInfo, afterPostComplaint, {});
        }
        else {
            $(statusAreaSelector).text(enteredComplaintInfo.getError());
        }

        return false;
    });

}

//++++++++++++++++++ pages/render.comments-widget.js +++++++++++++++++++


function CommentsWidget(commentCollectionId,commentingBoxId,_commentButonId){
    var commentCollection = commentCollections.get(commentCollectionId);
    var commentBoxId = commentingBoxId;
    var commentButtonId = _commentButonId;

    var commentBoxAsJQueryObject = $("#"+commentBoxId);
    var commentButtonAsJSONObject = $("#"+commentButtonId);
    var commentInputBox = commentBoxAsJQueryObject.find(".comment-input-box");

    var setCommentingBoxText = function(newText){
        $("#"+commentBoxId).find(".comment-input-box").text(newText);
    };

    var clearCommentingBox= function(){
        setCommentingBoxText("");
    };

    var setErrorMessage = function(newText){
        var selector = "#".concat(commentBoxId, " .error-display-area");
        $(selector).text(newText);
        $(selector).slideDown();
        setTimeout(function(e){
            $(selector).slideUp();
        },5000);
    };

    commentCollection.events.onPostCommentFailed.setListener(function(eventArgs){
        var error = eventArgs.error;
        var additionalJSON = eventArgs.additionalJSON;

        var comment = additionalJSON.text;
        setCommentingBoxText(comment);
        setErrorMessage(error);
    });
    commentCollection.events.onPostComment.setListener(function(eventArgs){
        var jsonResult = eventArgs.jsonResult;
    });
    commentCollection.events.onInsertItem.setListener(function(eventArgs){
        clearCommentingBox();
    });

    var onPostComment_click = _.throttle(function(e){
        var comment = commentInputBox.text();
        commentCollection.postComment(comment);
        return false;
    },3000);

    (function init(){
        commentButtonAsJSONObject.unbind("click");
        commentButtonAsJSONObject.click(onPostComment_click);
    })();
}

//++++++++++++++++++ pages/render.home-links.js +++++++++++++++++++




    function HomeLinks(){
        var onItemClick = new EventListeners();
        this.events = {
            onItemClick:new EventListenersProxy(onItemClick)
        };

        this.init = function(){
            $(".smart-dashboard-link").unbind("click");
            $(".smart-dashboard-link").click(function(e){
                var href = $(this).attr("href");
                var page = $(this).attr("page");
                onItemClick.fire({page:page,href:href});
                return false;
            });
        };
    }
    var smarthomeLinks = new HomeLinks();

//++++++++++++++++++ pages/temporary-message.js +++++++++++++++++++


function TemporaryMessage(str_message, _smartCollection) {

    //var self = this;
    var smartCollection = _smartCollection;
    var messageToSend = str_message;

    var temporaryItemId = null;
    var $timeAgo_widgetId = "smart-time-ago-"+smartRandom();

    this.id = function(){
        return temporaryItemId;
    };

    smartCollection.events.beforeInsertItem.addListener(function(e){
        //alert("before insert item");
    });

    smartCollection.events.onPostMessage.addListener(function(additionalJSON){
        //delete corresponding temporary message
        //smartCollection.removeItem(temporaryItemId);
        var postedItemId = additionalJSON.temporaryMessageId;
        if(postedItemId === temporaryItemId){
            smartCollection.removeTemporaryItem(temporaryItemId);
        }
    });

    var direction_as_class_attribute = function () {
        return "sent-message";
    };

    var getTimeAgoTemplate = function(){
        return "<abbr class='time-ago smart-normal-sub-title-text' id='{widget-id}' title='#gmt-date-time-string#'>published date</abbr> <script type='text/javascript'> onPageLoad.addListener(function(e){ $('#{widget-id}').timeago(); }); </script> ";
    };

    var smartTimeAgo = function($iso_8601__timestamp){
        //we expect something like 2014-10-19T23-45-00Z
        var $timeAgoTemplate = getTimeAgoTemplate();


        var $HTML = preg_replace(["{widget-id}","#gmt-date-time-string#"],[$timeAgo_widgetId,$iso_8601__timestamp],$timeAgoTemplate);
        return $HTML;
    };

    var getPictureTemplate = function(){
        var $avatarUrl = "../pictures/#picture-id#?size=#picture-size#&rand=" + Math.random();
        return "<img class='#image-class#' src='"+$avatarUrl+"'/>";
    };

    var smartImage = function($pictureId, $size, $onlineStatusHTML, $imageClass)
    {
        var $widgetId = "smart-image-" + Math.random();
        var $numeric_size = 50;
        switch ($size) {
            case "icon":
                $numeric_size = 50;
                break;
            case "small":
                $numeric_size = 100;
                break;
            case "medium":
                $numeric_size = 200;
                break;
            case "large":
                $numeric_size = 400;
                break;
            default:
                $numeric_size = 50;
                break;
        }

        var $pictureUrlTemplate = getPictureTemplate();
        var $html = preg_replace(
            new Array("#picture-id#", "#picture-size#", "#widget-id#", "#online-status-html#", "#image-class#","#size#"),
            new Array($pictureId, $size, $widgetId, $onlineStatusHTML, $imageClass, $numeric_size),
            $pictureUrlTemplate
        );
        return $html;
    };

    var smartAvatar = function (commenterId, additionalClass) {
        return smartImage(commenterId,"icon","","chat-message-image");
    };

    var getMessageItemTemplate = function () {
        return "<div item-id='__commentId' class='chat-message-wrapper __message_direction_class__'> <table style='width: 98%; border: 0px solid transparent'><tbody><tr><td valign='top' class='image-column'>__avatar</td><td valign='top'>__commenter<br><span comment-id='__commentId'>&nbsp;__comment</span><br><div class='count' style='width: 32px;margin-left: 95%;margin-top: -1.5em;font-weight: bold;color: #656565;float: right;'></div><div class='comment-time-ago'>__timeAgo</div></td></tr></tbody></table></div>";
    };

    var preg_replace = function (arr_patterns, arr_replacements, string) {

        var str_result = string;
        for(var i = 0; i < arr_patterns.length;i++){
            var pattern = arr_patterns[i];
            var replacement = arr_replacements[i];
            str_result = str_result.replace(new RegExp(pattern,"gim"),replacement);
        }
        return str_result;
    };

    var renderMessageItem = function (arrayOfReplacements) {
        var messageItemTemplate = getMessageItemTemplate();
        var keys = _.keys(arrayOfReplacements);
        var values = _.values(arrayOfReplacements);
        var html = preg_replace(keys, values, messageItemTemplate);
        return html;
    };

    var generateTemporaryMessageInfo = function (messageToSend) {
        var arr_message_info = {"object_id":"0", "activity_id":temporaryItemId, "content":"hey dan", "seen":"0", "actor_no":"0", "target_no":"0", "timestamp":"0", "object_type":"messages", "object_no":"0"};

        //process and inject message
        messageToSend = htmlSpecialChars(messageToSend);


        //var activity_id = 0;

        arr_message_info['content'] = messageToSend;
        arr_message_info['actor_no'] = 7;//replace with me
        arr_message_info['target_no'] = 53;//replace with friendId
        arr_message_info['timestamp'] = 0;//replace with NOW() as seconds
        arr_message_info['date'] = "2014-01-19";
        arr_message_info['time'] = "12-37-00";
        arr_message_info['timezone'] = 'UTC';
        arr_message_info['full_name'] = 'Me';
        arr_message_info['customer_no'] = arr_message_info['actor_no'];

        return arr_message_info;
    };


    var translateMessageToHTML = function (messageToSend) {

        var arr_message_info = generateTemporaryMessageInfo(messageToSend);

        //===================
        var activityId = arr_message_info["activity_id"];
        var commenterId = arr_message_info["customer_no"];
        var commenterName = arr_message_info["full_name"];
        var messageText = arr_message_info["content"];

        var date = arr_message_info['date'];
        var time = arr_message_info['time'];
        var timezone = 'UTC';
        var published = date + "T" + time + "Z";

        var timeWidgetHTML = smartTimeAgo(published);
        var commenterAvatar = smartAvatar(commenterId, 'chat-message-image');//smartProfileLink($commenterId, smartAvatar($commenterId,$actor,'chat-message-image'));
        var commenterHTML = "<span style='color: #309b3a;font-weight: bold'>"+commenterName+"</span>";

        //===========================
        //TODO: remember to use HTMLSpecialChars on message content, commenter, etc
        //=============================

        var msg_html = renderMessageItem({
            '__commentId':activityId,
            '__commenter':commenterHTML,
            '__comment':messageText,
            '__timeAgo':timeWidgetHTML,
            '__avatar':commenterAvatar,
            '__message_direction_class__':direction_as_class_attribute()

        });

        return msg_html;
    };

    var insertIntoCollection = function (messageToSend) {
        var messageToSendAsHTML = translateMessageToHTML(messageToSend);
        temporaryItemId = smartCollection.appendItemTemporarily(messageToSendAsHTML);
    };

    (function init() {
        insertIntoCollection(messageToSend);
    })();
}
//++++++++++++++++++ pages/temporary-comment.js +++++++++++++++++++


function TemporaryText(str_text, _smartCollection) {

    //var self = this;
    var smartCollection = _smartCollection;
    var textToSend = str_text;

    var temporaryItemId = null;

    this.id = function () {
        return temporaryItemId;
    };

    smartCollection.events.onPostComment.addListener(function (eventArgs) {

        var additionalJSON = eventArgs.additionalJSON;
        var postedItemId = additionalJSON.temporaryTextId;
        if (postedItemId === temporaryItemId) {
            smartCollection.removeTemporaryItem(temporaryItemId);
        }
    });

    smartCollection.events.onPostCommentFailed.addListener(function (eventArgs) {
        var additionalJSON = eventArgs.additionalJSON;
        var postedItemId = additionalJSON.temporaryTextId;
        if (postedItemId === temporaryItemId) {
            smartCollection.removeTemporaryItem(temporaryItemId);
        }
    });

    var translateTextToHTML = function (messageToSend) {

        var arr_message_info = generateTemporaryItemInfo_comment(messageToSend);

        //===================
        var activityId = arr_message_info["activity_id"];
        var commenterId = arr_message_info["customer_no"];
        var commenterName = arr_message_info["full_name"];
        var messageText = arr_message_info["comment"];

        var date = arr_message_info['date'];
        var time = arr_message_info['time'];
        var timezone = 'UTC';
        var published = date + "T" + time + "Z";

        var timeWidgetHTML = smartTimeAgo(published);
        var commenterAvatar = smartAvatar(commenterId, 'chat-message-image');//smartProfileLink($commenterId, smartAvatar($commenterId,$actor,'chat-message-image'));
        var commenterHTML = "<span style='color: #309b3a;font-weight: bold'>" + commenterName + "</span>";

        //===========================
        //TODO: remember to use HTMLSpecialChars on message content, commenter, etc
        //=============================

        var msg_html = renderItem_comment({
            '__commentId':activityId,
            '__commenter':commenterHTML,
            '__comment':messageText,
            '__display_name':commenterName,
            '__timeAgo':timeWidgetHTML,
            '__avatar':commenterAvatar

        });

        return msg_html;
    };

    var insertIntoCollection = function (textToPost) {
        var messageToSendAsHTML = translateTextToHTML(textToPost);
        temporaryItemId = smartCollection.appendItemTemporarily(messageToSendAsHTML);
    };

    (function init() {
        insertIntoCollection(textToSend);
    })();
}
//++++++++++++++++++ js/page-modules.js +++++++++++++++++++



//++++++++++++++++++ pages/render.updates.js +++++++++++++++++++


function UpdateStream($,theCollectionId, theRecommendationDialogId) {
    var collectionId = theCollectionId;
    var eventCollection = eventCollections.get(collectionId);
    var recommendationDialog = recommendationDialogs[theRecommendationDialogId];
    var myself = this;
    var defaultRecommendationDialogHolderSelector = ".default-recommendation-dialog-holder";

    var onReceivedUpdate = function (eventArgs) {
        eventCollection.insertItem(eventArgs.html);
    };

    var afterHideLightbox = function(){
        recommendationDialog.unsetProductId();
        recommendationDialog.appendTo(defaultRecommendationDialogHolderSelector);
        smartLightbox.onHide.removeAllListeners();
    };

    this.showRecommendDialogForProduct = function(theProductId,sellerNumber){


        //smartLightbox.setOneTimeWidth(smartBrowser.clientWidth() * 0.7);
        //smartLightbox.setOneTimeHeight(smartBrowser.clientHeight() * 0.7);
        smartLightbox.show();

        recommendationDialog.events.afterLoadCustomerCollection.setListener(function(e){
            recommendationDialog.appendTo(smartLightbox.clientAreaSelector());
            smartLightbox.reformatContent();
        });
        var productIdToRecommend = ""+theProductId;
        var sellerNumber = ""+sellerNumber;
        recommendationDialog.setProductId(productIdToRecommend,sellerNumber);
    };

    this.showPlaceOfferDialogForProduct = function(productId){
        alert("will place offer on : "+productId);
    };

    (function construct() {

        var lastUpdateTime = eventCollection.getOptions(true)['update_time'];
        eventController.setLastUpdateTime(lastUpdateTime);
        eventController.addListener(onReceivedUpdate, smartEventType.viewedProduct, smartViewerType.activityStreamItem);

        smartLightbox.onHide.addListener(afterHideLightbox);
    })();
}



//++++++++++++++++++ pages/render.products.js +++++++++++++++++++

function ProductsForSale(collectionId, searchFormId) {
    var selectedCategory = -1;
    var productCollection = productCollections.get(collectionId);
    var searchClient = searchClientsDictionary[searchFormId];

    //needed
    var getProductsInCategory = function (sender, categoryId) {
        var params = {"category_ids":null,"search_query":null,seller_numbers:null};
        selectedCategory = parseFloat(categoryId);
        if(selectedCategory > 0){
            params.category_ids = selectedCategory;
        }
        productCollection.setOptions(params);
        productCollection.loadData();
        return false;
    };

    //needed
    var onProductCollectionError = function (eventArgs) {
        var error = eventArgs.error;
        frontController.setMessage(error);
    };

    //needed
    var onClickSearch = function (sender, searchQuery) {
        __logger.log("searching for: "+searchQuery);
        productCollection.searchFor(searchQuery);
        return false;
    };

    productCollection.events.onError.addListener(onProductCollectionError);

    productCategories.onSelectionChanged(getProductsInCategory);
    searchClient.onClickSearch.add(onClickSearch);

}


//++++++++++++++++++ pages/render.my-products.js +++++++++++++++++++

function MyProducts(collectionId){

    var productCollection = productCollections.get(collectionId);

    var onSelectionChanged = function(sender, productId){
        return false;
    };

}


//++++++++++++++++++ pages/render.my-friends.js +++++++++++++++++++

function MyFriends(collectionId){

    var customerCollection = customerCollections.get(collectionId);
    //customerCollection.preventDefaultClickAction();
    //customerCollection.events.onSelectionChanged.setListener(collection_SelectionChanged);


    function collection_SelectionChanged (eventArgs){
        var customerId = eventArgs.itemId;

    }

}


//++++++++++++++++++ pages/render.post-product-form.js +++++++++++++++++++

function PostProductModule() {

    var selectedCategoryId = '{category_id}';

    $('select.post-product-input option').each(function(e){
        var optionValue = $(this).attr('value');
        if(optionValue === selectedCategoryId){
            $(this).attr('selected',"true");
        }
    });

    var onUploadCallback = null;
    var onErrorCallback = null;
    var submitSelector = "#submit-product";
    var defaultSubmitText = $(submitSelector).val();
    var dialogSelector = "#post-product-form";
    var statusSelector = "#post-product-status";

    this.onUpload = function (callback) {
        if ('function' == typeof(callback)) {
            onUploadCallback = callback;
        }
    };

    this.onError = function (callback) {
        if ('function' == typeof(callback)) {
            onErrorCallback = callback;
        }
    };

    var afterPostProduct = function (json) {
        $(dialogSelector).css({opacity:1.0});
        if ("" == json.error) {
            $(submitSelector).val("product Posted successfully!");
            $(statusSelector).text("Product Posted Successfully!");
            var productId = json.product_id;
            setTimeout(function (e) {
                $(submitSelector).val("Post Another product!");
            }, 5000);

            if ('function' == typeof (onUploadCallback)) {
                onUploadCallback(json);
                return false;
            }

        }
        else {
            $(submitSelector).val("Failed to post");
            $(statusSelector).text(json.error);
            setTimeout(function (e) {
                $(submitSelector).val("Try Posting again!");
            }, 5000);

            if ('function' == typeof (onErrorCallback)) {
                onErrorCallback(json.error);
            }
        }

    };

    var onError = function (json) {
        $(submitSelector).val("Error in connection");
        $(dialogSelector).css({opacity:1.0});
        setTimeout(function (e) {
            $(submitSelector).val("Try Posting again!");
        }, 5000);

        if ('function' == typeof (onErrorCallback)) {
            onErrorCallback("Error in connecting to the server");
            return false;
        }

    };

    var beforeSend = function (json) {
        $(submitSelector).val("Posting...");
        $(dialogSelector).css({opacity:0.6});

    };

    this.getProductPostingOptions = function () {
        return productPostingOptions;
    };

    //SET UP OUR PRODUCT POSTING FROM TO USE AJAX
    var productPostingOptions = {

        dataType:'json',
        "success":afterPostProduct,
        beforeSend:beforeSend,
        "error":onError,
        url:"../api/store",
        data:{cmd:'postProduct'}
    };

    $('#post-product-form').ajaxForm(productPostingOptions);

    return this;
}

