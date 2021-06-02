import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.modal = null;
    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(item => item.product.name === product.name);

    if(cartItem) {
      cartItem.count++;
    } else {
      cartItem = {product, count: 1};
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if(!cartItem) return;

    cartItem.count += amount;

    if (cartItem.count === 0) {
      const newProductList = [];
      this.cartItems.forEach((item) => {
        if (item !== cartItem) {
          newProductList.push(item);
        }
      });
      this.cartItems = newProductList;
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    this.totalCount = 0;
    for(let cartItem of this.cartItems) {
      this.totalCount +=cartItem.count;
    }
    return this.totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    for(let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.wrapperModal = document.createElement('DIV');
    this.cartItems.map(item => {
      return this.wrapperModal.append(this.renderProduct(item.product, item.count));
    });
    this.wrapperModal.append(this.renderOrderForm());
    
    this.modal.setBody(this.wrapperModal);
    this.modal.open();
    
    this.modal._elem.addEventListener('click', this.clickOnPlusMinus.bind(this));
    document.querySelector('.cart-form').addEventListener('submit', this.onSubmit.bind(this));
  }

  clickOnPlusMinus(event) {
    if (event.target.closest('.cart-counter__button_minus')) {
      let id = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(id, -1);
    }
    if (event.target.closest('.cart-counter__button_plus')) {
      let id = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(id, 1);
    }
    if(this.isEmpty()) {
      this.modal.close();
      this.modal._elem.removeEventListener('click', this.clickOnPlusMinus.bind(this));
    }
  }

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
    if(!document.body.classList.contains('is-modal-open')) return;

    if (cartItem.count === 0) {
      this.modal._elem.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
      return;
    }

    let productId = cartItem.product.id;
    let modalBody = this.modal._elem;

    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    document.querySelector('.button[type="submit"]').classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form')),
    })
    .then(response => {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal._elem.removeEventListener('click', this.clickOnPlusMinus.bind(this));

      this.modal.setTitle('Success!');
      let answer = document.createElement('div');
      answer.className = 'modal__body-inner';
      answer.insertAdjacentHTML('beforeend', `
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="../../assets/images/delivery.gif">
        </p>
      `);
      this.wrapperModal.replaceWith(answer);
      return response.json();
    })
    
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

