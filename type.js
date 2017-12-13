/**
 * @author pzhang
 * @version v1.0.0
 * @desc 类型
 */

/**
 * 变量类型
 * 
 * String Number Boolean Array Function Symbol Promise Object Null Undefined
 */

var types = {
    name(o) {
        return Object.prototype.toString.call(o).slice(8, -1);
    }
};


/**
 * 类型判断
 * 
 * eg:
 * 
 * types.isAsyncFunction(async function(){}) ==> true
 * 
 */
[
    'String',
    'Number',
    'Boolean',
    'Array',
    'Object',
    'RegExp',
    'Function',
    'AsyncFunction',
    'Symbol',
    'Promise',
    'Null',
    'Undefined'
].forEach(function (ele) {
    types['is' + ele] = function (o) {
        return types.name(o) === ele;
    }
});

module.exports = types;