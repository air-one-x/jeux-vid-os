<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Videogame extends Model
{
    public $timestamps =false;
   
    public function reviews()
    {
        return $this->hasMany('App\Models\Review');
    }

    

  
}