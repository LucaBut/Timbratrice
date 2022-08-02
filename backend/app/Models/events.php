<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class events extends Model
{
    use HasFactory;

    public $timestamp = true;
    protected $table = 'events';
    protected $fillable = [
        'email',
        'event',
        'date',
    ];

    const CREATED_AT = 'date';
    const UPDATED_AT = 'date';
}
