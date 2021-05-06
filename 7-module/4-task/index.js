export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.elem = steps;
  }
  get elem() {
    return this._elem;
  }
  set elem(value) {
    if (!this._elem) {
      this._elem = document.createElement('DIV');
      this._elem.className = 'slider';
      this._elem.addEventListener('click', event => {
        this.onClick(event);
      });
      this._elem.addEventListener('pointerdown', event => {
        this.onMove(event);
      });

      this.template =`
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0;"></div>
        <div class="slider__steps"></div>
      `;
      
      this._elem.insertAdjacentHTML('beforeend', this.template);

      let sliderSteps = this._elem.querySelector('.slider__steps');
      this.steps = '<span class="slider__step-active"></span>';
      for(let i = 1; i < value; i++) {
        this.steps += `<span></span>`
      }
      sliderSteps.insertAdjacentHTML('beforeend', this.steps);
    }
  }

  onClick(event) {
    let stepsWrapper = document.querySelector('.slider__steps');
    let thumb = document.querySelector('.slider__thumb');
    let sliderProgress = document.querySelector('.slider__progress');
    let spanActive = document.querySelectorAll('.slider__step-active');
    let sliderValue = document.querySelector('.slider__value');
    let clickPosition = event.clientX - this._elem.getBoundingClientRect().left;
    let leftRelative = clickPosition/this._elem.offsetWidth;
    let segments = this._elem.querySelector('.slider__steps').children.length - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    for(let elem of spanActive) {
      elem.classList.remove('slider__step-active');
    }

    stepsWrapper.children[value].classList.add('slider__step-active');
    thumb.style.left = valuePercents + '%';
    sliderProgress.style.width = valuePercents + '%';
    sliderValue.textContent =  value;

    const ev = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true,
    })
    this._elem.dispatchEvent(ev);
  }
  
  onMove(event) {
    let stepsWrapper = document.querySelector('.slider__steps');
    let thumb = event.target.closest('.slider__thumb');
    let sliderProgress = document.querySelector('.slider__progress');
    let spanActive = document.querySelectorAll('.slider__step-active');
    let sliderValue = document.querySelector('.slider__value');
    
    if (!thumb) return;
    event.preventDefault();
    thumb.ondragstart = () => false;
    this._elem.classList.add('slider_dragging');
    
    document.addEventListener('pointermove', onPointerMove.bind(this));
    document.addEventListener('pointerup', onPointerUp.bind(this));

    function onPointerMove(event) {
      event.preventDefault();
      for(let elem of spanActive) {
        elem.classList.remove('slider__step-active');
      }
      
      let clickPosition = event.clientX - this._elem.getBoundingClientRect().left;
      let leftRelative = clickPosition / this._elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }
      let leftPercents = leftRelative * 100;
      thumb.style.left = `${leftPercents}%`;
      sliderProgress.style.width = `${leftPercents}%`;
      let segments = this._elem.querySelector('.slider__steps').children.length - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      sliderValue.textContent =  value;
      
      stepsWrapper.children[value].classList.add('slider__step-active');
      const ev = new CustomEvent('slider-move', {
        detail: +sliderValue.textContent,
        bubbles: true,
      })
      this._elem.dispatchEvent(ev);
    }

    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove.bind(this));
      document.removeEventListener('pointerup', onPointerUp.bind(this));
      this._elem.classList.remove('slider_dragging');

      const ev = new CustomEvent('slider-change', {
        detail: +sliderValue.textContent,
        bubbles: true,
      })
      this._elem.dispatchEvent(ev);
    }
  }
}
