import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {}
  open() {
    if (!this._elem) {
      this._elem = document.createElement('DIV');
      this._elem.className = 'modal';

      this._elem.addEventListener('click', event => {
        if (event.target.closest('button.modal__close')) {
          this.close();
        }
      });

      document.addEventListener('keydown', event => {
        if (event.code == 'Escape') {
          this.close();
        }
      });
      this.template = `
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      `;
      this._elem.insertAdjacentHTML('beforeend', this.template);
      document.body.classList.add('is-modal-open');
      document.body.append(this._elem);
    }
    
  }
  setTitle(str) {
    if(!this._elem) {
      this.open();
      let modalTitle = document.querySelector('.modal__title');
      modalTitle.textContent = str;
    } else {
      let modalTitle = document.querySelector('.modal__title');
      modalTitle.textContent = str;
    }
  }
  setBody(node) {
    if(!this._elem) {
      this.open();
      let modalBody = this._elem.querySelector('.modal__body');
      modalBody.append(node);
    } else {
      let modalBody = this._elem.querySelector('.modal__body');
      modalBody.append(node);
    }
  }
  close() {
    if(this._elem.classList.contains('modal')) {
      this._elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }
}
