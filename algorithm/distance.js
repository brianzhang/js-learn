/**
 * 获取两个方块最短距离JS实现
 * @param {*} rect1 
 * @param {*} rect2 
 * @auth brian.netmad@gmail.com
 */
function distance(rect1, rect2) {
  let min_dist = 0, Dx = 0, Dy = 0;
  let point_r1 = {}, point_r2 = {};

  // 获取两个方块的中心坐标点
  point_r1.x = rect1.x + (rect1.width / 2);
  point_r1.y = rect1.y + (rect1.height / 2);
  point_r2.x = rect2.x + (rect2.width / 2);
  point_r2.y = rect2.y + (rect2.height / 2);
  // 获取两个方块中心点的 X,Y方向的距离
  Dx = Math.abs(point_r2.x - point_r1.x)
  Dy = Math.abs(point_r2.y - point_r1.y);

  // 如果两举行不相交，在X轴方向有部分重合的两个方块，最小距离是上方块的下边线与下方块的上边线之间的距离
  if ((Dx < ((rect1.width + rect2.width) / 2)) && (Dy >= ((rect1.height + rect2.height) / 2))) {
    min_dist = Dy - ((rect1.height + rect2.height) / 2);
    // 两个方块不相交，在Y轴方向有部分重合的两个方块，最小距离是左方块的右边线与右方块的左边线之间的距离
  } else if ((Dx >= ((rect1.width + rect2.width) / 2)) && (Dy - ((rect1.height + rect2.height) / 2))) {
    min_dist = Dx - ((rect1.width + rect2.width) / 2);
    //两个方块不相交，在X，Y轴方向无重合的两个方块，最小距离是距离最近的两个顶点之间的距离
    // 勾股定理，来实现这个计算
  } else if ((Dx >= ((rect1.width + rect2.width) / 2)) && (Dy >= ((rect1.height + rect2.height) / 2))) {
    let delta_x = Dx - ((rect1.width + rect2.width) / 2);
    let delta_y = Dy - ((rect1.height + rect2.height) / 2);
    min_dist = Math.sqrt(delta_x ** 2 + delta_y ** 2);
  } else {
    min_dist = -1;
  }
  return min_dist;
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function runTest(...args) {
  args.length > 0 && args.forEach(function (i) {
    let el = document.createElement('div');
    el.style.width = `${i.width}px`
    el.style.height = `${i.height}px`
    el.style.left = `${i.x}px`
    el.style.top = `${i.y}px`
    el.style.backgroundColor = getRandomColor()
    document.body.appendChild(el);
  })
  let data = distance(...args),
    desc = document.querySelector('#desc');
  desc.innerText = `两个盒子的距离：${data}`;
}