function initCarousel() {
  let left = document.querySelector('.carousel__arrow_left');
  let right = document.querySelector('.carousel__arrow_right');
  
  let carousel = document.querySelector('.carousel__inner');
  let countSlide = document.querySelectorAll('.carousel__slide').length -1;

  left.style.display = 'none';

  right.addEventListener('click', (e) => {
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
  })

  left.addEventListener('click', () => {
    let currentTransform =  carousel.style.transform.slice(11, carousel.style.transform.length - 3) || 0;

    if(currentTransform !==  0) {
      currentTransform = +currentTransform + carousel.offsetWidth;
      carousel.style.transform = `translateX(${currentTransform}px)`;
      right.style.display = 'flex';
    } 
    if(currentTransform === 0 ) {
      left.style.display = 'none';
    }
  })

  // Solution with Margin
  // right.addEventListener('click', (e) => {

  //   let currentMargin = parseInt(carousel.style.marginLeft || 0);

  //   if(currentMargin !==  countSlide * -carousel.offsetWidth) {
  //     carousel.style.marginLeft = currentMargin - carousel.offsetWidth + 'px';
  //     left.style.display = 'flex';
  //   }
  //   if(currentMargin === (countSlide - 1) * -carousel.offsetWidth) {
  //     right.style.display = 'none';
  //     left.style.display = 'flex';
  //   }
  // })

  // left.addEventListener('click', () => {
  //   let currentMargin = parseInt(carousel.style.marginLeft || 0);

  //   if(currentMargin !==  0) {
  //     carousel.style.marginLeft = currentMargin + carousel.offsetWidth + 'px';
  //     right.style.display = 'flex';
  //   } 
  //   if(currentMargin === -carousel.offsetWidth ) {
  //     left.style.display = 'none';
  //   }
  // })
}