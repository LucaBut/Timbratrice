<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;

class user extends Authenticatable
{
    use HasApiTokens, HasFactory;
    public $timestamps = false;
    protected $table = 'registro';
    protected $fillable = [
        'id_registro',
        'nome', 
        'cognome',
        'email',
        'password'
    ];
}
