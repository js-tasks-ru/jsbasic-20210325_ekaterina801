function ucFirst(str) {
  if(!str) return str;
  let newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
}

ucFirst('вася');
ucFirst('в');
ucFirst('');
