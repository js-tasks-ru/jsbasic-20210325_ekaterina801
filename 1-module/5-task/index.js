function truncate(str, maxlength) {
  return (str.length > maxlength) ? str.substr(0, maxlength - 1) + "…" : str;
}

truncate('Вот, что мне хотелось бы сказать на эту тему:', 20) === 'Вот, что мне хотело…';

truncate('Всем привет!', 20) === 'Всем привет!';