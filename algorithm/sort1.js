// 工具函数
function checkArray(array) {
  return Array.isArray(array)
}
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

// 冒泡排序 [时间复杂度O(n*n), O(n**2)]
function BubbleSort(arr) {
  let len = arr.length; // 初始化长度
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) { //比较j, j两数大小
        swap(arr, j, j + 1)
      }
    }
  }
  return arr;
}
let _testArray = [2, 22, 33, 77, 99, 9, 6, 7, 4, 3, 1, 7];
console.log('test BubbleSort', BubbleSort(_testArray));

//选择排序
function SelectSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let cur = arr[i];
    for (let j = i + i; j < len; j++) {
      if (cur > arr[j]) {
        cur = arr[j];
        swap(arr, i, j);
      }
    }
  }
  return arr;
}
console.log('test BubbleSort', SelectSort(_testArray));
//插入排序
function InsertSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i - 1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j - 1, j);
      }
    }
  }
  return arr;
}

console.log('test InsertSort', InsertSort(_testArray));

function merge(arr) {
  MergeSort(arr, 0, arr.length - 1)
  return arr
}
function MergeSort(arr, left, right) {
  if (left === right) return
  let mid = parseInt(left + ((right - left) >> 1))
  MergeSort(arr, left, mid)
  MergeSort(arr, mid + 1, right)
  let help = [],
    i = 0,
    p1 = left,
    p2 = mid + 1;
  while (p1 <= mid && p2 <= right) {
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  while (p2 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= right) {
    help[i++] = arr[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    arr[left + i] = help[i]
  }
  return arr
}

console.log('test merge', merge(_testArray));

// 快速排序
function QuickSort(arr) {
  if (arr.length <= 1) return arr;
  let one_index = arr.length / 2,
    one_val = arr.splice(one_index, 1)[0];
  const left = []
  const right = []
  arr.forEach(val => {
    if (val < one_val) {
      left.push(val)
    } else {
      right.push(val)
    }
  })
  return QuickSort(left)
    .concat([one_val], QuickSort(right))
}

console.log('test QuickSort', QuickSort(_testArray));

// 截流
function throttle(fn, delay) {
  let status = true,
    timer = null;
  return function (...args) {
    let _this = this;
    if (!status) return;
    status = false;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, ...args);
      status = true;
    }, delay);
  }
}

// 防抖 
// 无status状态，只需检查timer
function debounce(fn, delay) {
  let timer = null;
  return function (...arg) {
    let _this = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn.apply(_this, arg), delay)
  }
}

// 扁平化数组 -flat
let _testArray1 = [
  1, 1, [1, 2, 3, 1, [4, 5, [6, 7, [8, 9]]]]
]
let _str_arr = JSON.stringify(_testArray1)
// # ESS6
let _t1 = _testArray1.flat(Infinity)
console.log('ES6 flat:', _t1)

// replace
_t1 = _str_arr.replace(/(\[|\])/g, '').split(',')
console.log('replace:', _t1)

// 递归处理
function loopFlat() {
  let result = [];
  let fn = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (Array.isArray(item)) {
        fn(arr[i])
      } else {
        result.push(item)
      }
    }
  }
  fn(arguments[0])
  return result
};

console.log('loopFlat', loopFlat(_testArray1))
let _arr = _testArray1;
while (_arr.some(Array.isArray)) {
  _arr = [].concat(..._arr)
}
//数组去重
function distinctArray(arr, type = 'es6') {
  return {
    'es6': () => {
      return Array.from(new Set(arr))
    },
    'includes': () => {
      let result = [];
      for (let i in arr) {
        if (!result.includes(arr[i])) {
          result.push(arr[i])
        }
      }
      return result;
    },
    'indexOf': () => {
      let result = [];
      for (let i in arr) {
        if (result.indexOf(arr[i]) < 0) {
          result.push(arr[i])
        }
      }
      return result;
    },
    'filter': () => {
      let result = [];
      result = arr.filter((i) => {
        return result.includes(i) ? '' : result.push(i)
      })
      return result;
    }
  }[type]()
}
console.log('while', _arr)
console.log('distinctArray ES6', distinctArray(_arr))
console.log('distinctArray includes', distinctArray(_arr, 'includes'))
console.log('distinctArray indexOf', distinctArray(_arr, 'indexOf'))
console.log('distinctArray filter', distinctArray(_arr, 'filter'))

// # SET MAP
const _set_map_arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const _set = new Set();
_set_map_arr1.forEach(i => _set.add(i))
console.log(_set);

const _map = new Map();
var obj = { name: 'Brian', age: 18 }
_map.set(obj, '小布')
console.log(_map.get(obj))
console.log(_map.has(obj))
console.log(_map.delete(obj))
console.log(_map.has(obj))
console.log(_map)

//# 柯里化
function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params]
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      return _curry(this, fn, len, ..._args);
    }
  }
}

console.log('----------------------------------------------------------------')
let _fn = curry(function (a, b, c, d, e, f) {
  console.log(a, b, c, d, e, f);
  console.log(a + b + c + d + e + f);
})

_fn(1, 2, 3, 4, 5, 6)
_fn(1)(2)(3)(4)(5)(8)
// call, apply, bind

Function.prototype.myCall = function (thisArg, ...args) {
  if (!thisArg) { thisArg = window; }
  if (typeof thisArg === 'number') {
    thisArg = new Number(thisArg)
  }
  if (typeof thisArg === 'string') {
    thisArg = new String(thisArg);
  }
  if (typeof thisArg === 'boolean') {
    thisArg = new Boolean(thisArg);
  }
  thisArg.fn = this;
  let result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
}
Function.prototype.myApply = function (thisArg, ...args) {
  this.myCall(thisArg, ...args);
}
Function.prototype.myBind = function (thisArg, ...args) {
  let func = this;
  let fBind = function () {
    let _args = [...args, ...Array.prototype.slice.call(arguments)]
    let context = this instanceof fBind ? this : thisArg;
    return func.apply(context, _args)
  }
  let fNOP = function () { };
  fNOP.prototype = func.prototype;
  fBind.prototype = new fNOP()
  fBind.length = Math.max(0, func.length - args.length)
  return fBind;
}

_fn.myCall(this, 1, 3, 3, 4, 5, 6)

let c = _fn.myBind(this, 1, 77, 3, 4, 5, 6)
c()

console.log(c.length)

// #实现数组解构destructuringArray方法
function descArr1(arr, str) {
  var run = new Function('', `
    const ${str} = ${JSON.stringify(arr)};
    const arr = ${JSON.stringify(str)}.match(/[a-z]+/g);
    const obj = {};
    for(let i of arr) {
      obj[i] = eval(i)
    }
    console.log(obj)
  `)
  run(arr, str);
}

function descArr2(arr, str) {
  var temp = str.replace(/[\[\]]/g, '')
  return new Function(`var ${temp}; ${str}=${JSON.stringify(arr)}; return {${temp}};`)();
}

descArr1([1, [2, 4], 4], '[a, [b, d,e],c]')

console.log('descArr2', descArr2([1, [2, [4]], 3], "[a,[b,[d,e]],c]"))


// # 回文判断
const Paindromes = {
  'reverse': function (str) {
    let reg = /[\W_]/g;
    // \W 表示匹配下划线或者所有非字母非数字中的任意一个
    let newStr = str.replace(reg, '').toLowerCase();
    let reverseStr = newStr.split('').reverse().join('');
    return reverseStr === newStr;
  },
  'loop1': function (str) {
    let reg = /[\W_]/g;
    let newStr = str.replace(reg, '').toLowerCase();
    for (let i = 0, len = Math.floor(newStr.length / 2); i < len; i++) {
      if (newStr[i] !== newStr[newStr.length - 1 - i]) return false;
    }
    return true;
  }
}
console.log('Paindromes reverse', Paindromes['reverse']('madam'))
console.log('Paindromes loop1', Paindromes['loop1']('madamadam'))

// # 发布订阅模式
/**
 * {on, emit, once, removeListener}
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [handler]
    } else {
      this.events[eventName].push(handler)
    }
  }
  emit(eventName) {
    console.log(this.events)
    this.events[eventName] && this.events[eventName].forEach(cb => cb())
  }
  removeListener(eventName, handler) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== handler)
    }
  }
  once(eventName, handler) {
    let fn = () => {
      handler() //调用执行
      this.removeListener(eventName, fn) // 删除注册
    }
    this.on(eventName, fn)
  }
}
// test EventEmitter;
let em = new EventEmitter();
let _runcount = 0;
em.on('run', () => {
  _runcount++;
  console.log("em run", _runcount)
})
em.once('oneceRun', () => {
  console.log('onece Run')
})
function fn1() {
  console.log('call fn1')
}
em.on('fn1', fn1)

let _runTimer = setInterval(() => {
  em.emit('run')
  em.removeListener('fn1', fn1)
  em.emit('fn1')
  em.emit('oneceRun')
  if (_runcount === 5) {
    console.log('run end.')
    clearInterval(_runTimer)
  }
}, 1)

