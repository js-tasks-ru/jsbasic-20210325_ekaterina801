function checkSpam(str) {
  let strNew = str.toLowerCase();
  return (strNew.includes('1xbet') || strNew.includes('xxx')) ? true : false;
}

checkSpam('1XbeT now');
checkSpam('free xxxxx');
checkSpam('innocent rabbit');