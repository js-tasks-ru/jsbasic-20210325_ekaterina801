function showSalary(users, age) {
  let str = '';
  
  let newArr = users.filter(item => {
    if(item.age <= age) {
      return item
    }
  }).map(item1 => {
    return `${item1.name}, ${item1.balance}`
  })
  
  for(let i = 0; i < newArr.length; i++) {
      str += `${newArr[i]}`;
      if (i !== newArr.length - 1) {
        str += '\n'
      }
  }
  return str;
}
