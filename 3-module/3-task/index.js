function camelize(str) {
  let newArr = str.split('-');
  for(let i = 1; i <= newArr.length - 1; i++) {
    newArr[i] = newArr[i].slice(0, 1).toUpperCase() + newArr[i].slice(1)
  }
  return newArr.join('');
}
