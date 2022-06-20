<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\user;

class RegisterController extends Controller
{
    public function store(Request $request){
        $register = new Register;
        $register -> nome = $request -> input('nome');
        $register -> cognome = $request -> input('cognome');
        $register -> email = $request -> input('email');
        $register -> password = $request -> input('password');
        $register -> save();

        return response() -> json([
            'status'=>200,
            'message'=>'Saved to database successfully',
        ]);
    }
}
