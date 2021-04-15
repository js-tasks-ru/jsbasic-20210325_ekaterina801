function makeDiagonalRed(table) {

  let rows = table.rows;
  for(let i = 0; i < table.rows.length; i++) {
    rows[i].cells[i].style.background = 'red';
  }
  
}
