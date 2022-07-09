# The JavaScript Arrow Function (ES6)


    
Two factors influenced the introduction of arrow functions: 
- shorter functions
- no existence of `this` keyword.

## Brief Description
- An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.
- available in ES6
- ECMAScript 6 is also known as ES6 and ECMAScript 2015

## What does an arrow function look like?
I simply looks like this:
``` javascript
=>
```
It replaces the `function`.  How so? Like this:

Regular Function
``` javascript
function returnTwo() {
  return 2;
}
```

Arrow Function
``` javascript
var returnTwoWithArrow = () => {
  return 2;
}
```

## Disadvantages? 
There are many different variations of it.  Trying to remember the different variations may be counter productive as
you may visually stumble upon seen them when performing code reviews.
Problems include: so many variations, no name inferencing for anynoymous functions (which make it harder to debug stack traces)
With the regular `function` form, everyone knows since there
is no variation of it.  The reader of your code could visually stumble on it 'why does it need a parenthesis in this case vs ...'
Is the arrow function really so much cleaner that we'd want accept it as a replacement? 
does it take more time to understand? There are downsides to using them.

**TLDR**: You should know about them! and understand them.  They are anonymous (but have name inferencing).

## What are some of the different variations?
### Variation #1 : when there is no parameter...
```javascript
var foo = () => 2;
```

### Variation #2: when there is 1 parameter...
```javascript
var foo = (x) => 2;
```
### Variation #3: when there is 1 parameter...
```javascript
var foo = x => 2;
```

### Variation #4: when using the spread (...) syntax...
```javascript
var foo = (...x) => 3;
```

### But wait, what is the spread syntax?
Here is a quick example:
```javascript
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
```

### But wait, what is `apply`?
'apply' gives us a way to "borrow" a method from one object to use for another (hint: changes `this`)

### If you are wondering what is `call`, because I've seen it when reading about `apply`:
```javascript
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
```

Another example:

`call` just uses values instead of an array.

```javascript
console.log(sum.call(null, 1, 2, 3));

Anyway, back to the topic of Arrow Functions.....

### Variation #5: when using more than 1 parameter  (you need the parenthesis)
```javascript
var foo = (x, y) => 3;
```

### Another variation coming soon?
FYI - headless arrow function is proposed... when you don't have a parameter...
```javascript
var foo = => 3;
```

### Variation #6: when more than one statement, you need `{}`
```javascript
var foo = () => {
  console.log("statement 1");
  console.log("statement 2");
}
```

### You need curly braces? then you need a return inside your block!
```javascript
var foo = () => {
  console.log("statement 1");
  console.log("statement 2");
  return 2; // <------- if you want to return something
}
```

### This means you'll need to do `{}` and type `return` with try/catch blocks
```
var foo = () => {
  try {
    return 3;
  } catch (e) {

  }
}

### Variation #7:
```javascript
var foo = x => { return 3; }
```

### Variation #8: when returning an object literal
```javascript
var foo = x => { y: 2 }; // you cannot do this!

var foo = x => ({ y: 2 }); // you need to do this!

// function name inferencing:
var foo = x => 3;
foo.name; // "foo"

// no name inferencing:
foo(x => 3)
```

### SO, where is the useful case???

Consider this:
```javascript
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    setTimeout(function() {
      console.log(this.year);
    }, 2000);
  }
};

bootcamp.printYear(); // undefined
```

OK, no problem...

Consider this:
```javascript
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
```

### BUT, we CAN do better you say because we learned about bind() and that is part of the language.. 
So you don't need to manage a context variable...

```javascript
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    var self = this;
    setTimeout(function() {
      console.log(this.year);
    }.bind(this), 2000);
  }
};

bootcamp.printYear(); // 2017
```

### WAIT for it... 
**This IS where the arrow function shines!**

```javascript
var bootcamp = {
  year: 2017,
  printYear: function printYear() {
    setTimeout(() => {
      console.log(this.year);
    }, 2000);
  }
};

bootcamp.printYear();
```

## So, what's the big deal?
The short answer is that the syntax is shorter.  Therefore, less to write.
There is one specific use case (covered above) for the arrow function that makes a lot of sense. 
This use case will demonstrate the problem it is trying to solve.  Hint: it has to do with scope..
