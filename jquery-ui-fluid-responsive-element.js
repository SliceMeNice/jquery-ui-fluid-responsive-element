/*!
 * Fluid Responsiveness based on jQuery UI Widget
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 *  Requires UI version 1.9+
 */

( function ( $, window, document, undefined ) {

	var regularExpression = /fluid\-([^\[]+)\[(\d+)\]/i;

	$.widget( 'smn.fluidResponsiveElement', {

		options: {
			
		},

		_create: function() {
			var widget = this;

			var data = widget.element.data();

			var fluidProperties = {};

			$.each( data, function( key, value ) {
				// format key to kebab case
				key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
				
				var found = key.match( regularExpression );
				
				if ( found ) {
					var cssProperty = found[ 1 ];
					var breakpoint = parseInt( found[ 2 ], 10 );
					
					if ( !fluidProperties[ cssProperty ] ) {
						fluidProperties[ cssProperty ] = [];
					}
					
					fluidProperties[ cssProperty ].push( {
						breakpoint: breakpoint,
						value: value
					} );
				}
			} );

			$.each( fluidProperties, function( cssProperty, fluidDefinition ) {
				fluidDefinition.sort( function( a, b ) {
					return a.breakpoint - b.breakpoint;
				} );
				
				if ( fluidDefinition.length === 2 ) {
					var minValue = fluidDefinition[ 0 ].value;
					var maxValue = fluidDefinition[ 1 ].value;
					
					var minBreakpoint = fluidDefinition[ 0 ].breakpoint;
					var maxBreakpoint = fluidDefinition[ 1 ].breakpoint;
					
					var propertyValue = 'calc( ' + minValue + 'px + ' + ( maxValue - minValue ) + ' * (100vw - ' + minBreakpoint + 'px) / ' + ( maxBreakpoint - minBreakpoint ) + ' )';
					
					widget.element.css( cssProperty, propertyValue );
				}
			} );
		}

	} );

} )( jQuery, window, document );
