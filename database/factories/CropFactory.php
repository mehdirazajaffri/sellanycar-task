<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Crop;
use Faker\Generator as Faker;

$factory->define(Crop::class, function (Faker $faker) {

    return [
        'name' => $faker->word
    ];
});
