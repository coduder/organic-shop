import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';
// import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
/*####
 * ^^ INDICATES CODE CREATED FOR angular-4-data-table LIBRARY INTEGRATOIN
 * it doesn't work with most recent version of angular and i'm leaving it's
 * integration code in but commented out in case it works in the future
 * SOME CODE WILL HAVE TO BE UNCOMMENTED AND CHANGED IN
 *  admin-products.component.html
 *  app.module.ts
 * FOR EVERYTHING TO WORK AGAIN
 */
/*
  Implement OnDestroy to unsubscribe so if the user has multiple windows open at once
  changes with persist to both windows and not be lost
*/
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  // tslint:disable-next-line:max-line-length
  filteredProducts: Product[];      // referrence end of lecture 315 "Filtering with the datatable" for changes to this variable if angular-4-data-table ever works again
  subscription: Subscription;
  // tableResource: DataTableResource<Product>;

/*####
  items: Product[] = [];
  itemCount: number;
*/
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe( products => {
        this.filteredProducts = this.products = products;
/*####
       this.initializeTable(products);
*/
      });
  }
/*####
  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0})
      .then(items => this.items = items);

    this.tableResource.count()
      .then(count => this.itemCount = count);
  }
*/
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
     this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :  // toLowerCase so search isn't case sensitive
      this.products;
/*####
    // need to pass newly filtered products to the data-table
    this.initializeTable(filteredProducts);
*/
  }
/*####
  reloadItems(params) {
    // reload event is called on initial load when the tableResource hasn't been initialized yet
    // SO just skip this method call initially
    if (!this.tableResource) { return; }

    this.tableResource.query(params)
    .then(items => this.items = items);

  }
*/
}

