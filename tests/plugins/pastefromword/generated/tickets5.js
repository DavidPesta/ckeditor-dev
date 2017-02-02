/* bender-tags: clipboard,pastefromword */
/* jshint ignore:start */
/* bender-ckeditor-plugins: pastefromword,ajax,basicstyles,bidi,font,link,toolbar,colorbutton,image */
/* bender-ckeditor-plugins: list,liststyle,sourcearea,format,justify,table,tableresize,tabletools,indent,indentblock,div,dialog */
/* jshint ignore:end */
/* bender-include: _lib/q.js,_helpers/promisePasteEvent.js,_lib/q.js,_helpers/assertWordFilter.js,_helpers/createTestCase.js,_helpers/pfwTools.js */
/* global createTestCase,pfwTools */

( function() {
	'use strict';

	bender.editor = {
		config: pfwTools.defaultConfig
	};

	var browsers = [
			'chrome',
			'firefox',
			'ie8',
			'ie11',
			'edge'
		],
		wordVersions = [ 'word2013', 'word2016' ],
		ticketTests = {
			'14867examples': true,
			'16593regular_paste': true,
			'16833Numbered_lists': true
		},
		testData = {
			_should: {
				ignore: {
					'test 16833Numbered_lists word2016 edge': !CKEDITOR.env.edge
				}
			}
		},
		ticketKeys = CKEDITOR.tools.objectKeys( ticketTests ),
		i, k, j, wordVersion;

	for ( i = 0; i < ticketKeys.length; i++ ) {
		for ( k = 0; k < browsers.length; k++ ) {
			for ( j = 0; j < wordVersions.length; j++ ) {
				wordVersion = wordVersions[ j ];
				var testName = [ 'test', ticketKeys[ i ], wordVersion, browsers[ k ] ].join( ' ' );

				if ( CKEDITOR.env.ie && CKEDITOR.env.version <= 11 ) {
					testData._should.ignore[ testName ] = true;
				}

				testData[ testName ] = createTestCase( ticketKeys[ i ], wordVersion, browsers[ k ], true, true );
			}
		}
	}

	bender.test( testData );
} )();
