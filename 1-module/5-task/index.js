function truncate(str, maxlength) {
  let strLength = str.length;
  let isExceedMaxlength = strLength > maxlength;

  if (isExceedMaxlength) {
    let shortenStr = str.slice(0, maxlength - 1);

    return `${shortenStr}…`;
  }

  return str;
}
