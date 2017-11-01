/**
 * @author pzhang
 * @version v1.0.0
 * @desc 扩充系统类型的处理方法
 */

/************************************************************
 * @type  Number
 ***********************************************************/


/**
 * @param {Number} n   输出数值长度
 * @return {String} 
 *   
 * Number(1).padLeft(3) => "001" 
 * Number(123).padLeft(2) => "23"
 */
Number.prototype.padLeft = function (n) {
    return (Array(n).join(0) + this.valueOf()).slice(-n);
}



/************************************************************
 * @type  string
 ***********************************************************/

/**
 * 首字母大写
 * 
 * 'people'.firstUpperCase => People
 * 
 */
String.prototype.firstUpperCase = function () {
    // replacer:function($0, $1, $2) //$0 this, [$1,$2] = this
    return this.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return $1.toUpperCase() + $2;
    });
}

/**
 * 首字母小写
 * 
 * 'People'.firstLowerCase => people
 * 
 */
String.prototype.firstLowerCase = function () {
    // replacer:function($0, $1, $2) //$0 this, [$1,$2] = this
    return this.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return $1.toLowerCase() + $2;
    });
}


/**
 *  字符占位标签
 * 
 * var info = "http://{0}/{1}".label("www.cmpp.com", "index.html");
 * //=> info = "http://www.cmpp.com/index.html";
 */
String.prototype.label = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return s;
};


/**
 * 全局替换
 * 
 * @reallyDo (String | RegExp)代表被替换的字符串
 * @replaceWidth (String)代表替换的字符串
 * @ignoreCase (Boolean)为是否忽略大小写
 *  
    eg:
    var a = "xxxXxxx";

    console.log(a.replaceAll("x", 'a')); //输出 aaaXaaa
    console.log(a.replaceAll("x", "a", true)); //输出 aaaaaaa
 */
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}


/************************************************************
 * @type  Array
 ***********************************************************/

Array.prototype.isRepeat = function () {
    var hash = {};
    for (var i in this) {
        if (hash[this[i]])
            return true;
        hash[this[i]] = true;
    }
    return false;
};

/************************************************************
 * @type  Object
 ***********************************************************/

/**
 * 两者对象成员属性 合并 (Object.assign 已实现该功能)
 *
 *     var a = { foo: 'foo',name:'a'}
 *       , b = { bar: 'bar',name:'b' };
 *
 *     a.merge(b);
 *     // => { foo: 'foo', bar: 'bar',name:'b' }
 *
 * @param {Object} o
 */
Object.prototype.merge = function (o) {
    if (this && o) {
        for (var key in o) {
            this[key] = o[key];
        }
    }
}

/**
 * 清理值为空或者undefined的对象属性
 * 
   eg:  var o = {
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

    result: {
        "person": {
            "name": "pauly",
            "age": 10
        },
        "info": "information",
        "work": {
            "year": 5,
            "do": {
                "fire": "fire"
            }
    }
 * 
 */
Object.prototype.trim = function () {
    for (let [key, value] of Object.entries(this)) {
        if (value == null) {
            delete this[key];
        } else if (typeof value === 'object') {
            this[key].trim();
        }
        if (value && typeof value === 'object' && !Object.entries(value).length) delete this[key];
    }
    return this;
}


/**
 * 设置Object 特征
 * 
 * 自定义方法: 
 * merge  trim  不可遍历
 */
Object.defineProperties(Object.prototype, {
    merge: { enumerable: false },
    trim: { enumerable: false }
});


/************************************************************
 * @type  Function
 ***********************************************************/

/**
 * partial 类似 bind函数 (partial: 局部)
 * 
 * @param thisArg 函数执行的作用域
 * 
 * 区别于bind, partial将函数实参传递到左侧
 * fn.bind(this,...arg1)(...arg2) <===> fn.call(this,...arg1,...arg2);
 * fn.partial(this,...arg1)(...arg2)  <==> fn.call(this,...arg2,...arg1);
 * eg:
   
   function showArg(){console.log(arguments)}; 
   showArg.bind(this,1,2,3)(4,5) //输出 1,2,3,4,5
   showArg.partial(this,1,2,3)(4,5) //输出 4,5,1,2,3
 * 
 */
Function.prototype.partial = function (thisArg) {
    var args = Array.prototype.slice.call(arguments, 1),
        self = this;
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = innerArgs.concat(args);
        return self.apply(thisArg, finalArgs);
    };
};

/************************************************************
 * @type  promise
 ***********************************************************/

/**
 * 包裹方法
 *     # 执行最后处理方法 cb
 *     # 封装结果        {err,vlaue}
 * 
 * @param {Function} done 执行函数 
 */
Promise.prototype.wrap = function (done) {
    done = done || function () { };
    var P = this.constructor;
    return this.then(
        value => P.resolve(done()).then(() => { return { value: value } }),
        reason => P.resolve(done()).then(() => { return { err: reason } })
    );
}
