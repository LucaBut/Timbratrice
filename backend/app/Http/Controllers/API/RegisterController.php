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
                                ->orderBy('id', 'desc')
                                ->limit(1)
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
            'email'=>$request['email'],
        ];

        return response()->json([
            'status'=>200,
            'orario'=>$data,
        ]);
    }


    public function calendar_start($email, $date){

        // $hour = Carbon::createFromFormat('Y-m-d', $date);
        // $hour = Carbon::createFromFormat('D M d Y H:i:s', $date)->format('Y-m-d');

        $final_date = Carbon::createFromFormat('D M d Y', $date)->format('Y-m-d');

        // $date->setTimezone('Europe/Rome');

        $user = login::selectRaw("id, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_one, SUBSTRING_INDEX(orari_inizio, ' ', -1) as date_two, SUBSTRING_INDEX(orari_fine, ' ', -1) as date_end, SUBSTRING_INDEX(orari_fine, ' ', 1) as date_day_end, '{$final_date}'")
                       ->where('email', $email)
                       ->having('date_one', '=', $final_date, 'and', 'date_two', 'like', '%')->get()->toArray();

        //2022-07-14%, , SUBSTRING_INDEX('{$date}', '00', 1) as date_start

        return response()->json([
            'status'=>200,
            'user'=>$user,
        ]);
    }

    public function export_upload(Request $request){
        $data = [
            'date1'=>$request['date1'],
            'date1'=>$request['date2'],
        ];

        return response()->json([
            'status'=>200,
            'User-data'=>$data,
        ]);
    }

    public function export($date1){

        $user = login::selectRaw("id, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_one, SUBSTRING_INDEX('{$date1}', '-01', 1) as date_start")
                    ->get()->toArray();


        return response()->json([
            'status'=>200,
            'User'=>$user
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