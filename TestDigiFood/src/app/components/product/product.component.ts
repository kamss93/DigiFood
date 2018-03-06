import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Services
import{ ProductService } from '../../services/product/product.service';
import{ CartService } from '../../services/cart/cart.service';

//Components
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category : number ;
  products : any ;

  loader : boolean;
 
  constructor(
      private route:ActivatedRoute,
      private productService : ProductService,
      private appComponent : AppComponent,
      private cartService : CartService
  ){}

  ngOnInit() {

      //Récupération du paramétre dans l'url
      this.route.paramMap.subscribe(res => {

          //Mise à jour de la variable catégorie
          this.category =  parseInt(res.get('cat'));

          this.loader = true;

          //Récupération des produits selon la catégorie
          this.productService.getProductsByCatgory(this.category)
                       .subscribe(
                         data => {
                           this.products = data;
                           this.loader = false;
                          },
                         error => console.log('Une erreur est survenue ' + error)
          );  
      });

  }

  addCart(product)
  {
    this.productService.
    getProduct(product)
    .subscribe(
       data => {
          this.cartService.addCart(data);
       },
       error => console.log('une erreur est survenue')
      );

  }

  /*addCart(product)
  {

    this.productService.getProduct(product)
                       .subscribe(
                          data => {

                              //Mis à jour du prix total panier dans appComponent
                              this.appComponent.cartTotalPrice += parseInt(data.price);
                              this.cartService.addCartTotalPrice(parseInt(data.price));

                              //Mise à jour du nombre total de produit dans le panier
                              this.appComponent.cartTotalProduct +=1;
                              this.cartService.addCartTotalProduct(1);

                              var exist = false;
                              var index = 0;
                              this.appComponent.cartProducts.forEach(function(val,i){
                                  if(val.product == data.id){
                                    exist = true;
                                    index = i;
                                  }
                              });

                              if(exist){
                                  this.cartService.cartProducts[index].quantity +=1;
                                  this.cartService.cartProducts[index].price = (parseInt(this.cartService.cartProducts[index].price)+parseInt(data.price)) ;
                              }else{
                                this.cartService.cartProducts.push(

                                  {
                                    'product':data.id,
                                    'name':data.name,
                                    'quantity':1,
                                    'price':data.price
                                  }

                                );
                              }
                              //Sauvegarde des produits cart avec storage
                              this.cartService.setCartProducts(this.cartService.cartProducts);
                          },
                          error => console.log('Une erreur est survenue ' + error)
                       );
    
  }*/





}
