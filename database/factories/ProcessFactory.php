<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Process;
use Faker\Generator as Faker;

$factory->define(Process::class, function (Faker $faker) {

    return [
        'field_id' => 1,
        'date' => $faker->word,
        'area' => $faker->randomDigitNotNull
    ];
});
