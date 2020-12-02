/**
 * 参考
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 * https://www.jianshu.com/p/ed37f8944e4b
 */
// array.reduce(function(total, currentValue, currentIndex, arr){
// }, initialValue);
// //total 必需。初始值, 或者计算结束后的返回值。
// //currentValue  必需。当前元素
// //currentIndex  可选。当前元素的索引
// //arr   可选。当前元素所属的数组对象。
// //initialValue可选。传递给函数的初始值

// 通过reduce实现map
if(!Array.prototype.customMap) {
  Array.prototype.customMap = function(fn, thisArg) {
    return this.reduce((mapArray, currentArray, index, array) => {
      mapArray[index] = fn.call(thisArg, currentArray, index, array)
      return mapArray
    }, [])
  }
}

[1, 2, 3].customMap(item => item * item) 

// 通过reduce实现filter
if(!Array.prototype.customFilter) {
  Array.prototype.customFilter = function(fn, thisArg) {
    return this.reduce((filterArray, current, index, array) => {
      if(fn.call(thisArg, current, index, array)) {
        filterArray.push(current)
      }
      return filterArray
    }, [])
  }
}

[1, 2, 3].customFilter(item => item !== 2)