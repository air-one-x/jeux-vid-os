<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Videogame;
use App\Models\Platform;
use App\Models\Review;


class VideogameController extends Controller
{
    
    public function read(Request $request, int $id) 
    {
      $game = Videogame::find($id);
      if(empty($game))
      {
         return response()->json(null, Response::HTTP_NOT_FOUND);
      }

      $platformId = $game->status;
      $platform = Platform::find($platformId);
      $reviews = Videogame::find($id)->reviews;



      return response()->json([$game,$platform, $reviews]);
    }

    public function getReviews(int $id) {
        $reviews = Videogame::find($id)->reviews;
        return response()->json($reviews);
    }

    public function list()
    {
        $gameList = Videogame::all();
        return response()->json($gameList);
    }

    public function add(Request $request)
    {
        $newGame = new Videogame;
        $newGame->name = $request->input('name');
        $newGame->editor = $request->input('editor');
        $newGame->status = intval($request->input('status'));
        
        $platformId = $request->input('status');
        $platform = Platform::find($platformId);

        $newGame->save();
        
        return response()->json([$newGame, $platform]);
        
      
    }
}
