import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    // tslint:disable-next-line:forin
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({
        ...item,                        // SPREAD operator, copies all properties of wrapped Object to the new object. just like {title: item.title, price: item.price etc.}
        $key: productId
      }));
    }
  }


  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line:forin
    for (const productId in this.items) {
     count += this.items[productId].quantity;
    }

    return count;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    //console.log(product);
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

}
