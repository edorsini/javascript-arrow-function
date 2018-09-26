/*
Arrow Function
available in ES6
ECMAScript 6 is also known as ES6 and ECMAScript 2015
 */


/*    
    What is it?
    
    => (aka the fat arrow)
    
    replaces the `function`

    How so?
    
*/

// Regular Function
function returnTwo() {
  return 2;
}

// Arrow Function
var returnTwoWithArrow = () => {
  return 2;
}

/*
    What is considered the big deal with this? 

    The short answer is that the syntax is shorter.  Therefore, less to write.
    There is one specific use case (covered later below) for the arrow function that makes a lot of sense. 
    This use case will demonstrate the problem it is trying to solve.  Hint: it has to do with scope..

 */

/*
    What are the problems with using the arrow function?

    There are many different variations of it.  Trying to remember the different variations may be counter productive as
    you may visually stumble upon seen them when performing code reviews.

    Problems include: so many variations, no name inferencing for anynoymous functions (which make it harder to debug stack traces)

    With the regular `function` form, everyone knows since there
    is no variation of it.  The reader of your code could visually stumble on it 'why does it need a parenthesis in this case vs ...'

    Is the arrow function really so much cleaner that we'd want accept it as a replacement? 
    does it take more time to understand? There are downsides to using them.

    TLDR: You should know about them! and understand them.  They are anonymous (but have name inferencing).
*/

/*
   Some variations include:
 */


// VARIATION #1: when there no parameter...
var foo = () => 2;

// VARIATION #2: when there is 1 parameter...
var foo = (x) => 2;

// VARIATION #3: when there is 1 parameter...
var foo = x => 2;

// VARIATION #4: when using the spread syntax
var foo = (...x) => 3;

// but wait, what is the spread syntax?
// quick example:

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

const more_numbers = [...numbers, 4, 5, 6];

console.log(more_numbers);
// expected output: [1, 2, 3, 4, 5, 6]

// This also gets the same thing...
console.log(sum.apply(null, numbers));
// expected output: 6 

// but wait, what is "apply"?
// 'apply' gives us a way to "borrow" a method from one object to use for another (hint: changes 'this')

// Example:
var bootcamp = {
  title: "Full Stack Developer Bootcamp",
  describe: function() {
    console.log(this.title);
  }
};

// Outputs: "Full Stack Developer Bootcamp"
bootcamp.describe();

var ed = {
  title: "Learning How To Learn Bootcamp"
};

// Outputs: "Learning How To Learn Bootcamp"
bootcamp.describe.call(ed);

// If you are wondering what is "call", because I've seen it when reading about "apply":
// Example:

// It just uses values instead of an array
console.log(sum.call(null, 1, 2, 3));


// Anyway, back to the topic of Arrow Functions.....

// VARIATION #5: when using more than 1 parameter  (you need the parenthesis)
var foo = (x, y) => 3;

// another variation coming soon?
// FYI - headless arrow function is proposed... when you don't have a parameter...
var foo = => 3;

// VARIATION #6: when more than one statement, you need {}
var foo = () => {
  console.log("statement 1");
  console.log("statement 2");
}

// you need curly braces? then you need a return inside your block!
var foo = () => {
  console.log("statement 1");
  console.log("statement 2");
  return 2; // <------- if you want to return something
}

// This means you'll need to do `{}` and type `return` with try/catch blocks
var foo = () => {
  try {
    return 3;
  } catch (e) {

  }
}

// VARIATION #7
var foo = x => { return 3; }

// VARIATION #8: when returning an object literal
var foo = x => { y: 2 }; // you cannot do this!

var foo = x => ({ y: 2 }); // you need to do this!

// function name inferencing:
var foo = x => 3;
foo.name; // "foo"

// no name inferencing:
foo(x => 3)

// SO, where is the useful case???

// consider this:
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    setTimeout(function() {
      console.log(this.year);
    }, 2000);
  }
};

bootcamp.printYear(); // undefined

// OK, no problem...

// consider this:
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    var self = this;
    setTimeout(function() {
      console.log(self.year);
    }, 2000);
  }
};

bootcamp.printYear(); // 2017

// BUT, we CAN do better you say because we learned about bind() and that is part of the language.. 
// so you don't need to manage a context variable...
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    var self = this;
    setTimeout(function() {
      console.log(self.year);
    }.bind(this), 2000);
  }
};

bootcamp.printYear(); // 2017

// WAIT for it... 
// This IS where the arrow function shines!
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    setTimeout(() => {
      console.log(this.year);
    }, 2000);
  }
};

bootcamp.printYear();