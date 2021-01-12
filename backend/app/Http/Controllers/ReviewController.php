<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Models\Videogame;
use App\Models\Platform;

class ReviewController extends Controller
{
   
    public function list() {
       
        $list = Review::all();

        // Return JSON of this list
        return $this->sendJsonResponse($list, 200);
    }

}
