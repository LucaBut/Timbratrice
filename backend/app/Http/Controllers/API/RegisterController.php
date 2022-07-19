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
use App\Mail\SignUp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Mail;
use App\resources\views\SignUpView;
use App\Notifications\WelcomeEmailNotification;


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
            $data = [
                'email'=>$request['email'],
            ];
            $validator = Validator::make($request->all(), [
                'email'=>'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'validation_errors'=>$validator->messages(),
                ]);
            }else{
                $loginf = loginf::where('email', '=',  $request->email)
                            ->update(['orari_fine' => new \DateTime()]);
                           
                return response()->json([
                'status'=>200,
                'message'=>'Change Password Successfully',
                ]);
            }

                    return response()->json([
                        'status'=>200,
                        'username'=>$login->email,
                        'message'=>'Success',
                    ]);
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
        $login = login::all()->toArray();
        $loginf = loginf::all()->toArray();

        return response()->json([
            'status'=>200,
            'login'=>$login,
            'loginf'=>$loginf,
        ]);
    }

    public function calendario(Request $request){
        $data = [
            'date'=>$request['date'],
        ];

        $user = $this->calendar_start($request);

        return response()->json([
            'status'=>200,
            'date'=>$data,
            'user'=>$user,
        ]);
        // $validator = Validator::make($request->all(), [
        //     'email'=>'required',
        // ]);

    }


    public function ora(Request $request){
        $data = [
            'date'=>$request['date'],
        ];

        return response()->json([
            'status'=>200,
            'date'=>$data,
        ]);
    }
   

    public function calendar_start(Request $request){
        // $emailAndDate = new RegisterController();
        // $emailAndDate = $this->calendario($request);
        
        
        // $login = login::selectRaw("ID, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_one, SUBSTRING_INDEX('{$request->orari_inizio}', ' ', 1) as date_two")
        //                 ->where('email', '=', $request->email)
        //                 ->having('date_one', '=', 'date_two')->get()->toArray();          

        // $login = login::selectRaw("SUBSTRING_INDEX('{$request->date}', ' ', 1) as date_one")->get()->toArray();
//-------------------------------------------------------------------------------------------------------------------//       
        //Questa
        // $login = login::selectRaw("id, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_one, SUBSTRING_INDEX(orari_inizio, ' ', -1) as date_two, SUBSTRING_INDEX(orari_fine, ' ', -1) as date_end, SUBSTRING_INDEX('{$request->date}', ' ', -1) as date_start")
        //                ->where('email', '=', $request->email)
        //                ->having('date_one', '=', 'date_start', 'and', 'date_two', 'like', '%')->get()->toArray();
//-------------------------------------------------------------------------------------------------------------------//        
        //2022-07-14%
        $login = login::select('email', 'orari_inizio')
                        ->where('email', '=', $request->email)->get()->toArray();

        // $login = login::select($request->date);

        // $login = login::select("SUBSTRING_INDEX($request->orari_inizio, ' ', 1)")->get()->toArray();

        // $login = login::selectRaw("SUBSTRING_INDEX('{$request->orari_inizio}', ' ', 1) as date_two")->get()->toArray();

        return response()->json([
            'status'=>200,
            // 'email'=>$data,
            'login'=>$login,
            // 'user'=>$user,
            // 'email'=>$emailAndDate,
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

            $data = [
                'nome'=>$request['nome'],
                'cognome'=>$request['cognome'],
                'email'=>$request['email'],
                'password'=>Hash::make($request['password']),
            ];
            $user = user::create($data);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->email,
                'token'=>$token,
                'message'=>'Registred Successfully',
            ]);

            return $user;
        }

        
        return $data;


        return response()->json([
            'status'=>200,
            'message'=>'Saved to database successfully',
        ]);

    }


    public function storeAdmin(Request $request){
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

            $data = [
                'nome'=>$request['nome'],
                'cognome'=>$request['cognome'],
                'email'=>$request['email'],
                $temp_p = 'temp_password'=>$request['password'],
                'password'=>Hash::make($request['password']),
            ];

            $user = user::create($data);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            
            Mail::to($user->email)->send(new SignUp($data));
        
            
            return response()->json([
                'status'=>200,
                'username'=>$user->email,
                'token'=>$token,
                'message'=>'Registred Successfully',
            ]);

            return $user;
        }

        
        return $data;


        return response()->json([
            'status'=>200,
            'message'=>'Saved to database successfully',
        ]);
    }

    public function changePassword (Request $request){
        $data = [
            'email'=>$request['email'],
            'password'=>Hash::make($request['password']),
        ];
        $validator = Validator::make($request->all(), [
            'email'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
        $user = user::where('email', '=',  $request->email)
                    ->update(['password' => Hash::make($request->password)]);
                   
        return response()->json([
        'status'=>200,
        'message'=>'Change Password Successfully',
        ]);
    }
    }

}