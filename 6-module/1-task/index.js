/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor (rows) {
    this.elem = rows; 
  }
  get elem() {
    return this._elem;
  }
  set elem(value) {
    if (!this._elem) {
      this._elem = document.createElement('TABLE');
    }
    this._elem.addEventListener('click', event => {
      this.onButtonClick(event);
    });
    //this.template = '';
    this.template += `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `;

    for(const {name, age,salary,city} of value) {
      this.template += `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button>X</button></td>
        </tr>
      `
    }
    this._elem.insertAdjacentHTML('beforeend', this.template);
  }
  onButtonClick(event) {
    if (!event.target.closest('button')) return;
    event.target.closest('button').closest('tr').remove();
  }
}