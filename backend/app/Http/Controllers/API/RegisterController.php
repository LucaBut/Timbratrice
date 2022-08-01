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
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;


class RegisterController extends Controller
{

    //-------------------------------------------------------------Utente---------------------------------------------------------//
    
    //Function login
    public function login(Request $request){
        $validator = Validator::make($request ->all(), [    //Require form data
            'email'=>'required|max:191',
            'password'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = user::where('email', $request->email)->first();     //Check if data exist in the DB
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

    //Function for the start shift button
    public function start_day(Request $request){    
        $validator = Validator::make($request->all(), [     //Require data (in this case form the Session Storage)
            'email'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $login = login::create([        //Create the record in the DB
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

        //Function for the end shift button
        public function end_day(Request $request){
            $data = [
                'email'=>$request['email'],     
            ];
            $validator = Validator::make($request->all(), [     //Require data (in this case form the Session Storage)
                'email'=>'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'validation_errors'=>$validator->messages(),
                ]);
            }else{
                $loginf = loginf::where('email', '=',  $request->email)     //Update the row with new date
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


    //Function logout
    public function logout(Request $request){
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }
        return response()->json([
            'status'=>200,
            'message'=>'Logged out Successfully',
        ]);
    }


    //Function calendar only for post data
    public function calendario(Request $request){
        $data = [       //Request data
            'date'=>$request['date'],
            'email'=>$request['email'],
        ];

        return response()->json([
            'status'=>200,
            'orario'=>$data,
        ]);
    }


    //Function calendar 
    public function calendar_start($email, $date){

        $final_date = Carbon::createFromFormat('D M d Y', $date)->format('Y-m-d');

        //Select the data with split the field orari_inizio and orari_fine where date_one stand only for the date, date_two is the hour string, date_end the date, date_day_end is for the hour string, then the final_date value
        $user = login::selectRaw("id, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_one, SUBSTRING_INDEX(orari_inizio, ' ', -1) as date_two, SUBSTRING_INDEX(orari_fine, ' ', -1) as date_end, SUBSTRING_INDEX(orari_fine, ' ', 1) as date_day_end, '{$final_date}'")
                       ->where('email', $email)     //where the field email match with the var $email
                       ->having('date_one', '=', $final_date, 'and', 'date_two', 'like', '%')->get()->toArray();    
                        //Then check where date_one match with the var $final_date

        return response()->json([
            'status'=>200,
            'user'=>$user,
        ]);
    }


    //Function for register (User side)
    public function store(Request $request){
        $validator = Validator::make($request->all(), [     //Require data
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
                'password'=>Hash::make($request['password']),   //Password hash
            ];
            $user = user::create($data);        //Create new user record

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

//-------------------------------------------------------------Admin---------------------------------------------------------//

    //Function for get all logins
    public function getUser(){
        $login = login::all()->toArray();
        $loginf = loginf::all()->toArray();

        return response()->json([
            'status'=>200,
            'login'=>$login,
            'loginf'=>$loginf,
        ]);
    }


    //Function for register (Admin side)
    public function storeAdmin(Request $request){
        $validator = Validator::make($request->all(), [     //Require data
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

            $user = user::create($data);    //Create new user record

            $token = $user->createToken($user->email.'_token')->plainTextToken;

            Mail::to($user->email)->send(new SignUp($data));    //Send a mail to new user with all not encoded data


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


    //Function change password
    public function changePassword (Request $request){
        $data = [                                           //Require data
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
        $user = user::where('email', '=',  $request->email)                     //Where email match then update the password
                    ->update(['password' => Hash::make($request->password)]);

        return response()->json([
        'status'=>200,
        'message'=>'Change Password Successfully',
        ]);
    }
    }

    //Function upload data for the export
    public function export_upload(Request $request){
        $data = [
            'date1'=>$request['date1'],
            'date2'=>$request['date2'],
        ];

        return response()->json([
            'status'=>200,
            'User-data'=>$data,
        ]);
    }

    //Function export .xlsx
    public function export($date1, $date2){
        $user = login::selectRaw("id, email, SUBSTRING_INDEX(orari_inizio, ' ', 1) as date_start_shift, SUBSTRING_INDEX(orari_inizio, ' ', -1) as hour_start_shift, DATE_FORMAT(orari_inizio, '%Y-%m') as year_and_month, SUBSTRING_INDEX(orari_fine, ' ', 1) as date_end_shift, SUBSTRING_INDEX(orari_fine, ' ', -1) as hour_end_shift, SUBSTRING_INDEX('{$date1}', '-01', 1) as date_start, DATE_FORMAT(orari_fine, '%Y-%m') as year_and_month_end, DATE_FORMAT('{$date2}', '%Y-%m') as date_end" )
                     ->havingRaw("year_and_month = date_start")->get();

        return Excel::download(new UsersExport, 'users_data.xlsx');

        return response()->json([
            "user"=>$user,
        ]);
    }



}