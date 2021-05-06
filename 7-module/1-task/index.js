import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.elem = categories;
  }
  get elem() {
    return this._elem;
  }
  set elem(value) {
    if (!this._elem) {
      this._elem = document.createElement('DIV');
      this._elem.className = 'ribbon';
      this.innerElem = document.createElement('NAV');
      this.innerElem.className = 'ribbon__inner';
      this._elem.addEventListener('click', event => {
        this.onClick(event);
      });
    }
    this.template = '';
    this.templateBtn = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
    this._elem.insertAdjacentHTML('beforeend', this.templateBtn);
    for (const { name, id } of value) {
      this.template += `
        <a href="#" class="ribbon__item" data-id=${id}>${name}</a>
      `;
    }
    this.innerElem.insertAdjacentHTML('beforeend', this.template);
    this._elem.append( this.innerElem);
  }

  onClick(event) {
    //Event on click arrows for slider
    let left = document.querySelector('.ribbon__arrow_left');
    let right = document.querySelector('.ribbon__arrow_right');
    let ribbonInner = document.querySelector('.ribbon__inner');
    
    if (event.target.closest('.ribbon__arrow_right')) {
      ribbonInner.scrollBy(350, 0);
      ribbonInner.addEventListener('scroll', () => {
        let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
        if( ribbonInner.scrollLeft > 1) {
          left.classList.add('ribbon__arrow_visible');
        }
        if( scrollRight < 1) {
          right.classList.remove('ribbon__arrow_visible');
          left.classList.add('ribbon__arrow_visible');
        };
      })
      
    } 
    if (event.target.closest('.ribbon__arrow_left')) {
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      ribbonInner.scrollBy(-350, 0);
      ribbonInner.addEventListener('scroll', () => {
        if( ribbonInner.scrollLeft === 0) {
          right.classList.add('ribbon__arrow_visible');
          left.classList.remove('ribbon__arrow_visible');
        }
        if( scrollRight < 1) {
          right.classList.add('ribbon__arrow_visible');
        }
      })
      
    }
    // Click in item of menu for highlight
    let itemMenu = document.querySelectorAll('.ribbon__item');
    if(event.target.classList.contains('ribbon__item')) {
      event.preventDefault();
      for(let elem of itemMenu) {
          elem.classList.remove('ribbon__item_active');
      }
      // Adding CustomEvent for name of item
      event.target.classList.add('ribbon__item_active');
      const ev = new CustomEvent('ribbon-select', { 
        detail: event.target.dataset.id !== '' ? event.target.dataset.id : 'all', 
        bubbles: true 
      });
      this._elem.dispatchEvent(ev);
    }
  }
}