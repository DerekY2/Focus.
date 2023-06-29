/*Authors: Derek Yu, Hrishi Paripati
 *focus.html - backend; generates random quotes to display on page.
 *  var randomQuote: 
 *    This variable selects a random quote from the quotes array. It generates a random index using Math.random() and multiplies 
 *    it by the length of the quotes array. The Math.floor() function is used to round down the result to the nearest whole number.
 *
 *  generateRandomQuote(): 
 *    This function generates a new random quote. It is called when a click event occurs.
 *    Re-randomizes var randomQuote
 *
 *  updateQuote(): 
 *    This function updates the quote and author displayed in the HTML. It creates HTML strings for the 
 *    quote and author using the randomQuote object and inserts them into the quote-container element.
 *
 *  document.body.addEventListener(): 
 *    This line adds a click event listener to the document.body element. When the page is clicked, it triggers 
 *    the generateRandomQuote() function, which generates a new random quote and updates the HTML on the page accordingly.
 *
*/

var quotes = [{ // Quotes stored here
  quote: "Don't watch the clock; do what it does. Keep going.", // quote 
  author: "Sam Levenson" // quote author
}, {
  quote: "It always seems impossible until it's done.",
  author: "Nelson Mandela"
}, {
  quote: "Problems are not stop signs, they are guidelines.",
  author: "Robert H. Schuller"
}, {
  quote: "If you can dream it, you can do it.",
  author: "Walt Disney"
}, {
  quote: "It does not matter how slowly you go as long as you do not stop.",
  author: "Confucius"
}, {
  quote: "All our dreams can come true if we have the courage to pursue them.",
  author: "Walt Disney"
}, {
  quote: "Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them.",
  author: "Vaibhav Shah"
}, {
  quote: "Opportunities don't happen, you create them.",
  author: "Chris Grosser"
}, {
  quote: "All progress takes place outside the comfort zone.",
  author: "Michael John Bobak"
}, {
  quote: "The only place where success comes before work is in the dictionary.",
  author: "Vidal Sassoon"
}, {
  quote: "The successful warrior is the average man, with laser-like focus.",
  author: "Bruce Lee"
}, {
  quote: "Motivation is what gets you started. Habit is what keeps you going.",
  author: "Jim Ryun"
}, {
  quote: "To be successful you must accept all challenges that come your way. You can't just accept the ones you like.",
  author: "Mike Gafka"
}, {
  quote: "If you don't value your time, neither will others. Stop giving away your time and talents- start charging for it.",
  author: "Kim Garst"
}, {
  quote: "You miss 100% of the shots you don't take.",
  author: "Wayne Gretzky"
}, {
  quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
  author: "Amelia Earhart"
}, {
  quote: "Life is 10% what happens to me and 90% of how I react to it.",
  author: "Charles Swindoll"
}, {
  quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
  author: "Chinese Proverb"
}, {
  quote: "Courage is grace under pressure.",
  author: "Ernest Hemingway"
}, {
  quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  author: "Jim Rohn"
}, {
  quote: "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
  author: "Albert Einstein"
}, {
  quote: "It does not matter how slowly you go, so long as you do not stop.",
  author: "Confucius"
}, {
  quote: "Someone is sitting in the shade today because someone planted a tree a long time ago.",
  author: "Warren Buffett"
}, {
  quote: "You only live once, but if you do it right, once is enough.",
  author: "Mae West"
}, {
  quote: "Opportunities don't happen. You create them.",
  author: "Chris Grosser"
}, {
  quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
  author: "Charles Darwin"
}, {
  quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  author: "Mahatma Gandhi"
}, {
  quote: "The difference between winning and losing is most often not quitting.",
  author: "Walt Disney"
}, {
  quote: "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
  author: "David Brinkley"
}, {
  quote: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
  author: "Henry Ford"
}, {
  quote: "If you're not stubborn, you'll give up on experiments too soon. And if you're not flexible, you'll pound your head against the wall and you won't see a different solution to a problem you're trying to solve.",
  author: "Jeff Bezos"
}, {
  quote: "If you're going through hell, keep going.",
  author: "Winston Churchill"
}, {
  quote: "In order to be irreplaceable one must always be different.",
  author: "Coco Chanel"
}, {
  quote: "What seems to us as bitter trials are often blessings in disguise.",
  author: "Oscar Wilde"
}, {
  quote: "You miss 100 percent of the shots you don't take.",
  author: "Wayne Gretzky"
}, {
  quote: "The way I see it, if you want the rainbow, you gotta put up with the rain.",
  author: "Dolly Parton"
}, {
  quote: "To me, business isn't about wearing suits or pleasing stockholders. It's about being true to yourself, your ideas and focusing on the essentials.",
  author: "Richard Branson"
}, {
  quote: "Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you.",
  author: "Nathaniel Hawthorne"
}, {
  quote: "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
  author: "Neil Armstrong"
}, {
  quote: "I find that the harder I work, the more luck I seem to have.",
  author: "Thomas Jefferson"
}, {
  quote: "Success is the sum of small efforts, repeated day-in and day-out.",
  author: "Robert Collier"
}, {
  quote: "All progress takes place outside the comfort zone.",
  author: "Michael John Bobak"
}, {
  quote: "You may only succeed if you desire succeeding; you may only fail if you do not mind failing.",
  author: "Philippos"
}, {
  quote: "A dream doesn't become reality through magic; it takes sweat, determination, and hard work.",
  author: "Colin Powell"
}, {
  quote: "Only put off until tomorrow what you are willing to die having left undone.",
  author: "Pablo Picasso"
}, {
  quote: "The biggest risk is not taking any risk... In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
  author: "Mark Zuckerberg"
}, {
  quote: "Do one thing every day that scares you.",
  author: "Eleanor Roosevelt"
}, {
  quote: "Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending.",
  author: "Carl Bard"
}, {
  quote: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
  author: "Mark Twain"
}, {
  quote: "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
  author: "Mark Caine"
}, {
  quote: "The successful warrior is the average man, with laser-like focus.",
  author: "Bruce Lee"
}, {
  quote: "Rarely have I seen a situation where doing less than the other guy is a good strategy.",
  author: "Jimmy Spithill"
}, {
  quote: "I avoid looking forward or backward, and try to keep looking upward.",
  author: "Charlotte Bronte"
}, {
  quote: "Life is short, and it is here to be lived.",
  author: "Kate Winslet"
}, {
  quote: "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
  author: "Barack Obama"
}, {
  quote: "It is never too late to be what you might have been.",
  author: "George Eliot"
}, {
  quote: "I don't want to get to the end of my life and find that I lived just the length of it. I want to have lived the width of it as well.",
  author: "Diane Ackerman"
}, {
  quote: "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
  author: "Jim Rohn"
}, {
  quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
  author: "Thomas A. Edison"
}];

// Select a random quote
var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

// Function to generate a new random quote on click
function generateRandomQuote() {
  randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  updateQuote();
}

// Function to update the quote and author in the HTML
function updateQuote() {
  var quoteHTML = '<div class="quote">"' + randomQuote.quote + '"</div>';
  var authorHTML = '<div class="author">- ' + randomQuote.author + '</div>';
  document.getElementById('quote-container').innerHTML = quoteHTML + authorHTML;
}

// Initial quote generation
updateQuote();

// Add click event listener to the document body
document.body.addEventListener('click', generateRandomQuote);