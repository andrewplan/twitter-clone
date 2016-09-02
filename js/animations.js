$( document ).ready( function() {

  // When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed.
  $( '.tweet-compose' ).click( function() {
    $( this ).css( 'height', '5em' );
    $( '#tweet-controls' ).css( 'display', 'block' );
  } );

  // As the user types, the character count should decrease.
  $( '.tweet-compose' ).keyup( function( e ) { debugger;
      var tweetLength = $( '.tweet-compose' ).val().length;
      var remainingCharCount = 140 - tweetLength;

      $( '#char-count' ).html( remainingCharCount );
    }
  );


} );
