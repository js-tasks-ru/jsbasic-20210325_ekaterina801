import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = product;
  }
  get elem() {
    return this._elem;
  }
  set elem(value) {  
    if (!this._elem) {
      this._elem = document.createElement('DIV');
      this._elem.className = 'card';
    }
    
    this.template = `
      <div class="card__top">
          <img src="/assets/images/products/${value.image}" class="card__image" alt="product">
          <span class="card__price">€${value.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${value.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
    `;
    this._elem.insertAdjacentHTML('beforeend', this.template);

    this._elem.addEventListener('click', (event) => {
      if (!event.target.closest('button.card__button')) return;
      const ev = new CustomEvent('product-add', {
        detail: value.id,
        bubbles: true,
      });
      this._elem.dispatchEvent(ev);
    });
  }
}