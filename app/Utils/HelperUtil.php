<?php

namespace App\Utils;

class HelperUtil
{

    public static function calculateSum($data)
    {
        $sum = 0;
        $sum = array_reduce($data, function ($sum, $item) {
            return $sum += $item["area"];
        }, $sum);

        return $sum;
    }

}
