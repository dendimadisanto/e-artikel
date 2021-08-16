<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    
    protected $table = 'userlogin';
    protected $primaryKey = 'id';
    protected $fillable = ['nama','alamat'];
    public $timestamps = false;


    public function Agama()
    {
    	return $this->belongsTo('App\Models\Agama', 'agama_id');
    }

     public function riwayat_pendidikan()
    {
    	return $this->hasMany('App\Models\RiwayatPendidikan', 'user_id', 'id');
    }

}
