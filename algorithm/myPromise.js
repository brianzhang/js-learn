function myPromise(fn) {
  let _this = this;
  this.error = null;
  this.result = null;
  this.failCallback = null;
  this.$$status = 'pending';
  this.successCallback = null;

  setTimeout(_ => {
    try {
      fn(_this.onResolve.bind(_this), _this.onReject.bind(_this));
    } catch (e) {
      console.log(e)
      _this.error = e
      if (_this.callBackDefer && _this.callBackDefer.fail) {
        _this.callBackDefer.fail(e)
      } else if (_this._catch) {
        _this._catch(e)
      } else {
        throw new Error('Error catch')
      }
    }
  })

  // let _this = this;
  // function resolve(value) {
  //   if (_this.$$status === 'pending') {
  //     _this.$$status = 'success';
  //     _this.successCallback(value)
  //   }
  // }
  // function reject(reason) {
  //   if (_this.$$status === 'pending') {
  //     _this.$$status = 'fail';
  //     _this.failCallback(reason)
  //   }
  // }
}
myPromise.prototype = {
  constructor: myPromise,
  onResolve: function (params) {
    if (this.$$status === 'pending') {
      this.$$status = 'success';
      this.resolve(params);
    }
  },
  onReject: function (reason) {
    if (this.$$status === 'pending') {
      this.$$status = 'fail';
      this.reject(reason);
    }
  },
  resolve: function (params) {
    let _this = this,
      successCallback = this.successCallback;
    if (successCallback) {
      _this.defer(successCallback.bind(_this, params));
    }
  },
  reject: function (reason) {
    let _this = this,
      _catch = this._catch,
      failCallback = this.failCallback;
    _this.error = reason;

    if (failCallback) {
      _this.defer(failCallback.bind(_this, reason))
    } else if (_catch) {
      _catch(_this.error)
    } else {
      setTimeout(_ => { throw new Error('Reject ERROR PROMISE') })
    }
  },
  then: function (success = () => { }, fail) {
    let _this = this;
    let resetFail = e => e;
    if (fail) {
      resetFail = fall;
      _this.catchErrorFunc = true
    }
    let newProm = new myPromise(_ => { });
    _this.callBackDefer = {
      success: newProm.onReject.bind(newProm),
      fail: newProm.onReject.bind(newProm)
    };
    _this.successCallback = success;
    _this.failCallback = fail;
    return newProm;
  },
  defer: function (callback) {
    let _this = this,
      result = null,
      defer = this.callBackDefer.success;
    if (_this.$$status === 'fail' && !_this.catchErrorFunc) {
      defer = _this.callBackDefer.fail;
    }
    try {
      result = callback();
    } catch (e) {
      result = e;
      defer = _this.callBackDefer.fail;
    }
    if (result && result instanceof myPromise) {
      result.then(_this.callBackDefer.success, _this.callBackDefer.fail)
      return ''
    }
    defer(result)
  },
  catch: function (catchCallback) {
    this._catch = catchCallback
  }
}
// myPromise.prototype.resolve = function (params) {
//   let _this = this;
//   if (_this.$$status === 'pending') {
//     _this.$$status = 'success';
//     if (!_this.successCallback) return;
//     let result = _this.successCallback(params);
//     if (result && result instanceof myPromise) {
//       result.then(_this.successDefer, _this.failDefer)
//     }
//     _this.successDefer(result);
//   }
// }
// myPromise.prototype.reject = function (reason) {
//   let _this = this;
//   if (_this.$$status === 'pending') {
//     _this.$$status = 'fail';
//     if (!_this.successCallback) return;
//     let result = _this.failCallback(params);
//     if (result && result instance myPromise) {
//       result.then(_this.successDefer, _this.failDefer)
//     }
//     _this.failDefer(reason)
//   }
// }

// myPromise.prototype.then = function (full, fail) {
//   this.failCallback = fail;
//   this.successCallback = full;
// }
// myPromise.prototype.catch = function (error) {
//   this.error = error
// }
new myPromise(function (res, rej) {
  setTimeout(_ => res('成功'), 500)
}).then(res => {
  console.log(res)
  return '第一个成功了.then'
}).catch(e => console.log(e))

function p(fn) {
  this.status = 'pending'
  this.failfn = null;
  this.successfn = null;
  fn(resolve.bind(this), reject.bind(this))
  function resolve(params) {
    if (this.status === 'pending') {
      this.status = 'success'
      this.successfn(params)
    }
  }
  function reject(params) {
    if (this.status === 'pending') {
      this.status = 'fail'
      this.failfn(params)
    }
  }
}
p.prototype.then = function (full, fail) {
  this.successfn = full
  this.failfn = fail
}

new p(function (res, rej) {
  setTimeout(() => res('成功啦！'), 3000)
}).then(res => console.log('成功了', res), fail => console.log('失败了', fail))