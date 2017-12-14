import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AdminModule } from 'app/admin/admin.module';
import { CoreModule } from 'app/core/core.module';
import { ShoppingModule } from 'app/shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';

// import { DataTableModule } from 'angular-4-data-table'; // NOT WORKING WITH THIS VERSION OF ANGULAR


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      // tslint:disable-next-line:max-line-length
      { path: '', component: ProductsComponent }, // probably later want to have a separate HomeComponent page, but in simple application, this is fine
      { path: 'login', component: LoginComponent},
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
