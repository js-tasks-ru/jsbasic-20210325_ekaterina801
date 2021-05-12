import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps  - 1;
    this.render();
    this.setValue(value);
    this.addEventListeners();
    
  }
  
  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;
    let valuePercents = this.value / this.segments * 100;

    this.getEl('thumb').style.left = valuePercents + '%';
    this.getEl('progress').style.width = valuePercents + '%';
    this.getEl('value').innerHTML = this.value;
    
    if(this.getEl('step-active')) {
      this.getEl('step-active').classList.remove('slider__step-active');
    }
    this.getEl('steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.getEl('thumb').ondragstart = () => false;
    this.getEl('thumb').onpointerdown = this.onPointerDown;
    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left)/this.elem.offsetWidth;
    this.setValue(Math.round(newLeft * this.segments));

    const ev = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    })
    this.elem.dispatchEvent(ev);
  }

  onPointerDown = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  };
  
  onPointerMove = event => {
    event.preventDefault();

    let newLeft = this.calcLeftByEvent(event);
    this.getEl('thumb').style.left = `${newLeft * 100}%`;
    this.getEl('progress').style.width = `${newLeft * 100}%`;

    this.value = Math.round(newLeft * this.segments);
    this.getEl('value').innerHTML = this.value;

    if(this.getEl('step-active')) {
      this.getEl('step-active').classList.remove('slider__step-active');
    }
    this.getEl('steps').children[this.value].classList.add('slider__step-active');
  };

  calcLeftByEvent(event) {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (newLeft < 0) { newLeft = 0; }
    if (newLeft > 1) { newLeft = 1; }

    return newLeft;
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.elem.classList.remove('slider_dragging');

    const ev = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    })
    this.elem.dispatchEvent(ev);
  };
  getEl(el) {
    return this.elem.querySelector(`.slider__${el}`);
  }
}