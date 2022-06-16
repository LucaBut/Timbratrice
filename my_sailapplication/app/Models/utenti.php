<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class utenti extends Model
{
    use HasFactory;

    public function up(){
        Schema::create('utenti', function (Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('cognome');
        });
    }
}
