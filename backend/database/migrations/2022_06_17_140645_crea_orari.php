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
        schema::create('orari', function(Blueprint $table){
            $table->bigIncrements('id_ora');
            $table->timestamp('ora_inizio');
            $table->timestamp('ora_fine');
            $table->integer('id_login_o');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        schema::dropIfExists('orari');
    }
};
