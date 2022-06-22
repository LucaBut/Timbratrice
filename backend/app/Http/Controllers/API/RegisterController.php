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
        $validator = Validator::make($request ->all(), [
            'email'=>'required|max:191',
            'password'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = user::where('email', $request->email)->first();
            if(! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid credetials',
                ]);
            }
            else{
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'token'=>$token,
                    'message'=>'Logged In Successfully',
                ]);
            }
        }
    }

    public function start_day(){
        $validator = Validator::make($request ->all(), [
            'timestamp'=>'required',
            'email'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $login = login::create([
                'timestamp'=>$request->timestamp,
                'email'=>$request->email,
            ]);
                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'message'=>'Success',
                ]);
            }
        }

    

    public function logout(){
        auth()->user()->Tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Logged out Successfully'
        ]);
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
                'username'=>$user->email,
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
