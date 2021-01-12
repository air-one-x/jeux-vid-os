<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Platform;
use App\Models\Videogame;


class PlatformController extends Controller
{
    
    public function list() 
    {
      $platform = Platform::all();
      return response()->json($platform);
      
    }

   
   
}
