export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if(!cartItem) return;
    if(cartItem) {
      if(amount === 1) {
        cartItem.count++;
      } else if(amount === -1) {
        cartItem.count--;
        if(cartItem.count === 0){
          this.cartItems = [];
        }
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    if (this.cartItems.length) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // ваш код
    this.totalCount = 0;
    for(let cartItem of this.cartItems) {
      this.totalCount +=cartItem.count;
    }
    return this.totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    for(let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

