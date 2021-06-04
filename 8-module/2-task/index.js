import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.filteredProducts = this.products;
    this.render();
  }
  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
    this.cardInner = this.elem.querySelector('.products-grid__inner')
    this.renderCards(this.products);
  }

  renderCards() {
    for(const product of this.filteredProducts) {
      this.card = new ProductCard(product).elem;
      this.cardInner.append(this.card);
    }
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);

    this.filteredProducts = this.products

    .filter(product => {
      if(this.filters.noNuts ) {
        return !product.nuts || product.nuts === 'false' ? true : false;
      }
      return true;
    })
    .filter(product => {
      
      if(this.filters.vegeterianOnly ) {
        return product.vegeterian ? true : false;
      }
      return true
    })
    .filter(product => {
      if(this.filters.maxSpiciness ) {
        return product.spiciness <= this.filters.maxSpiciness ? true : false;
      }
      return true;
    })
    .filter(product => {
      if(this.filters.category ) {
        return product.category === this.filters.category ? true : false;
      }
      return true;
    });

    this.cardInner.innerHTML = null;
    this.renderCards();
  }
}