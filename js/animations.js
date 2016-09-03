$( document ).ready( function() {
  // localStorage[ 'allTheTweets' ] = '';

  var tweets = [];
  var tweetCompose = $( '.tweet-compose' );
  var tweetControls = $( '#tweet-controls' );
  var charCount = $( '#char-count' );
  var tweetSubmit = $( '#tweet-submit' );
  var myFullName = $( '#myFullName' ).text();
  var myHandle = '@andrewplan';
  var myAvatarSrc = 'img/alagoon.jpg';
  var currentTime = new Date();
  var currentTimeInISO = currentTime.toISOString();

  jQuery("time.timeago").timeago();
  $( '.tweet-actions' ).animate( {opacity: 0}, 0 );
  grabDataFromLocalStorage();

  function grabDataFromLocalStorage() {
    // if localStorage is not empty, parse it and store in listo.
    if ( typeof localStorage[ 'allTheTweets' ] !== 'undefined' && localStorage[ 'allTheTweets' ] !== '' ) {
      tweets = JSON.parse( localStorage[ 'allTheTweets' ] );
      repopulateTweetStream( tweets );
    }
    // if localStorage is empty, set listo to equal []
    else {
      tweets = [];
    }
  }

  function repopulateTweetStream( arr ) {
    for ( var i = 0; i < arr.length; i++ ) {
      $( '#stream' ).prepend(
        '<div class="tweet">' +
          '<div class="content">' +
            '<img class="avatar" src="' + myAvatarSrc + '" data-title="@andrewplan"/>' +
            '<div id="favorite-active" class="status-icon-wrapper">' +
              '<img class="status-icon" src="img/retweet-icon-1.png">' +
            '</div>' +
            '<div id="retweet-active" class="status-icon-wrapper">' +
              '<img class="status-icon" src="img/favorite-status-icon.png">' +
            '</div>' +
            '<strong class="fullname">' + myFullName + '</strong>' +
            '<span class="username">' + ' ' + myHandle +  '</span>' +
            '<!-- BLACK DIAMOND: Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet. -->' +
            '<!-- HINT: Add to what you created in Step 5 -->' +
            '<p class="tweet-text">' + arr[ i ][ 'tweet' ] + '</p>' +
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
                  '<img class="avatar" src="img/alagoon.jpg" data-title="@andrewplan" />' +
                  '<img class="avatar" src="img/vklimenko.jpg" data-title="@iliketheletterV" />' +
                '</div>' +
              '</div>' +
              '<!-- BLACK DIAMOND: Make the timestamp below similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery timeago plugin to make them automatic. -->' +
              '<!-- HINT: Refer to timeago documentation -->' +
              '<div class="time">' +
                  '<time class="timeago" datetime="' + arr[ i ][ 'date' ] +
                  '">' +
                      // currentTime +
                  '</time>' +
              '</div>' +
            '</div>' +
            '<div class="reply">' +
              '<img class="avatar" src="img/alagoon.jpg" data-title="@andrewplan" />' +
              '<textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }
  }

  function TweetGenerator( tweet, date, handle ) {
      this.tweet = tweet;
      this.date = date;
      this.handle = handle;
  }

  // When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed.
  tweetCompose.click( function() {
    $( this ).css( 'height', '5em' );
    tweetControls.show();
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
    var tweet = new TweetGenerator( tweetContent, currentTimeInISO, myHandle);
    tweets.push( tweet );
    localStorage[ 'allTheTweets' ] = JSON.stringify( tweets );

    // prepends div containing tweet contents
    $( '#stream' ).prepend(
      '<div class="tweet">' +
        '<div class="content">' +
          '<img class="avatar" src="' + myAvatarSrc + '" data-title="@andrewplan"/>' +
          '<div id="favorite-active" class="status-icon-wrapper">' +
            '<img class="status-icon" src="img/retweet-icon-1.png">' +
          '</div>' +
          '<div id="retweet-active" class="status-icon-wrapper">' +
            '<img class="status-icon" src="img/favorite-status-icon.png">' +
          '</div>' +
          '<strong class="fullname">' + myFullName + '</strong>' +
          '<span class="username">' + ' ' + myHandle +  '</span>' +
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
                '<img class="avatar" src="img/alagoon.jpg" data-title="@andrewplan" />' +
                '<img class="avatar" src="img/vklimenko.jpg" data-title="@iliketheletterV" />' +
              '</div>' +
            '</div>' +
            '<!-- BLACK DIAMOND: Make the timestamp below similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery timeago plugin to make them automatic. -->' +
            '<!-- HINT: Refer to timeago documentation -->' +
            '<div class="time">' +
                '<time class="timeago" datetime="' + currentTimeInISO +
                '">' +
                    // currentTime +
                '</time>' +
            '</div>' +
          '</div>' +
          '<div class="reply">' +
            '<img class="avatar" src="img/alagoon.jpg" data-title="@andrewplan" />' +
            '<textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    jQuery("time.timeago").timeago();

    tweetCompose.val('');

  } );

  // The tweet actions (Reply, Retweet, etc) should only show up when you hover over that individual tweet. Otherwise, they should be hidden.
  $( document ).on( 'mouseenter', '.tweet', function() {
      $( this ).find( '.tweet-actions' ).animate( {opacity: 1}, 400, 'linear' );
    } );
  $( document ).on( 'mouseleave', '.tweet', function() {
    $( this ).find( '.tweet-actions' ).animate( {opacity: 0}, 200, 'linear' );
  } );

  // The Retweets/timestamp/Reply areas should also be hidden by default. These should only expand if you click on the tweet. Have the students use a jQuery animation to accomplish the reveal, similar to how it’s done on Twitter.com

  $( document ).on( 'click', '.tweet', function( event ) {
    if ( !$( 'li, this' ).is( event.target ) ) {
      $( this ).find( '.stats, .reply' ).slideToggle();
    }
  } );

  // Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet.
  $( document ).on( 'click', '.tweet-actions li:nth-child(2)' , function() {
    $( this ).parents( '.content' ).find('#retweet-active').fadeToggle();
  } );

  $( document ).on( 'click', '.tweet-actions li:nth-child(3)' , function() {
    $( this ).parents( '.content' ).find('#favorite-active').fadeToggle();
  } );

  // Tweet compose box returns to initial height and controls hide once user clicks outside the box.
  $( document ).mouseup( function (e) {
    if ( !tweetCompose.is( e.target ) && tweetCompose.has( e.target ).length === 0 )
    {
        tweetCompose.css( 'height', '2.5em' );
        tweetControls.hide();
    }
  });

  // Implement the Bootstrap tooltips for when you hover over a user’s avatar image
  $( '.avatar' ).tooltip(
    {
      trigger: 'hover'
      , placement: 'bottom'
    }
  );

  // Persist new tweets using local storage
  // Persist new tweets using a service like parse https://parse.com/


} );
