<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        schema::create('registro', function(Blueprint $table){
            $table->bigIncrements('id_registro');
            $table->string('nome');
            $table->string('cognome');
            $table->string('email');
            $table->string('password');
            $table->integer('id_login');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        schema::dropIfExists('registro');
    }
};
