<?php 

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;


class ProductController extends Controller{


	private $categories;

	private $products;
	

	public function __construct()
	{
		$this->categories = config('products.categories');
		$this->products = config('products.products');
	}


	public function categories($apiKey)
	{
		if(config('app.apiKey') === $apiKey){

			return $this->categories;

		}
	}

	public function productByCategory($apiKey,$cat)
	{	
		$productByCategory = [];
		
		foreach ($this->products as $product) {
			if($product['category'] == $cat){
				array_push($productByCategory,$product);
			}
		}

		if(empty($productByCategory)){
			$productByCategory['status'] = 'nok';
			$productByCategory['message'] = 'Aucun produit pour cette catégorie';
		}

		return $productByCategory;

	}


	public function product($apiKey,$id)
	{	
		$p='';

		foreach ($this->products as $product) {
			if($product['id'] == $id){
				$p = $product;
			}
		}

		if(empty($p)){
			$p['status'] = 'nok';
			$p['message'] = 'Aucun produit ne correspond';
		}

		return $p;

	}




}