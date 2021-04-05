function sumSalary(salaries) {
  let res = 0;
  for( let key in salaries ) {
    if( typeof salaries[key] === 'number' && isFinite(salaries[key]) && !isNaN(salaries[key]) ) {
      res += salaries[key];
    }
  }
  return res;
}
