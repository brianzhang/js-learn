function mySetInterVal(fn, a, b) {
  this.a = a;
  this.b = b;
  this.time = 0;
  this.handle = null;
  this.start = () => {
    this.handle = setTimeout(() => {
      fn()
      this.time++;
      this.start();
      console.log('执行调用中：', this.a + this.time * this.b)
    }, this.a + this.time * this.b)
  }
  this.start()
  this.stop = () => {
    clearTimeout(this.handle)
    this.time = 0;
    console.log('执行已被清理，结束执行')
  }
  return this.stop
}
let clearMy = mySetInterVal(() => console.log('执行开始了'), 1000, 1000)
setTimeout(clearMy, 3000)