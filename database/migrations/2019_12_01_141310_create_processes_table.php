<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProcessesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('processes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tractor_id')->unsigned();
            $table->integer('field_id')->unsigned();
            $table->date('date');
            $table->integer('area');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('tractor_id')->references('id')->on('tractors');
            $table->foreign('field_id')->references('id')->on('fields');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('processes');
    }
}
