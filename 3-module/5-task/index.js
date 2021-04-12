function getMinMax(str) {
  let arr1 = str.split(' ').join().split(',');;
	let arr2 = [];

  for (let i = 0; i <= arr1.length; i++) {
    if(parseFloat(arr1[i])) {
      arr2.push(parseFloat(arr1[i]));
    }
  }
  return {
  	min: Math.min.apply(null, arr2),
    max: Math.max.apply(null, arr2)
  }
}
