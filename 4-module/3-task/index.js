function highlight(table) {

  let rows = table.rows;

  for(let i = 0; i < rows.length; i++) {

    for(let j = 0; j <= 3; j++) {
      if(rows[i].cells[j].textContent === 'm') {
        rows[i].classList.add('male')
      }
      if(rows[i].cells[j].textContent === 'f') {
        rows[i].classList.add('female')
      }
      if(rows[i].cells[j].textContent < 18) {
        rows[i].setAttribute('style', "text-decoration: line-through");
      }
      if(rows[i].cells[j].dataset.available === "true") {
        rows[i].classList.add('available');
      } else if (rows[i].cells[3].dataset.available === "false") {
        rows[i].classList.add('unavailable');
      }
      if(!rows[i].cells[3].hasAttribute('data-available')) {
        rows[i].setAttribute('hidden', 'true');
      }
    }
  }
  return table;
}