#  helper

## expand

Expand the system base type function

- Number

> padLeft

```js
Number(1).padLeft(3) => "001" 
Number(123).padLeft(2) => "23"
```

- String 

> firstUpperCase

```js
'people'.firstUpperCase => People
```

> firstLowerCase

```js
'People'.firstLowerCase => people
```

> label

```js
"http://{0}/{1}".label("www.cmpp.com", "index.html")
=> "http://www.cmpp.com/index.html"
```

> replaceAll(reallyDo, replaceWith, ignoreCase)

 * @reallyDo (String | RegExp)  A string that is replaced
 * @replaceWidth (String)   Replace the string
 * @ignoreCase (Boolean) Whether or not case is ignored

```js
var str = "xxxXxxx";

console.log(str.replaceAll("x", 'a')); //print aaaXaaa
console.log(str.replaceAll("x", "a", true)); //print aaaaaaa
```

- Array

> isRepeat

- Object

> merge

merge two object property 

```js
var a = { foo: 'foo',name:'a'}
, b = { bar: 'bar',name:'b' };

a.merge(b);
// => { foo: 'foo', bar: 'bar',name:'b' }
```

==Notice==  
Object.assign has the similar features

> trim

clean up empty attributes

```js
var o = {
    person: {
        id: null,
        name: 'pauly',
        age: 10
    },
    info: 'information',
    work: {
        love: null,
        year: 5,
        do: {
            fire: 'fire',
            gun: null
        }
    },
    mall: {
        book: null
    }
}

o.trim();

=>
{
    person: {
        name: "pauly",
        age: 10
    },
    info: "information",
    work: {
        year: 5,
        do: {
            fire: "fire"
        }
    }
}
```

- Function

> partial 

similar the Function.bind, only the order of the parameters are different

```js
function showArg(){
    console.log(arguments)
}; 

showArg.bind(null,1,2,3)(4,5) 
//print 1,2,3,4,5

showArg.partial(null,1,2,3)(4,5)
//print 4,5,1,2,3
```

- Promise

> wrap(done)

 * @done (Function)  The done function  
 wrap the result {error,value}

```js
async function show() {
    var res = await new Promise((resolve, reject) => {
        reject('error');
    }).wrap();

    console.log(res); //=> {error:'error'}
}

show();
```

## type

> name

```js
console.log(type.name(123)); //print Number
```

> is${Type} : isString,isNumber,isBoolean ... 

```js
type.isAsyncFunction(async function(){}) //=> true
```

