function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');
  button.addEventListener('click', () => {
    //The same decision is work
    //text.toggleAttribute('hidden');
    text.hidden = !text.hidden;
  })
}
