$( document ).ready( function() {

  var tweetCompose = $( '.tweet-compose' );
  var charCount = $( '#char-count' );
  var tweetSubmit = $( '#tweet-submit' );
  var myFullName = $( '#myFullName' ).text();
  var myHandle = $( '#myHandle' ).text();
  var myAvatarSrc = 'img/alagoon.jpg';

  // When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed.
  tweetCompose.click( function() {
    $( this ).css( 'height', '5em' );
    $( '#tweet-controls' ).css( 'display', 'block' );
  } );

  // As the user types, the character count should decrease.
  tweetCompose.keyup( function( e ) {
      var tweetLength = $( '.tweet-compose' ).val().length;
      var remainingCharCount = 140 - tweetLength;

      if ( remainingCharCount >= 0 ) {
        charCount.css( 'color', '#999' );
        tweetSubmit.prop( 'disabled', false );
      }

      // When there are 10 or less characters, the character counter should turn red.
      if ( remainingCharCount <= 10 ) {
        charCount.css( 'color', 'red' );
      }

      // If the user puts in more than 140 characters, the tweet button should be disabled (and re-enabled when there are <= 140 chars).
      if ( remainingCharCount < 0 ) {
        tweetSubmit.prop( 'disabled', true );
      }
      charCount.html( remainingCharCount );
    }
  );

  // When the user successfully inputs characters and clicks the “Tweet” button, a new tweet should be created and added to the tweet stream in the main column, using the user’s fake profile image in the top left and username/fullname.
  tweetSubmit.click( function(){
    // gets tweet text and stores to a variable
    var tweetContent = $( '.tweet-compose' ).val();
    // prepends div containing tweet contents
    $( '#stream' ).prepend(
      '<div class="tweet">' +
        '<div class="content">' +
          '<img class="avatar" src="' + myAvatarSrc + '"/>' +
          '<strong class="fullname">' + myFullName + '</strong>' +
          '<span class="username">' + myHandle +  '</span>' +
          '<!-- BLACK DIAMOND: Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet. -->' +
          '<!-- HINT: Add to what you created in Step 5 -->' +
          '<p class="tweet-text">' + tweetContent + '</p>' +
          '<!-- STEP 6: The tweet actions below should only show up when you hover over the tweet. Otherwise, they should be hidden. -->' +
          '<!-- HINT: CSS ":hover" pseudo element -->' +
          '<div class="tweet-actions">' +
            '<ul>' +
              '<li><span class="icon action-reply"></span> Reply</li>' +
              '<li><span class="icon action-retweet"></span> Retweet</li>' +
              '<li><span class="icon action-favorite"></span> Favorite</li>' +
              '<li><span class="icon action-more"></span> More</li>' +
            '</ul>' +
          '</div>' +
          '<!-- STEP 7: The Retweets/timestamp/Reply areas below should also be hidden by default. These should only expand if you click on the tweet. Use a jQuery animation to accomplish the reveal, similar to how it’s done on Twitter.com -->' +
          '<!-- HINT: jQuery ".on" eventHandler -->' +
          '<div class="stats">' +
            '<div class="retweets">' +
              '<p class="num-retweets">30</p>' +
              '<p>RETWEETS</p>' +
            '</div>' +
            '<div class="favorites">' +
              '<p class="num-favorites">6</p>' +
              '<p>FAVORITES</p>' +
            '</div>' +
            '<div class="users-interact">' +
              '<div>' +
                '<!-- BLACK DIAMOND: Implement the Bootstrap tooltips for when you hover over a user\’s avatar image -->' +
                '<!-- HINT: Bootstrap has good documentation -->' +
                '<img src="img/alagoon.jpg" />' +
                '<img src="img/vklimenko.jpg" />' +
              '</div>' +
            '</div>' +
            '<!-- BLACK DIAMOND: Make the timestamp below similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery timeago plugin to make them automatic. -->' +
            '<!-- HINT: Refer to timeago documentation -->' +
            '<div class="time">' +
              '1:04 PM - 19 Sep 13' +
            '</div>' +
          '</div>' +
          '<div class="reply">' +
            '<img class="avatar" src="img/alagoon.jpg" />' +
            '<textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  } );




} );
