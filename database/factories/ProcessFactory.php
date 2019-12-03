<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Process;
use Faker\Generator as Faker;

$factory->define(Process::class, function (Faker $faker) {

    return [
        'tractor_id' => $faker->randomDigitNotNull,
        'field_id' => $faker->randomDigitNotNull,
        'date' => $faker->word,
        'area' => $faker->randomDigitNotNull,
        'created_at' => $faker->date('Y-m-d H:i:s'),
        'updated_at' => $faker->date('Y-m-d H:i:s')
    ];
});
