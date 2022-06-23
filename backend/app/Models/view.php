<?php 

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\user;
use App\Models\login;
use App\Models\loginf;

class view extends Authenticatable
{
    public function indexData()
    {
        $data = array(
            'login'  => login::all(),
            'loginf' => loginf::all(),
            'user'  => user::all(),
        );

        return $data;
    }
}
