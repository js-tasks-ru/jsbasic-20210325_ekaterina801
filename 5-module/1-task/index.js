function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', e => {
    e.target.setAttribute('hidden', true);
  })
}
