import { Component, OnInit } from '@angular/core';

//Services
import{ ProductService } from '../../services/product/product.service';
import{ CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Cart
  cartTotalPrice : number = 0;
  cartTotalProduct : number = 0;
  cartProducts : any = [];

  //Products
  productCategories : any ;

  constructor(
              private productService  :  ProductService,
              private cartService     :  CartService,
  ) { }

  ngOnInit(){

    this.cartProducts = this.cartService.cartProductsPrivate;
    this.cartTotalPrice = this.cartService.cartTotalPricePrivate;
    this.cartTotalProduct = this.cartService.cartTotalProductPrivate;

    this.cartService.cartTotalProduct.asObservable().subscribe(res => this.cartTotalProduct = res);
    this.cartService.cartTotalPrice.asObservable().subscribe(res => this.cartTotalPrice = res);
    this.cartService.cartProducts.asObservable().subscribe(res => this.cartProducts = res);

    //Récupération des catégories de produit
    this.productService.getCategories()
                .subscribe(
                  data => {
                          this.productCategories = data;
                        },
                  error => console.log(error)
                );

  }

  


}
