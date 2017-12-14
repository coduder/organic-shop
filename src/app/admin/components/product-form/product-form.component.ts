import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductFormDetails } from 'shared/models/productFormDetails';

import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  id;

  // initialize for intellisense, fields will be updated via input databinding in the form
  product = new ProductFormDetails('', null, '', '');

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1) // take one item then it unsubscribes for you
        .subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    // Don't need to wait for update .then() to occurr before navigating away because realtime database of firebase
    // will update and autorefresh automatically
    this.router.navigate(['/admin/products']);

  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    } else {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }
  }

}
