import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

//Services
import { ProductService } from '../product/product.service';
 

@Injectable()
export class CartService{

  public cartTotalPricePrivate : number = 0;
  public cartTotalProductPrivate : number = 0;
  public cartProductsPrivate : any = [];

  public cartTotalPrice = new Subject<number>();

  public cartTotalProduct = new Subject<number>();

  public cartProducts = new Subject<any>();


  constructor(
      private productService : ProductService,
      @Inject(SESSION_STORAGE) private storage: StorageService
  )
  {
      if(this.storage.get('cartTotalProduct') != "" && this.storage.get('cartTotalProduct') != null ){
        this.cartTotalProductPrivate = this.storage.get('cartTotalProduct');
      }
      if(this.storage.get('cartTotalPrice') != "" && this.storage.get('cartTotalPrice') != null ){
        this.cartTotalPricePrivate = this.storage.get('cartTotalPrice');
      }
      if(this.storage.get('cartProducts') != "" && this.storage.get('cartProducts') != null ){
        this.cartProductsPrivate = this.storage.get('cartProducts');
      }
  }

  addCart(product)
  {     
    var id = product.id || product.product;
   
    this.productService.getProduct(id)
    .subscribe(
        data => {

              //Mise à jour du total produit
              this.addTotalProduct();

              //Mise à jour du prix total
              this.addTotalPrice(data);

              //Mise à jour des produits dans le panier
              this.addProducts(data);

        },
        error => console.log('une erreur est survenue')
    );

  }

  deleteCart(product)
  {
    var id = product.product;
    var index = 0;
    var index2 = 0;
    var quantity = 0;
    var price = 0;

    this.cartProductsPrivate.forEach(function(val,i){
      if(val.product == id){
        
        index = i;
        index2 = i;
        quantity = val.quantity;
        price = val.price;

        if(i == 0){
          index2 = 1;
        }   

      }
    });

    //Total cart product
    this.removeProducts(index,index2);

    //Total cart product
    this.removeTotalProduct(quantity);

    //Total cart price
    this.removeTotalPrice(price);
    
  }

  minusCart(product)
  {
      var index = 0;
      var index2 = 0;
      var $this = this;

      this.productService.getProduct(product.product)
      .subscribe(
        data => {
          
          $this.cartProductsPrivate.forEach(function(val,i){
            if(product.product == val.product && val.quantity > 1){
                $this.cartProductsPrivate[i].quantity -= 1;
                $this.cartProductsPrivate[i].price -= parseInt(data.price);
            }
            else if(product.product == val.product && val.quantity == 1){
              index = i;
              index2 = i;
              if(i == 0){
                index2 = 1;
              } 
              $this.removeProducts(index,index2);
            }
          });

          this.removeTotalPrice(data.price);
          this.removeTotalProduct(1);
          this.cartProducts.next(this.cartProductsPrivate);
          this.storage.set('cartProducts',this.cartProductsPrivate);

        },
        error => console.log('une erreur est survenue'),
      );

  }

  private addTotalProduct()
  {
      this.cartTotalProductPrivate += 1;
      this.cartTotalProduct.next(this.cartTotalProductPrivate);
      this.storage.set('cartTotalProduct',this.cartTotalProductPrivate);
  }

  private addTotalPrice(data)
  {
    this.cartTotalPricePrivate += parseInt(data.price);
    this.cartTotalPrice.next(this.cartTotalPricePrivate);
    this.storage.set('cartTotalPrice',this.cartTotalPricePrivate);
  }

  private addProducts(data)
  {
      var exist = false;
      var index = 0;
      this.cartProductsPrivate.forEach(function(val,i){
        if(val.product == data.id){
          exist = true;
          index = i;
        }
      });

      if(exist){
        this.cartProductsPrivate[index].quantity +=1;
        this.cartProductsPrivate[index].price = (parseInt(this.cartProductsPrivate[index].price)+parseInt(data.price));
      }else{
        this.cartProductsPrivate.push(
          {
            'product':data.id,
            'name':data.name,
            'quantity':1,
            'price':data.price
          }
        );
      }
      this.cartProducts.next(this.cartProductsPrivate);
      this.storage.set('cartProducts',this.cartProductsPrivate);
  }
  
  private removeProducts(index,index2)
  {
    this.cartProductsPrivate.splice(index,index2); 
    this.cartProducts.next(this.cartProductsPrivate);
    this.storage.set('cartProducts',this.cartProductsPrivate);
  }

  private removeTotalProduct(quantity)
  {
    this.cartTotalProductPrivate -= quantity;
    this.cartTotalProduct.next(this.cartTotalProductPrivate);
    this.storage.set('cartTotalProduct',this.cartTotalProductPrivate);
  }

  private removeTotalPrice(price)
  {
    this.cartTotalPricePrivate -= price;
    this.cartTotalPrice.next(this.cartTotalPricePrivate);
    this.storage.set('cartTotalPrice',this.cartTotalPricePrivate);
  }


}
