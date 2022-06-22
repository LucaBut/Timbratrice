<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class login extends Authenticatable
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'login';
    protected $fillable = [
        'email', 
        'orari_inizio',
        'orari_fine',
    ];
}
