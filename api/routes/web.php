<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/key', function() {
    return \Illuminate\Support\Str::random(32);
});
$router->post('/login', 'UserLoginController@doLogin');



$router->group(['middleware' => 'HakAkses'], function ($router) 
{
	$router->group(['prefix' => 'master'], function () use ($router){
	$router->get('/get-data-kategori', 'MasterController@getDataKategori');
	$router->post('/store-kategori', 'MasterController@storeKategori');
	$router->post('/hapus-kategori', 'MasterController@hapusKategori');

	});

	$router->group(['prefix' => 'artikel'], function () use ($router){
		 $router->get('/get-data-pencarian', 'ArtikelController@getDataPencarian');
		 $router->post('/store-pencarian', 'ArtikelController@storePencarian');
		 $router->post('/hapus-pencarian', 'ArtikelController@hapusPencarian');
		 $router->get('/get-data-keyword', 'ArtikelController@getDataKeyword');
		 $router->get('/get-data-dokumen', 'ArtikelController@getDataDokumen');
		 $router->post('/get-ekstrak', 'ArtikelController@getEkstrak');
		 $router->post('/store-keyword', 'ArtikelController@storeKeyword');
		 $router->post('/hapus-keyword', 'ArtikelController@hapusKeyword');
		 $router->post('/cari-artikel', 'ArtikelController@cariArtikel');
		 $router->post('/cari-artikel-google', 'ArtikelController@cariArtikelGoogle');
		 $router->post('/simpan-file', 'ArtikelController@simpanFile');
		 $router->post('/simpan-dokumen-artikel', 'ArtikelController@simpanDokumenArtikel');
		 $router->post('/hapus-dokumen', 'ArtikelController@hapusDokumen');
	});
});


