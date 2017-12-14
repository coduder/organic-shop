import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId)
      .map( x => new ShoppingCart(x.items));
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe( item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) { item$.remove(); }
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }

    });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  // tslint:disable-next-line:max-line-length
  private async getOrCreateCartId(): Promise<string> {               // use async keyword decorator and await operator to structure asynchronous code, synchronously
    let cartId = localStorage.getItem('cartId');

    if ( cartId ) { return cartId; }

    let result = await this.create(); // await the return of a promise before continuing (replaces .then() statements)
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
