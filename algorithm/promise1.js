function Promise1(fn) {
  this.status = 'pending';
  this.value = null;
  this.reason = null;
  this.callbackList = [];
  this.$$promise = null;
  function resolve(...args) {
    if (this.status === 'pending') {
      this.status = 'success';
      this.value = args
      console.log(args)
      this.callbackList.forEach(({ resolve }) => resolve())
    }
  }
  function reject(...err) {
    if (this.status === 'fail') {
      this.status = 'fail';
      this.reason = err
      this.callbackList.forEach(({ reject }) => reject())
    }
  }
  try {
    fn(resolve.bind(this), reject.bind(this));
  } catch (e) {
    reject(e)
  }
}

Promise1.prototype = {
  constructor: Promise1,
  then: function (resolve, reject) {
    resolve = typeof resolve === "function" ? resolve : value => value;
    reject = typeof reject === "function" ? reject : error => { throw Error(error) };
    let _this = this;
    this.$$promise = new Promise1((res, rej) => {
      if (_this.status === 'success') {
        _this.resolvePromise(_this.$$promise, resolve(..._this.value), res, rej)
      } else if (_this.status === 'fail') {
        _this.resolvePromise(_this.$$promise, reject(..._this.value), res, rej)
      } else {
        _this.callbackList.push({
          resolve: () => {
            _this.resolvePromise(_this.$$promise, resolve(..._this.value), res, rej)
          },
          reject: () => {
            _this.resolvePromise(_this.$$promise, reject(..._this.value), res, rej)
          }
        })
      }
    })
    return this.$$promise;
    /*
    if (this.status === 'success') {
      resolve(...this.value)
    } else if (this.status === 'fail') {
      reject(...this.reason)
    } else {
      this.callbackList.push({
        resolve: () => resolve(...this.value),
        reject: () => reject(...this.reason),
      })
    }*/
  },
  resolvePromise: function (promise, value, resolve, reject) {
    if (promise === value) {
      reject(new Error('Promise 引发重复引用'))
    }
    if (value !== null || typeof value === 'function' || typeof value === 'object') {
      try {
        let then = value.then;
        console.log(then, value)
        if (typeof then === 'function') {
          then.call(value, r => resolve(r), e => reject(e));
        }
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(value)
    }
  }
}

let _pms = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve('哈哈，调用到了我了')
  }, 3000)
})
_pms.then((resp) => {
  console.log('执行了嘛？')
  console.log(resp)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第二次调用了！！')
    }, 3000)
  })
}).then(resp => {
  console.log(resp)
});