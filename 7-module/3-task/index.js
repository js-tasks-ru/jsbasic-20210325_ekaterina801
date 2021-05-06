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
    let sliderWrapper = document.querySelector('.slider__steps');
    let thumb = document.querySelector('.slider__thumb');
    let sliderProgress = document.querySelector('.slider__progress');
    let spanActive = document.querySelectorAll('.slider__step-active');
    let sliderValue = document.querySelector('.slider__value');

    let coordsSlider = this._elem.getBoundingClientRect();
    let clickPosition = event.clientX - coordsSlider.left;
    let leftRelative = clickPosition/this._elem.offsetWidth;
    let segments = this._elem.querySelector('.slider__steps').children.length - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    for(let elem of spanActive) {
      elem.classList.remove('slider__step-active');
    }

    sliderWrapper.children[value].classList.add('slider__step-active');
    thumb.style.left = valuePercents + '%';
    sliderProgress.style.width = valuePercents + '%';
    sliderValue.textContent =  value;

    const ev = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true,
    })
    this._elem.dispatchEvent(ev);
  }

  //---------My decision-----------
  // onClick(event) {
  //   let sliderWrapper = document.querySelector('.slider__steps');
  //   let spanActive = document.querySelectorAll('.slider__step-active');
  //   let sliderSteps = this._elem.querySelector('.slider__steps');
  //   let sliderValue = document.querySelector('.slider__value');
  //   let thumb = document.querySelector('.slider__thumb');
  //   let sliderProgress = document.querySelector('.slider__progress');

  //   let coordsSlider = this._elem.getBoundingClientRect();
  //   let widthSlider = this._elem.clientWidth;
  //   let step = widthSlider/(sliderSteps.children.length - 1);

  //   let firstCondition = coordsSlider.left + step;
  //   let secondCondition = coordsSlider.left + step + step;
  //   let thirdCondition = coordsSlider.left + step + step + step;
  //   let forthCondition = coordsSlider.left + step + step + step + step;

  //   for(let elem of spanActive) {
  //     elem.classList.remove('slider__step-active');
  //   }
  //   function changeSlider (value, size) {
  //     sliderWrapper.children[value].classList.add('slider__step-active');
  //     thumb.style.left = size + '%';
  //     sliderProgress.style.width = size + '%';
  //     sliderValue.textContent =  value;
  //   }
    
  //   if(event.clientX <= coordsSlider.left + step/2) {
  //     changeSlider(0, 0);
  //   }    
  //   if(event.clientX > firstCondition - step/2 && event.clientX <= firstCondition + step/2) {
  //     changeSlider(1, 25);
  //   }
  //   if(event.clientX > secondCondition - step/2 && event.clientX <= secondCondition + step/2) {
  //     changeSlider(2, 50);
  //   }
  //   if(event.clientX > thirdCondition - step/2 && event.clientX <= thirdCondition + step/2) {
  //     changeSlider(3, 75);
  //   }
  //   if(event.clientX > forthCondition - step/2) {
  //     changeSlider(4, 100);
  //   }
   
  //   const ev = new CustomEvent('slider-change', {
  //     detail: +sliderValue.textContent,
  //     bubbles: true,
  //   })
  //   this._elem.dispatchEvent(ev);
  // }
}
