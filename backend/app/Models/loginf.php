<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class loginf extends Authenticatable
{
    use HasFactory;
    public $timestamps = true;
    protected $table = 'login';
    protected $fillable = [
        'email', 
        'orari_fine',
    ];
    const CREATED_AT = 'orari_fine';
    const UPDATED_AT = 'orari_fine';
}
