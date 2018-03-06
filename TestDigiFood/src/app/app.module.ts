import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { FormsModule }   from '@angular/forms';
 

//Components
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';


//Services
import {ProductService} from './services/product/product.service';
import {CartService} from './services/cart/cart.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule
  ],
  providers: [
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
