/**
 * Promise
 * @param {*} fn 
 * 实现思路
 * 定义状态
 * 定义返回接收value
 * 定义返回接收reason
 * 定义成功回调函数集
 * 定义失败回调函数集
 */
function MyPromise(fn) {

  this.status = 'pinding'
  this.value = null;
  this.reason = null;
  this.newPromise = null;
  this.resolvedCallback = [];
  this.rejectedCallback = [];

  function resolve(...args) {
    if (this.status === 'pinding') {
      this.status = 'success';
      this.value = args;
      this.resolvedCallback.forEach(fn => fn())
    }
  }
  function reject(...args) {
    if (this.status === 'pinding') {
      this.status = 'fail';
      this.reason = args;
      this.rejectedCallback.forEach(fn => fn())
    }
  }

  try {
    fn(resolve.bind(this), reject.bind(this))
  } catch (e) {
    reject.call(this, e)
  }
}

MyPromise.prototype = {
  constructor: MyPromise,
  then: function (resolve, reject) {
    resolve = typeof resolve === "function" ? resolve : value => value;
    reject = typeof reject === "function" ? reject : error => { throw Error(error) };
    let _this = this;
    // console.log(reject, resolve)
    this.newPromise = new MyPromise(function (res, rej) {
      if (_this.status === 'success') {
        try {
          _this.resolvePromise(_this.newPromise, resolve(..._this.value), res, rej)
        } catch (e) {
          reject(e)
        }
      } else if (_this.status === 'fail') {
        try {
          if (reject) {
            _this.resolvePromise(_this.newPromise, reject(..._this.value), res, rej);
            return
          }
          _this.resolvePromise(_this.newPromise, reject(..._this.reason), res, rej);
        } catch (e) {
          reject(e)
        }
      } else {
        _this.resolvedCallback.push(() => {
          _this.resolvePromise(_this.newPromise, resolve(..._this.value), res, rej)
        })
        _this.rejectedCallback.push(() => {
          _this.resolvePromise(_this.newPromise, reject(..._this.reason), res, rej)
        })
      }
    })

    return this.newPromise;
  },
  resolvePromise: function (promise, value, resolve, reject) {
    if (promise === value) {
      reject(new TypeError('Promise 引发循环引用'))
    }
    if (value != null && typeof value === 'object' || typeof value === 'function') {
      try {
        let then = value.then
        if (typeof then === 'function') {
          then.call(value, y => { resolve(y) }, x => { reject(x) })
        }
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(value)
    }
  },
  catch: function (fn) {
    this.status = 'error';
    return this.then(null, fn)
  }
};


_pms = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('哈哈，调用到了我了')
  }, 3000)
})
_pms.then((resp) => {
  console.log('执行了嘛？')
  console.log(resp)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject('嘿嘿，第二次')
    }, 1000)
  })
}).then((resp2) => {
  console.log(resp2)
}).catch(error => {
  console.log(error)
})