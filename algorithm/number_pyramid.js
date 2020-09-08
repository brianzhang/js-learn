function pyramid() {
  let row = 9,
    num1 = 8,
    start_num = 0;
  for (let i = 1; i <= row; i++) {
    start_num = `${start_num}${i}`
    start_num = Number(start_num)
    console.log(`${new Array(row - i).fill(' ').join('')}${start_num} * ${num1} + ${i} = ${start_num * num1 + i}`)
  }
}
pyramid()