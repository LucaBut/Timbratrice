<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
// use app\Http\Request;
use app\Http\Controllers\Controller;

class userController extends Controller
{
    public function insertForm(){
        return view ('userCreate');
    }

    public function insert(Request $request){
        $id = $request->input(01);
        $name = $request->input('Mario');
        $cognome = $request->input('Rossi');
        $email = $request->input('mario.rossi@gmail.com');
        $password = $request->input('password');
        $id_login = $request->input(1);
        $data = array('01'=>$id, 'Mario'=>$name, 'Rossi'=>$cognome, 'mario.rossi@gmail.com'=>$email, 'password'=>$password, '1'=>$id_login);
        DB::table('registro')->insert($data);
        echo "Record inserito. <br/>";
    }
    
}