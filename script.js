$(function() {
//Array of quotes
  const quotes = [

      `"Tell him to eat a plum."`,
      `"It's pronounced thermometer..."`,
      `"I'm a good dancer, Jerry"`,
      `"I feel like a phoenix...RISING from Arizona!"`,
      `"People on dates shouldn’t even be allowed out in public."`,
      `"When you look annoyed all the time, people think that you’re busy."`,
      `"Three squares? You can’t spare three squares?"`,
      `"Look away, I'm hideous.."`,
      `"You most likely know it as Myanmar, but it will always be Burma to me."`,
      `"When you control the mail, you control...information."`,
      `"I...I GOTTA SIDDOWN!...`,
      `"I'd like to have a kid...'course you have to have a date first..."`,
      `"The best Jerry. The best..."`,
      `"GET! OUT!"`,
      `"It's not a lie if you believe it"`,
      `“Is it possible that I’m not as attractive as I think I am?”`,
      `“Feels like an Arby’s night.”`,
      `"Serenity now, insanity later..."`,
      `"Who told you to put the balm on?"`,
      `"you got the A...the B...the C...........and the D..."`
  
  ]

  const answers = [

      [ "morty", "seinfeld", "morty seinfeld", "jerry's father"],
      ["cosmo", "kramer",  "cosmo kramer", "hipster", "doofus"],
      ["elaine", "benes", "elaine benes", "big head"],
      ["frank", "costanza", "frank costanza", "george's father"],
      ["jerry", "seinfeld", "jerry seinfeld",  "jerome"],
      ["george", "costanza", "george costanza", "georgy-boy", "cantstandya", "bodysuit man"],
      [ "elaine", "benes", "elaine benes", "big head"],
      ["cosmo", "kramer",  "cosmo kramer", "hipster", "doofus"],
      ["j.", "peterman", "j. peterman"],
      ["newman", ""],
      ["poppie", "", "poppy"],
      ["george", "costanza", "george costanza", "georgy-boy", "cantstandya", "bodysuit man"],
      ["kenny", "banya", "kenny banya"],
      ["elaine", "benes", "elaine benes", "big head"],
      ["george", "costanza", "george costanza", "georgy-boy", "cantstandya", "bodysuit man"],
      ["elaine", "benes", "elaine benes", "big head"],
      ["david", "puddy", "david puddy"],
      ["lloyd", "braun", "lloyd braun"],
      ["jackie", "chiles", "jackie chiles"],
      ["frank", "costanza", "frank costanza", "george's father"],
      
  ]
  
  // declaring variables needed
  let counter;
  let clock;
  let indexNumber;
  let nameCapitalized; 
  const $timer = $('#timer');
  const $getQuote = $('#quote');
  const $guess = $('#guess');
  

  //ensuring everything resets on page refresh
  $getQuote.focus(); 
  $guess.val('');

//EVENT LISTENER #1 : GET QUOTE.
  $getQuote.on('click', function() {
    //show and focus the getQuote button
    $('.banner').removeClass('vanish');
    //quote generator
    indexNumber =  Math.floor(Math.random() * quotes.length);

    // display quote on the screen
    $('.display-quote').removeClass('vanish').text(quotes[indexNumber]);
    $('div.right-wrong').html(''); 
    
    $('form').removeClass('vanish'); // making sure form is visible
    $guess.focus(); // focuses the text area
    
    clearInterval(clock); // clears the timer on every click, makes it accurate
    counter = 30; // sets timer to 30

    //calling the timer function to run every second
    countDown();
    clock = setInterval(countDown, 1000); 

  });

//EVENT LISTENER #2 : SUBMIT FORM
  $('form').on('submit', function(event) {

    event.preventDefault(); // stopping page from refreshing on submit

    //users guess gets converted to lowercase and stored in guess
    let guess = $guess.val().toLowerCase(); 

    //if it's correct
    if (answers[indexNumber].includes(guess)) {
      //capitalize function 
      capitalize(answers[indexNumber]);
      //storing new html string in a variable
      const congrats = 
      `<span>yeah, ${nameCapitalized}'s right...</span>
        <img 
        src="./assets/puddy.png" 
        alt="david puddy saying you've answered correctly"
        >`
      //adding html to div to congratulate the user
      $('div.right-wrong').html(`${congrats}`);
      
      // clear the clock, "hide" the timer and the quote.
      clearInterval(clock); 
      $('.display-quote').addClass('vanish'); // hide from view 
      $timer.addClass('vanish'); // remove timer from page
      $(this).addClass('vanish'); //remove form from page

      $guess.val(''); // empty the input 
      $getQuote.removeClass('vanish').focus();  //makes the button visible and focussed if user answer wrong first.

    } else { // if it's incorrect

    //print try again message
      const nopeGif = `<span>VERY VERY BAD! Try again!</span><img src="./assets/babu.gif">`;
      $('div.right-wrong').html(`${nopeGif}`);

      //make banner and button disappear
      $('.banner').addClass('vanish'); // remove from page
      $getQuote.addClass('vanish'); // remove from page
  
      //clear the input field
      $guess.val('');

      }
  });

  //EVENT LISTENER #3 :
  // gets rid of babu.gif when something is typed
  //adds the logo in it's place
    $guess.keypress(function() {
    $('div.right-wrong').html(``); // clears the "incorrect" message
    $('.banner').removeClass('vanish'); //brings logo back
  });

  // timer as a seperate function to make it start immediately once the quoteButton is clicked (other wise it counted a second before it began)
  function countDown() {
    $timer.text(`${counter}`); // show timer
    $timer.addClass(`timer-styles`).removeClass('shame vanish ten-secs-left'); 
    counter--;

    if (counter < 10) {
      $timer.addClass('ten-secs-left'); // add animation to timer at 10s mark
    }

    if (counter < 0) { //show 'thats a shame' message and correct answer
      $timer.addClass('shame').removeClass('ten-secs-left').text(`"That's a shame"`); 
      let answer = capitalize(answers[indexNumber]);
      $('p.display-quote').text(`Answer: ${answer}`);
      // console.log(answer);
      $getQuote.removeClass('vanish').focus(); // bring back and re-focus getQuote
      clearInterval(clock);
    }
  }
//capitalize name of correct answer
  function capitalize(answerArray) {
    //capitalizing the correct name
    let firstName = answerArray[0];
    let lastName = answerArray[1];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    nameCapitalized = `${firstName} ${lastName}`;
    if (lastName === "") {
      nameCapitalized = `${firstName}`;
    }
    return nameCapitalized;
  }
});
  