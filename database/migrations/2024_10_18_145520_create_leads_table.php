<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeadsTable extends Migration
{
    public function up()
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('email', 191);
            $table->string('phone', 191);
            $table->unsignedBigInteger('lead_status_id');
            $table->timestamps();

            // Foreign key to lead_statuses table
            $table->foreign('lead_status_id')->references('id')->on('lead_statuses')->onDelete('cascade');
            $table->index('name');
            $table->index('email');
        });
    }

    public function down()
    {
        Schema::dropIfExists('leads');
    }
}
