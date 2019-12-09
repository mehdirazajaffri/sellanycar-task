<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Field;
use Faker\Generator as Faker;

$factory->define(Field::class, function (Faker $faker) {

    return [
        'name' => $faker->word,
        'area' => $faker->randomDigitNotNull,
        'crop_id' => 1
    ];
});
