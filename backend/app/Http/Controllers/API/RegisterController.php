<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\user;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class RegisterController extends Controller
{

    public function login(Request $request){
        $login = new login;
        $login -> email = $request -> input('email');
        $login -> password = $request -> input('password');
    }

    public function getUser(){
        $utenti = user::all();
        return response() -> json([
            'status'=>200,
            'utenti'=>$utenti,
        ]);

    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nome'=> 'required',
            'cognome'=> 'required',
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = user::create([
                'nome'=>$request->nome,
                'cognome'=>$request->cognome,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->nome,
                'token'=>$token,
                'message'=>'Registred Successfully',
            ]);
        }

        return response() -> json([
            'status'=>200,
            'message'=>'Saved to database successfully',
        ]);
    }
}
