import { Component, OnInit } from '@angular/core';

//Services
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts : any = [];
  cartTotalPrice : number ;
  
  constructor(
    private cartService : CartService
  ){}

  ngOnInit() {
    this.cartProducts = this.cartService.cartProductsPrivate;
    this.cartTotalPrice = this.cartService.cartTotalPricePrivate;
  }

  addCart(product)
  {
    this.cartService.addCart(product);
    this.cartService.cartTotalPrice.asObservable().subscribe(res => this.cartTotalPrice = res);
  }

  deleteCart(product)
  {
    this.cartService.deleteCart(product);
  }

  minusCart(product)
  {
      this.cartService.minusCart(product);
      this.cartService.cartTotalPrice.asObservable().subscribe(res => this.cartTotalPrice = res);
  }


}
