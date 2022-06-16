<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class controllerUser extends Controller
{

    /* 
    * @param Request $request
    * @return Response
    */
    public function postDataEntrata(Post $post){
        $data ->create([
            'nome' => $post->nome,
            'cognome'=> $post->cognome,
            'timbro_inizio'=> $post->orario_inizio,
        ]);
        $post->delete();

        return redirect()->route(post.index);
    }

    public function postDataUscita(Post $post){
        $data ->create([
            'nome' => $post->nome,
            'cognome'=> $post->cognome,
            'timbro_fine'=> $post->orario_fine,
        ]);
        $post->delete();

        return redirect()->route(post.index);
    }

// public function store(Request $request){
//     $name = $request->input('name');
// }

}