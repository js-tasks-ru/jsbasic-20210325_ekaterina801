import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.elem = slides;
  }
  get elem() {
    return this._elem;
  }
  set elem(value) {  
    if (!this._elem) {
      this._elem = document.createElement('DIV');
      this._elem.className = 'carousel';
      this.innerElem = document.createElement('DIV');
      this.innerElem.className = 'carousel__inner';
      this._elem.addEventListener('click', event => {
        this.onClick(event);
      });
    }
    this.template = '';
    this.templateBtn = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none;">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;
    this._elem.insertAdjacentHTML('beforeend', this.templateBtn);
    for (const { name, price, image, id } of value) {
      this.template += `
          <div class="carousel__slide" data-id=${id}>
              <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                  <span class="carousel__price">€${price.toFixed(2)}</span>
                  <div class="carousel__title">${name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
              </div>
          </div>
      `;
    }
    this.innerElem.insertAdjacentHTML('beforeend', this.template);
    this._elem.append( this.innerElem);
  }

  onClick(event) {
    //Event on click arrows for slider
    let left = document.querySelector('.carousel__arrow_left');
    let right = document.querySelector('.carousel__arrow_right');
    let countSlide = document.querySelectorAll('.carousel__slide').length -1;
    let carousel = document.querySelector('.carousel__inner');
    
    if (event.target.closest('.carousel__arrow_right')) {

      let currentTransform =  carousel.style.transform.slice(11, carousel.style.transform.length - 3) || 0;
  
      if (currentTransform !== countSlide * -carousel.offsetWidth) {
        currentTransform = currentTransform - carousel.offsetWidth;
        carousel.style.transform = `translateX(${currentTransform}px)`;
        left.style.display = 'flex';
      }
      if(currentTransform === countSlide * -carousel.offsetWidth) {
        right.style.display = 'none';
        left.style.display = 'flex';
      }
    } 
    if (event.target.closest('.carousel__arrow_left')) {
    
      let currentTransform =  carousel.style.transform.slice(11, carousel.style.transform.length - 3) || 0;
  
      if(currentTransform !==  0) {
        currentTransform = +currentTransform + carousel.offsetWidth;
        carousel.style.transform = `translateX(${currentTransform}px)`;
        right.style.display = 'flex';
      } 
      if(currentTransform === 0 ) {
        left.style.display = 'none';
      }
    }
    
    //Event on click "+""
    if (event.target.closest('div.carousel__slide')) {
      const slide = event.target.closest('div.carousel__slide');
      const ev = new CustomEvent('product-add', {
          detail: slide.dataset.id,
          bubbles: true,
      });
      this._elem.dispatchEvent(ev);
    }
  }
}
