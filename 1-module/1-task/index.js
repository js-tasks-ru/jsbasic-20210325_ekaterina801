function factorial(n) {
  let result = 1;
  if(n === 0 || n === 1) return 1;
  for( let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

factorial(0); // 1
factorial(1); // 1
factorial(3); // 6
factorial(5); // 120
