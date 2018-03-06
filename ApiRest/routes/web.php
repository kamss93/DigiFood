<?php

Route::get('/', function () {
    return view('welcome');
});


/*
|----------------------
|	Api Routes
|----------------------
*/
Route::group(['prefix' => 'api', 'middleware' => ['cross'] ],function(){

	Route::get('{apiKey}/products/categories','ProductController@categories');

	Route::get('{apiKey}/products/category/{cat}','ProductController@productByCategory');

	Route::get('{apiKey}/product/{id}','ProductController@product');

});
