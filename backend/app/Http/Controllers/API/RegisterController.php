<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\user;
use App\Models\login;
use App\Models\loginf;
use App\Models\view;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use Laravel\Sanctum\HasApiTokens;
use App\Mail\SignUp;
use Illuminate\Support\Facades\Mail;
use App\resources\views\SignUpView;


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

    public function start_day(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $login = login::create([
                'email'=>$request->email,
                'orari_inizio'=>new \DateTime(),
            ]);
                return response()->json([
                    'status'=>200,
                    'username'=>$login->email,
                    'message'=>'Success',
                ]);
            }
        }

        public function end_day(Request $request){
            $validator = Validator::make($request->all(), [
                'email'=>'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'validation_errors'=>$validator->messages(),
                ]);
            }else{
                $login = loginf::create([
                    'email'=>$request->email,
                    'orari_fine'=>new \DateTime(),
                ]);
                    return response()->json([
                        'status'=>200,
                        'username'=>$login->email,
                        'message'=>'Success',
                    ]);
                }
            }

    

    public function logout(Request $request){
        if ($request->user()) { 
            $request->user()->tokens()->delete();
        }
        return response()->json([
            'status'=>200,
            'message'=>'Logged out Successfully',
        ]);
    }


    public function getUser(){
        // DB::connection()->enableQueryLog();
        $login = login::all()->toArray();
        // $loginf = loginf::select('orari_fine')->get()->toArray();
        $loginf = loginf::all()->toArray();
        $user = user::select('registro.nome', 'registro.cognome')
                    ->join('login', 'login.email', '=', 'registro.email')
                    // ->where('login.email', 'like', 'concat(\'%\', registro.nome, \'%\')', 'and', 'login.email', 'like', 'concat(\'%\', registro.cognome, \'%\'')
                    // ->orWhere('login.email', 'like', 'concat(\'%\', registro.cognome, \'%\'')
                    // ->where(DB::raw('concat(\'%\', registro.nome, \'%\')'), 'like', 'login.email')
                    ->where('login.email', 'like', '%@gmail.com', 'and', 'login.email', 'like', '%@gmail.com')
                    ->get()->toArray();
        // $queries = DB::getQueryLog();
        // $last_query = end($queries);
        return response()->json([
            'status'=>200,
            'login'=>$login,
            'loginf'=>$loginf,
            'user'=>$user,
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
            // $user = user::create([
            //     'nome'=>$request->nome,
            //     'cognome'=>$request->cognome,
            //     'email'=>$request->email,
            //     'password'=>Hash::make($request->password),
            // ]);
            $user = user::create([
                'nome'=>$request['nome'],
                'cognome'=>$request['cognome'],
                'email'=>$request['email'],
                'password'=>Hash::make($request['password']),
            ]);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->email,
                'token'=>$token,
                'message'=>'Registred Successfully',
            ]);

            return $user;
        }

        return response()->json([
            'status'=>200,
            'message'=>'Saved to database successfully',
        ]);

        if($user){
            Mail::to($request->email)->send(new SignUp($user));
            return response()->json([
                'status'=>200,
                'message'=>'Thank you'
            ]);
        }
    }

    function sendMail(){
        $name = 'Jhon';
        Mail::to('fake@mail.com')->send(new SignUp($name));
        return view('welcome');
    }

}
